import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Check if this is the last admin
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    const userToDelete = await prisma.user.findUnique({
      where: { id: params.id },
      select: { role: true }
    });

    if (userToDelete?.role === 'ADMIN' && adminCount === 1) {
      return new Response('Cannot delete the last administrator', { status: 400 });
    }

    await prisma.user.delete({
      where: { id: params.id }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('User deletion error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
