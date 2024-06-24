import { prisma } from "@/lib/prisma";


export async function GET(req, res) {
  try {
    const postes = await prisma.post.findMany({
      
    });
    console.log('post from database:', postes);
    return new Response(JSON.stringify(postes), { status: 200 });
  } catch (error) {
    console.error('Error fetching workPlace:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch workPlace' }), { status: 500 });
  }
}