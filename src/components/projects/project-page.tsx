"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Filter, Search } from "lucide-react";

// Dummy data for projects
const PROJECTS_DATA = [
  {
    id: 1,
    name: "E-commerce Platform",
    description: "Online shopping platform with product catalog and checkout",
    lastUpdated: "2023-04-20",
    smells: 12,
    quality: 85,
    team: [
      {
        id: 1,
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 2,
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 2,
    name: "CRM System",
    description: "Customer relationship management system with analytics",
    lastUpdated: "2023-04-18",
    smells: 24,
    quality: 62,
    team: [
      {
        id: 3,
        name: "David Chen",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 4,
        name: "Emily Wong",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 5,
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 3,
    name: "Mobile App Backend",
    description: "RESTful API for mobile application",
    lastUpdated: "2023-04-15",
    smells: 8,
    quality: 91,
    team: [
      {
        id: 6,
        name: "Jessica Lee",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 7,
        name: "Ryan Garcia",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 4,
    name: "Analytics Dashboard",
    description: "Data visualization dashboard for business metrics",
    lastUpdated: "2023-04-10",
    smells: 18,
    quality: 73,
    team: [
      {
        id: 8,
        name: "Thomas Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 5,
    name: "Payment Gateway",
    description: "Secure payment processing system",
    lastUpdated: "2023-04-05",
    smells: 15,
    quality: 79,
    team: [
      {
        id: 9,
        name: "Olivia Martinez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 10,
        name: "William Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 6,
    name: "Inventory Management",
    description: "Stock tracking and management system",
    lastUpdated: "2023-04-02",
    smells: 21,
    quality: 68,
    team: [
      {
        id: 11,
        name: "Sophia Anderson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 12,
        name: "James Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 7,
    name: "Content Management System",
    description: "Web content publishing platform",
    lastUpdated: "2023-03-28",
    smells: 32,
    quality: 58,
    team: [
      {
        id: 13,
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 8,
    name: "HR Portal",
    description: "Employee management and onboarding system",
    lastUpdated: "2023-03-25",
    smells: 14,
    quality: 82,
    team: [
      {
        id: 14,
        name: "Noah Thompson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 15,
        name: "Ava Robinson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 9,
    name: "Social Media API",
    description: "Backend services for social networking app",
    lastUpdated: "2023-03-20",
    smells: 9,
    quality: 88,
    team: [
      {
        id: 16,
        name: "Liam Harris",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 17,
        name: "Charlotte Clark",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 10,
    name: "Task Management App",
    description: "Project and task tracking application",
    lastUpdated: "2023-03-15",
    smells: 17,
    quality: 76,
    team: [
      {
        id: 18,
        name: "Benjamin Lewis",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: 19,
        name: "Mia Walker",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("lastUpdated");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter and sort projects
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === "quality") {
      return sortOrder === "asc"
        ? a.quality - b.quality
        : b.quality - a.quality;
    } else if (sortBy === "smells") {
      return sortOrder === "asc" ? a.smells - b.smells : b.smells - a.smells;
    } else {
      // lastUpdated
      return sortOrder === "asc"
        ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getQualityBadge = (score: number) => {
    if (score >= 80) return <Badge variant="default">Good</Badge>;
    if (score >= 60) return <Badge variant="outline">Average</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 px-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-xl mb-4">
            All Projects ({filteredProjects.length})
          </CardTitle>

          {/* Search and Sort - Now under the All Projects title */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className={sortBy === "lastUpdated" ? "bg-accent" : ""}
                    onClick={() => {
                      setSortBy("lastUpdated");
                      toggleSortOrder();
                    }}
                  >
                    Last Updated{" "}
                    {sortBy === "lastUpdated" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "name" ? "bg-accent" : ""}
                    onClick={() => {
                      setSortBy("name");
                      toggleSortOrder();
                    }}
                  >
                    Project Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "quality" ? "bg-accent" : ""}
                    onClick={() => {
                      setSortBy("quality");
                      toggleSortOrder();
                    }}
                  >
                    Quality Score{" "}
                    {sortBy === "quality" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={sortBy === "smells" ? "bg-accent" : ""}
                    onClick={() => {
                      setSortBy("smells");
                      toggleSortOrder();
                    }}
                  >
                    Code Smells{" "}
                    {sortBy === "smells" && (sortOrder === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Project</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Code Smells</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{project.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {project.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(project.lastUpdated)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle
                          className={`mr-2 h-4 w-4 ${
                            project.smells > 20
                              ? "text-destructive"
                              : "text-yellow-500"
                          }`}
                        />
                        <span>{project.smells}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getQualityBadge(project.quality)}
                        <span>{project.quality}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member) => (
                          <Avatar
                            key={member.id}
                            className="border-2 border-background h-8 w-8"
                          >
                            <AvatarImage
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground text-xs border-2 border-background">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No projects found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
