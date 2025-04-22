"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Search, Upload, X, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function UploadProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Project data state
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Team members state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    projectName?: string;
    projectDescription?: string;
    file?: string;
  }>({});

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        setSelectedFile(file);
        setErrors((prev) => ({ ...prev, file: undefined }));
      } else {
        setErrors((prev) => ({ ...prev, file: "Please upload a ZIP file" }));
      }
    }
  };

  // Handle searching for users
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Mock search results based on input
      const results = [
        {
          id: 101,
          name: "John Doe",
          username: value + "john",
          avatar: "/placeholder.svg",
        },
        {
          id: 102,
          name: "Jane Smith",
          username: value + "jane",
          avatar: "/placeholder.svg",
        },
        {
          id: 103,
          name: "Robert Johnson",
          username: value + "robert",
          avatar: "/placeholder.svg",
        },
      ].filter(
        (user) =>
          !selectedMembers.some((member) => member.id === user.id) &&
          (user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase()))
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Add a member to the team
  const addMember = (user: any) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchResults(searchResults.filter((result) => result.id !== user.id));
  };

  // Remove a member from the team
  const removeMember = (userId: number) => {
    setSelectedMembers(
      selectedMembers.filter((member) => member.id !== userId)
    );
  };

  // Validate form
  const validateForm = () => {
    const newErrors: {
      projectName?: string;
      projectDescription?: string;
      file?: string;
    } = {};

    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required";
    }

    if (!selectedFile) {
      newErrors.file = "Please upload a project file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to the project page
      router.push("/");
    }, 2000);
  };

  return (
    <div className="container py-8 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {/* <ArrowLeft className="h-4 w-4" /> */}
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Upload New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">
                  Project Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className={errors.projectName ? "border-destructive" : ""}
                />
                {errors.projectName && (
                  <p className="text-sm text-destructive">
                    {errors.projectName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className={cn(
                    "min-h-[100px]",
                    errors.projectDescription ? "border-destructive" : ""
                  )}
                />
                {errors.projectDescription && (
                  <p className="text-sm text-destructive">
                    {errors.projectDescription}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>
                Project File <span className="text-destructive">*</span>
              </Label>

              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-primary/50",
                  errors.file ? "border-destructive/50" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">
                    {selectedFile
                      ? selectedFile.name
                      : "Drag & Drop your ZIP file here"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedFile
                      ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                      : "or click to browse"}
                  </p>
                </div>
              </div>

              {errors.file && (
                <p className="text-sm text-destructive">{errors.file}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>Team Members</Label>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by username..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              {/* Search Results */}
              {searchQuery.length > 1 && (
                <Card className="mt-2 overflow-hidden">
                  <CardContent className="p-0">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <ScrollArea className="max-h-[200px]">
                        <div className="p-2">
                          {searchResults.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center justify-between rounded-md p-2 cursor-pointer hover:bg-muted"
                              onClick={() => addMember(user)}
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.name}
                                  />
                                  <AvatarFallback>
                                    {user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">
                                    {user.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    @{user.username}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1"
                              >
                                Add
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          No users found
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Try a different search term
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">
                    Selected Members ({selectedMembers.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              @{member.username}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeMember(member.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="px-10 py-2 w-full mx-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Project...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </form>
    </div>
  );
}
