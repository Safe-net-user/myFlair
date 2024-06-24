// src/app/api/post/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const postData = await req.json();
    console.log('Données reçues:', postData);

    const stock = parseInt(postData.stock, 10);
    const durationWeekStartHour = parseInt(postData.durationWeekStartHour, 10);
    const durationWeekStartMinute = parseInt(postData.durationWeekStartMinute, 10);
    const durationWeekEndHour = parseInt(postData.durationWeekEndHour, 10);
    const durationWeekEndMinute = parseInt(postData.durationWeekEndMinute, 10);
    const durationSaturdayStartHour = parseInt(postData.durationSaturdayStartHour, 10);
    const durationSaturdayStartMinute = parseInt(postData.durationSaturdayStartMinute, 10);
    const durationSaturdayEndHour = parseInt(postData.durationSaturdayEndHour, 10);
    const durationSaturdayEndMinute = parseInt(postData.durationSaturdayEndMinute, 10);

    const createdPost = await prisma.post.create({
      data: {
        title: postData.title,
        weekPrice: postData.weekPrice,
        saturdayPrice: postData.saturdayPrice,
        stock: stock,
        valide: postData.valide,
        description: postData.description,
        durationWeekStartHour: durationWeekStartHour,
        durationWeekStartMinute: durationWeekStartMinute,
        durationWeekEndHour: durationWeekEndHour,
        durationWeekEndMinute: durationWeekEndMinute,
        durationSaturdayStartHour: durationSaturdayStartHour,
        durationSaturdayStartMinute: durationSaturdayStartMinute,
        durationSaturdayEndHour: durationSaturdayEndHour,
        durationSaturdayEndMinute: durationSaturdayEndMinute,
        image: postData.image,
        alt: postData.alt,
      },
    });

    console.log('Post créé:', createdPost);

    return NextResponse.json({ message: 'Post créé avec succès', postData: createdPost }, { status: 201 });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du post' }, { status: 500 });
  }
}
