import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookieString = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieString.split('; ').map((c) => c.split('='))
  );

  const sessionCookie = cookies['connect.sid'];

  if (!sessionCookie) {
    return NextResponse.json(
      { error: 'Unauthorized, no session cookie' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/buyer/:path*', '/seller/:path*', '/mygallery/:path*'],
};
