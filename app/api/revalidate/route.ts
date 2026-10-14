import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

async function handleRevalidation(req: NextRequest) {
  let secret = req.nextUrl.searchParams.get('secret');
  let path = req.nextUrl.searchParams.get('path');
  let slug = req.nextUrl.searchParams.get('slug');
  let tag = req.nextUrl.searchParams.get('tag');

  // Si es un POST con JSON, intentar extraer del body
  if (req.method === 'POST') {
    try {
      const contentType = req.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await req.json();
        secret = secret || body.secret;
        path = path || body.path;
        slug = slug || body.slug;
        tag = tag || body.tag;
      }
    } catch {
      // Body vacío o no parseable, continuamos con query params
    }
  }

  // Soporte adicional para Authorization header: Bearer <secret>
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    secret = secret || authHeader.substring(7).trim();
  }

  const expectedSecret = process.env.REVALIDATION_SECRET || 'sandra_gil_cache_token_2026';

  if (!secret || secret !== expectedSecret) {
    console.warn('[Revalidate] Intento de revalidación no autorizado o secreto no configurado.');
    return NextResponse.json({ message: 'Token de revalidación inválido o ausente' }, { status: 401 });
  }

  try {
    const revalidatedPaths: string[] = [];

    // 1. Invalidar árbol completo de rutas en Vercel CDN mediante el layout raíz
    revalidatePath('/', 'layout');
    revalidatedPaths.push('/ (layout)');

    // 2. Revalidar explícitamente páginas clave de catálogo y storefront
    revalidatePath('/', 'page');
    revalidatePath('/catalogo', 'page');
    revalidatePath('/personalizadas', 'page');
    revalidatePath('/preguntas-frecuentes', 'page');
    revalidatedPaths.push('/', '/catalogo', '/personalizadas', '/preguntas-frecuentes');

    // 3. Revalidar ruta personalizada si se especifica
    if (path && !['/', '/catalogo', '/personalizadas', '/preguntas-frecuentes'].includes(path)) {
      revalidatePath(path);
      revalidatedPaths.push(path);
    }

    // 4. Revalidar detalle de producto específico si se pasó slug
    if (slug) {
      const productPath = `/productos/${slug}`;
      revalidatePath(productPath, 'page');
      revalidatedPaths.push(productPath);
    }

    // 5. Revalidar caché por etiqueta si fue suministrada
    if (tag) {
      revalidateTag(tag, 'layout');
      revalidatedPaths.push(`tag:${tag}`);
    }

    console.log(`[Revalidate] Caché invalidada exitosamente en Vercel CDN para: ${revalidatedPaths.join(', ')}`);

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
      now: Date.now(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('[Revalidate] Error revalidando rutas en Vercel:', err);
    return NextResponse.json({ message: 'Error revalidando ruta', error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}

