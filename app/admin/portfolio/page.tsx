
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminNav } from '@/components/admin/admin-nav';
import { Plus, Edit, Trash2, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  titleEs?: string | null;
  description: string;
  descriptionEs?: string | null;
  location: string;
  year: number;
  width: number;
  height: number;
  medium: string;
  client?: string | null;
  category: string;
  imageUrl: string;
  featured: boolean;
}

export default function PortfolioManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchProjects();
    }
  }, [session]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/portfolio');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Project deleted successfully');
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      id: editingProject?.id,
      title: formData.get('title'),
      titleEs: formData.get('titleEs'),
      description: formData.get('description'),
      descriptionEs: formData.get('descriptionEs'),
      location: formData.get('location'),
      year: formData.get('year'),
      width: formData.get('width'),
      height: formData.get('height'),
      medium: formData.get('medium'),
      client: formData.get('client'),
      category: formData.get('category'),
      imageUrl: formData.get('imageUrl') || editingProject?.imageUrl,
      featured: formData.get('featured') === 'true'
    };

    try {
      const res = await fetch('/api/admin/portfolio', {
        method: editingProject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success(`Project ${editingProject ? 'updated' : 'created'} successfully`);
        setIsDialogOpen(false);
        setEditingProject(null);
        fetchProjects();
      } else {
        toast.error(`Failed to ${editingProject ? 'update' : 'create'} project`);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const { cloud_storage_path } = await res.json();
        const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement;
        if (imageUrlInput) {
          imageUrlInput.value = cloud_storage_path;
        }
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Portfolio Management</h1>
            <p className="text-muted-foreground">Manage your artwork and projects</p>
          </div>
          <Button onClick={() => {
            setEditingProject(null);
            setIsDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>
                  {project.location} • {project.year}
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setEditingProject(project);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
              <DialogDescription>
                {editingProject ? 'Update project details' : 'Add a new artwork to your portfolio'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (English)*</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingProject?.title}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titleEs">Title (Spanish)</Label>
                  <Input
                    id="titleEs"
                    name="titleEs"
                    defaultValue={editingProject?.titleEs || ''}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (English)*</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingProject?.description}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEs">Description (Spanish)</Label>
                <Textarea
                  id="descriptionEs"
                  name="descriptionEs"
                  defaultValue={editingProject?.descriptionEs || ''}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location*</Label>
                  <Input
                    id="location"
                    name="location"
                    defaultValue={editingProject?.location}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year*</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    defaultValue={editingProject?.year}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (ft)*</Label>
                  <Input
                    id="width"
                    name="width"
                    type="number"
                    step="0.1"
                    defaultValue={editingProject?.width}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (ft)*</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    step="0.1"
                    defaultValue={editingProject?.height}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medium">Medium*</Label>
                  <Input
                    id="medium"
                    name="medium"
                    defaultValue={editingProject?.medium}
                    placeholder="Acrylic on wall"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    name="client"
                    defaultValue={editingProject?.client || ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select name="category" defaultValue={editingProject?.category || 'Public Art'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public Art">Public Art</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured">Featured</Label>
                  <Select name="featured" defaultValue={editingProject?.featured ? 'true' : 'false'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL*</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  defaultValue={editingProject?.imageUrl}
                  required
                />
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                    disabled={uploading}
                  />
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload an image or enter a URL manually
                </p>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
