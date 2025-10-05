import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const checks: any = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    version: process.env.npm_package_version || 'unknown',
    environment: process.env.NODE_ENV || 'development',
    uptime: Math.floor(process.uptime()),
    checks: {
      database: { status: 'unknown', responseTime: 0 },
      filesystem: { status: 'unknown', responseTime: 0 },
      memory: { status: 'unknown', usage: 0, limit: 0 }
    }
  };

  // Database health check
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1 as health_check`;
    const dbTime = Date.now() - dbStart;

    checks.checks.database = {
      status: dbTime < 1000 ? 'healthy' : 'slow',
      responseTime: dbTime
    };
  } catch (error) {
    checks.checks.database = {
      status: 'unhealthy',
      responseTime: 0,
      error: error instanceof Error ? error.message : 'Unknown database error'
    };
    checks.status = 'unhealthy';
  }

  // Filesystem health check (check if uploads directory is writable)
  try {
    const fsStart = Date.now();
    const { existsSync, mkdirSync, writeFileSync, unlinkSync } = await import('fs');
    const { join } = await import('path');

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    const testFile = join(uploadsDir, `.health-check-${Date.now()}.tmp`);
    writeFileSync(testFile, 'health check');
    unlinkSync(testFile);

    const fsTime = Date.now() - fsStart;
    checks.checks.filesystem = {
      status: 'healthy',
      responseTime: fsTime
    };
  } catch (error) {
    checks.checks.filesystem = {
      status: 'unhealthy',
      responseTime: 0,
      error: error instanceof Error ? error.message : 'Unknown filesystem error'
    };
    checks.status = 'unhealthy';
  }

  // Memory usage check
  try {
    const memUsage = process.memoryUsage();
    const totalMem = memUsage.rss;
    const memLimit = 512 * 1024 * 1024; // 512MB limit (adjust as needed)

    checks.checks.memory = {
      status: totalMem < memLimit * 0.8 ? 'healthy' : totalMem < memLimit ? 'warning' : 'unhealthy',
      usage: Math.floor(totalMem / 1024 / 1024), // MB
      limit: Math.floor(memLimit / 1024 / 1024), // MB
      percentage: Math.floor((totalMem / memLimit) * 100)
    };

    if (checks.checks.memory.status === 'unhealthy') {
      checks.status = 'unhealthy';
    }
  } catch (error) {
    checks.checks.memory = {
      status: 'unknown',
      usage: 0,
      limit: 0,
      error: error instanceof Error ? error.message : 'Unknown memory error'
    };
  }

  // Return appropriate HTTP status
  const httpStatus = checks.status === 'healthy' ? 200 : 503;

  return NextResponse.json(checks, {
    status: httpStatus,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

// Simple readiness check (faster, for load balancer)
export async function HEAD() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}