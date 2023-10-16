import prisma from '@/db/prisma';

// GET
export async function GET() {
  try {
      const routines = await prisma.workoutPlan.findMany()

      return Response.json(routines)
  } catch (error) {
      return Response.json({ error: "An error occurred fetching routines." }, { status: 500 })
  }
}
