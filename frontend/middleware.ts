import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // Impede usuário logado de acessar /register
  if (request.nextUrl.pathname.startsWith("/register") && token) {
    return NextResponse.redirect(new URL("/catalog", request.url));
  }

  // Protege a rota /catalog
  if (request.nextUrl.pathname.startsWith("/catalog") && !token) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  return NextResponse.next();
}

// Opcional: defina as rotas protegidas
export const config = {
  matcher: ["/catalog/:path*", "/register"],
};
