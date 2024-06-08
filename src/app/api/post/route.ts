// src/app/api/post/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const postData = await req.json();
    console.log('Données reçues:', postData);
    const createdPost = await prisma.post.create({
      data: postData,
    });

    console.log('Post créé:', createdPost);

    return NextResponse.json({ message: 'Post créé avec succès', postData: createdPost }, { status: 201 });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du post' }, { status: 500 });
  }
}
