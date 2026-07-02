import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "ADMIN_PASSWORD not set" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}

export async function PATCH(req: Request) {
  const { currentPassword, newPassword } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "ADMIN_PASSWORD not set" }, { status: 500 });
  }

  if (currentPassword !== adminPassword) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  if (!newPassword || newPassword.length < 4) {
    return NextResponse.json({ error: "New password must be at least 4 characters" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Password updated. Remember to update your .env file." });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });

  return response;
}
