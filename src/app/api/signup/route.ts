import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (typeof password !== "string" || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    await db.insert(users).values({ email, passwordhash: hashedPassword });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
