import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { getSession } from '@/lib/auth';
import { withRateLimit } from '@/lib/with-rate-limit';

async function handleUpload(request: NextRequest) {
  // Authentication check
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Authorization check - only ADMIN and EDITOR can upload
  if (!['ADMIN', 'EDITOR'].includes(session.role)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Enhanced file validation
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB max

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.'
      }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({
        error: 'File too large. Maximum size is 5MB.'
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create upload directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${originalName}`;
    const filepath = join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: publicUrl,
      filename 
    });

  } catch (error) {
    const { loggers } = await import('@/lib/logger');
    loggers.upload.error({
      error: error instanceof Error ? error.message : 'Unknown error',
      userId: session?.userId,
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    }, 'File upload failed');
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// Apply rate limiting to upload endpoint
const rateLimitedUpload = withRateLimit({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
  message: 'Upload rate limit exceeded. Please wait before uploading more files.'
});

export const POST = rateLimitedUpload(handleUpload);
