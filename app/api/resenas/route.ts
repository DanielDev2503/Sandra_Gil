import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { producto_id, autor, calificacion, comentario } = body;

    // Validation
    if (!producto_id || !autor?.trim() || !comentario?.trim()) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    if (typeof calificacion !== 'number' || calificacion < 1 || calificacion > 5) {
      return NextResponse.json(
        { error: 'La calificación debe ser un número entre 1 y 5.' },
        { status: 400 }
      );
    }

    // Verify product exists
    const producto = await prisma.producto.findUnique({
      where: { id: producto_id },
      select: { id: true },
    });

    if (!producto) {
      return NextResponse.json(
        { error: 'Producto no encontrado.' },
        { status: 404 }
      );
    }

    // Create review
    const resena = await prisma.resena.create({
      data: {
        producto_id,
        autor: autor.trim(),
        calificacion: Math.round(calificacion),
        comentario: comentario.trim(),
      },
    });

    return NextResponse.json(resena, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
