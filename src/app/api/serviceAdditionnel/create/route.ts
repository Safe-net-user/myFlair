import { NextRequest, NextResponse } from 'next/server';
import { htmlToText } from 'html-to-text';
import { prisma } from '@/lib/prisma';



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, alt, price, quantity, image, type, sales } = body;

    console.log('Données reçues:', body);



    const descriptionWithoutHtml = htmlToText(description);

    const service = await prisma.additionalService.create({
      data: {
        image,
        alt,
        title,
        description:descriptionWithoutHtml,
        price:parseInt(price, 10),
        quantity:parseInt(quantity, 10),
        type,
        sales,
      },
    });

    console.log('Service créé:', service);

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la création du service:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du service.' }, { status: 500 });
  }
}

export const runtime = 'experimental-edge';