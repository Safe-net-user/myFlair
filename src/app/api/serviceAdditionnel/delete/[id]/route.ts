import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
  if (req.method === 'DELETE') {
    const url = new URL(req.url);
    const idService = url.searchParams.get('id');
    console.log(idService);

    if (!idService) {
      return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
    }

    try {
      await prisma.additionalService.delete({
        where: { id: idService },
      });
      return NextResponse.json({ message: 'Service successfully deleted' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting service:', error);
      return NextResponse.json({ error: 'An error occurred while deleting the service' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}

export const runtime = 'experimental-edge';