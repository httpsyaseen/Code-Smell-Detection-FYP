"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Check,
  Loader2,
  Save,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  // Project data state
  const [projectName, setProjectName] = useState("E-commerce Platform");
  const [projectDescription, setProjectDescription] = useState(
    "Main e-commerce platform codebase with customer-facing storefront, admin dashboard, and inventory management system. Built with Next.js, TypeScript, and MongoDB."
  );

  // Team members state
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Maria Garcia",
      username: "mariag",
      avatar: "/placeholder.svg",
    },
    { id: 3, name: "Sam Taylor", username: "samt", avatar: "/placeholder.svg" },
    {
      id: 4,
      name: "Jamie Lee",
      username: "jamiel",
      avatar: "/placeholder.svg",
    },
  ]);

  // Remove member dialog state
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Add member dialog state
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Save changes state
  const [isSaving, setIsSaving] = useState(false);

  // Handle removing a team member
  const handleRemoveMember = (member: { id: number; name: string }) => {
    setMemberToRemove(member);
    setRemoveDialogOpen(true);
  };

  // Confirm removing a team member
  const confirmRemoveMember = () => {
    if (memberToRemove) {
      setTeamMembers(
        teamMembers.filter((member) => member.id !== memberToRemove.id)
      );
      setRemoveDialogOpen(false);
      setMemberToRemove(null);
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
          !teamMembers.some((member) => member.id === user.id) &&
          (user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.username.toLowerCase().includes(value.toLowerCase()))
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Add a member to the team
  const addMember = (user: any) => {
    setTeamMembers([...teamMembers, user]);
    setAddMemberDialogOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Save project settings
  const saveSettings = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Here you would normally save the project data to your backend
    }, 1000);
  };

  // Reset search when dialog closes
  const handleDialogOpenChange = (open: boolean) => {
    setAddMemberDialogOpen(open);
    if (!open) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };
  const router = useRouter();

  // Function to go back to the previous page
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container py-8 mx-auto px-24">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="bg-50 px-10 py-2"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          <p className="font-bold text-xl">Back</p>
        </Button>
      </div>
      <div className="w-full max-w-3xl flex flex-col justify-center items-center mx-auto">
        <h1 className="text-2xl font-bold py-4 self-start">Project Settings</h1>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Update your project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={saveSettings}
                disabled={isSaving}
                className="ml-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage who has access to this project
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() => setAddMemberDialogOpen(true)}
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Member</span>
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px] pr-4">
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
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
                        onClick={() => handleRemoveMember(member)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Remove Member Confirmation Dialog */}
        <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Remove Team Member</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove {memberToRemove?.name} from this
                project? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setRemoveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmRemoveMember}>
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Member Dialog */}
        <Dialog
          open={addMemberDialogOpen}
          onOpenChange={handleDialogOpenChange}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Search for users by name or username to add them to your
                project.
              </DialogDescription>
            </DialogHeader>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="min-h-[200px] max-h-[300px] overflow-y-auto mt-2">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted"
                      onClick={() => addMember(user)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                      <Check className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              ) : searchQuery.length > 1 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No users found
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Type at least 2 characters to search
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddMemberDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
