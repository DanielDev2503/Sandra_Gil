import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

async function handleRevalidation(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  const path = req.nextUrl.searchParams.get('path') || '/catalogo';

  if (!process.env.REVALIDATION_SECRET || secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Token de revalidación inválido' }, { status: 401 });
  }

  try {
    revalidatePath(path);
    revalidatePath('/');
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidando ruta', err }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}
