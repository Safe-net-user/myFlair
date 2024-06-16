'use serveur'
import { prisma } from "@/lib/prisma";


export async function GET(req, res) {
  try {
    const servicesAdditionnal = await prisma.additionalService.findMany();
    console.log('servicesAdditionnal from database:', servicesAdditionnal);
    return new Response(JSON.stringify(servicesAdditionnal), { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), { status: 500 });
  }
}
