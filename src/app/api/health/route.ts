import { NextResponse } from "next/server";

export async function GET() {
  try {
    // You could add database connectivity check here if needed
    // const result = await db.select().from(schema.users).limit(1);

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: "Service unavailable",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
