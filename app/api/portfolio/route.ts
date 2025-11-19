
import { NextRequest, NextResponse } from 'next/server';
import { portfolioArtworks } from '@/lib/portfolio-data';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let filteredProjects = [...portfolioArtworks];

    // Filter by category
    if (category && category !== 'All') {
      filteredProjects = filteredProjects.filter(p => p.category === category);
    }

    // Filter by featured
    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(p => p.featured === true);
    }

    // Sort by featured, then year, then created date
    filteredProjects.sort((a, b) => {
      if (a.featured !== b.featured) return b.featured ? 1 : -1;
      if (a.year !== b.year) return b.year - a.year;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    // Apply limit
    if (limit) {
      filteredProjects = filteredProjects.slice(0, parseInt(limit));
    }

    const transformedProjects = filteredProjects.map((project: any) => ({
      ...project,
      dimensions: `${project.width} ft × ${project.height} ft`
    }));

    return NextResponse.json({
      success: true,
      data: transformedProjects
    });

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
