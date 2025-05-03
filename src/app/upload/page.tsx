"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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
import Cookies from "js-cookie";

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
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    projectName?: string;
    projectDescription?: string;
    file?: string;
    submission?: string;
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

  // Handle searching for users with debounce
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Set a new timeout for 2 seconds
    const timeout = setTimeout(() => {
      fetchUsers(value);
    }, 2000);

    setSearchTimeout(timeout);
  };

  // Fetch users from localhost API
  const fetchUsers = async (query: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/userinfo/${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      console.log("Fetched users:", data);

      // Check if data.user is an array or single object
      if (data.user) {
        if (Array.isArray(data.user)) {
          setSearchResults(data.user);
        } else {
          // If it's a single user object, put it in an array
          setSearchResults([data.user]);
        }
      } else {
        setSearchResults([]);
      }

      setIsSearching(false);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // Add a member to the team
  const addMember = (user: any) => {
    // Check if member is already selected
    if (!selectedMembers.some((member) => member.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
      // Filter out the added user from search results
      setSearchResults(searchResults.filter((result) => result.id !== user.id));
    }
  };

  // Remove a member from the team
  const removeMember = (userId: string) => {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get token from cookies
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Create form data for file upload
      const formData = new FormData();
      formData.append("name", projectName);
      formData.append("description", projectDescription);
      if (selectedFile) {
        formData.append("project", selectedFile);
      }

      // Add members IDs
      const memberIds = selectedMembers.map((member) => member.id);
      formData.append("members", JSON.stringify(memberIds));

      console.log("Form Data:", formData);

      // Send the request
      const response = await fetch(
        "http://localhost:3000/api/v1/project/create-project",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }

      // Redirect to the project page on success
      const projectData = await response.json();
      router.push(`/report/${projectData.project._id}`);
    } catch (error: any) {
      console.error("Error creating project:", error);
      setErrors((prev) => ({
        ...prev,
        submission:
          error.message || "Failed to create project. Please try again.",
      }));
      setIsSubmitting(false);
    }
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="container py-8  mx-auto dark:bg-[#040820]">
      <div className="flex items-center gap-2 mb-6 max-w-xl mx-auto">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Upload New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto ">
        <Card className="dark:bg-[#0f142a]">
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
                  className={`${
                    errors.projectName && "border-destructive"
                  } dark:bg-[#E5EFFF0D] dark:placeholder:text-[#E5EFFFAD]`}
                  placeholder="E-commerce Website"
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
                  placeholder="A brief description of the project..."
                  className={cn(
                    "min-h-[100px] dark:bg-[#E5EFFF0D] dark:placeholder:text-[#E5EFFFAD]",
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

        <Card className="dark:bg-[#0f142a]">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>
                Project File <span className="text-destructive">*</span>
              </Label>

              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors dark:bg-[#E5EFFF0D] dark:placeholder:text-white",
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

        <Card className="dark:bg-[#0f142a]">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>Team Members</Label>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by username..."
                  className="pl-9 dark:bg-[#E5EFFF0D] dark:placeholder:text-white"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              {/* Search Results */}
              {searchQuery.length > 1 && (
                <Card className="mt-2 overflow-hidden dark:bg-[#3a4255]">
                  <CardContent className="p-0">
                    {isSearching ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    ) : searchResults.length > 0 ? (
                      <ScrollArea className="max-h-[200px] dark:bg-[#3a4255]">
                        <div className="p-2 dark:bg-[#3a4255]">
                          {searchResults.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center justify-between rounded-md p-2 cursor-pointer hover:bg-muted dark:bg-[#0F172A]"
                              onClick={() => addMember(user)}
                            >
                              <div className="flex items-center gap-3 ">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={user.photo || "/placeholder.svg"}
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
                                    @
                                    {user.username ||
                                      user.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "_")}
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
                      <div className="flex flex-col items-center justify-center py-4 text-center dark:text-white">
                        <p className="text-sm text-muted-foreground dark:text-white">
                          No users found
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 dark:text-white">
                          Try a different search term
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div className="mt-4 ]">
                  <h3 className="text-sm font-medium mb-2">
                    Selected Members ({selectedMembers.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between rounded-md border p-2 dark:bg-[#040820]"
                      >
                        <div className="flex items-center gap-3 ">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={member.photo || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">
                              @
                              {member.username ||
                                member.name.toLowerCase().replace(/\s+/g, "_")}
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

        {errors.submission && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">
            {errors.submission}
          </div>
        )}

        <Button
          type="submit"
          className="px-10 py-2 w-full mx-auto dark:bg-[#126ed3] cursor-pointer dark:text-white"
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
