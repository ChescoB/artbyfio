
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminNav } from '@/components/admin/admin-nav';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContentSection {
  id: string;
  key: string;
  title: string;
  content: string;
  contentEs?: string | null;
  type: string;
  page: string;
  order: number;
}

export default function ContentManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchContent();
    }
  }, [session]);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (error) {
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (section: ContentSection, updates: Partial<ContentSection>) => {
    setSaving(section.id);
    
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: section.id,
          ...updates
        })
      });

      if (res.ok) {
        toast.success('Content updated successfully');
        fetchContent();
      } else {
        toast.error('Failed to update content');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSaving(null);
    }
  };

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.page]) {
      acc[item.page] = [];
    }
    acc[item.page].push(item);
    return acc;
  }, {} as Record<string, ContentSection[]>);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Edit website text and content sections</p>
        </div>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {Object.keys(groupedContent).map((page) => (
            <TabsContent key={page} value={page} className="space-y-6 mt-6">
              {groupedContent[page]?.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>
                      Key: {section.key} • Type: {section.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${section.id}-en`}>Content (English)</Label>
                      {section.type === 'textarea' ? (
                        <Textarea
                          id={`${section.id}-en`}
                          defaultValue={section.content}
                          rows={4}
                          onBlur={(e) => {
                            if (e.target.value !== section.content) {
                              handleUpdate(section, { content: e.target.value });
                            }
                          }}
                        />
                      ) : (
                        <Input
                          id={`${section.id}-en`}
                          defaultValue={section.content}
                          onBlur={(e) => {
                            if (e.target.value !== section.content) {
                              handleUpdate(section, { content: e.target.value });
                            }
                          }}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`${section.id}-es`}>Content (Spanish)</Label>
                      {section.type === 'textarea' ? (
                        <Textarea
                          id={`${section.id}-es`}
                          defaultValue={section.contentEs || ''}
                          rows={4}
                          onBlur={(e) => {
                            if (e.target.value !== section.contentEs) {
                              handleUpdate(section, { contentEs: e.target.value });
                            }
                          }}
                        />
                      ) : (
                        <Input
                          id={`${section.id}-es`}
                          defaultValue={section.contentEs || ''}
                          onBlur={(e) => {
                            if (e.target.value !== section.contentEs) {
                              handleUpdate(section, { contentEs: e.target.value });
                            }
                          }}
                        />
                      )}
                    </div>

                    {saving === section.id && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
