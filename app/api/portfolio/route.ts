
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let whereClause: any = {};

    if (category && category !== 'All') {
      whereClause.category = category;
    }

    if (featured === 'true') {
      whereClause.featured = true;
    }

    const projects = await prisma.muralProject.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { year: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit) : undefined
    });

    const transformedProjects = projects.map(project => ({
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
