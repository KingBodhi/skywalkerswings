import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  // Only allow admin users to access metrics
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const metrics = {
      timestamp: new Date().toISOString(),
      application: {
        version: process.env.npm_package_version || 'unknown',
        environment: process.env.NODE_ENV || 'development',
        uptime: Math.floor(process.uptime()),
        memory: process.memoryUsage(),
        pid: process.pid
      },
      business: {
        totalUsers: await prisma.user.count(),
        totalProducts: await prisma.product.count(),
        totalCollections: await prisma.collection.count(),
        totalOrders: await prisma.order.count(),
        recentUsers: await prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          }
        }),
        recentOrders: await prisma.order.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          }
        })
      },
      system: {
        nodejs: process.version,
        platform: process.platform,
        arch: process.arch
      }
    };

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve metrics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}