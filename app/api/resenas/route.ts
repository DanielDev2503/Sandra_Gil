import { prisma } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ResenaPayloadSchema = z.object({
  producto_id: z.string().uuid({ message: 'ID de producto inválido' }),
  autor: z.string().trim().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).max(80),
  calificacion: z.number().int().min(1, { message: 'La calificación mínima es 1' }).max(5, { message: 'La calificación máxima es 5' }),
  comentario: z.string().trim().min(5, { message: 'El comentario debe tener al menos 5 caracteres' }).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const parseResult = ResenaPayloadSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map((e) => e.message).join(', ');
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { producto_id, autor, calificacion, comentario } = parseResult.data;

    // Verify product exists and is active
    const producto = await prisma.producto.findUnique({
      where: { id: producto_id },
      select: { id: true, activo: true },
    });

    if (!producto || !producto.activo) {
      return NextResponse.json(
        { error: 'El producto no existe o no está activo.' },
        { status: 404 }
      );
    }

    // Create review
    const resena = await prisma.resena.create({
      data: {
        producto_id,
        autor,
        calificacion,
        comentario,
      },
    });

    return NextResponse.json(resena, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al procesar la reseña.' },
      { status: 500 }
    );
  }
}
