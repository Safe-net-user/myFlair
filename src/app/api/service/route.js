import { prisma } from "@/lib/prisma";


export async function GET(req, res) {
  try {
    const services = await prisma.service.findMany();
    console.log('Services from database:', services);
    return new Response(JSON.stringify(services), { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), { status: 500 });
  }
}
