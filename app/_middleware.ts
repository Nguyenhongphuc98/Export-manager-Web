// app/_middleware.js (or /pages/_middleware.js)
import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const response = NextResponse.next();

  // Set Content-Security-Policy header
  response.headers.set('Content-Security-Policy', "frame-ancestors 'self' http://localhost:8080/");

  // Set X-Frame-Options header (deprecated but can be used for compatibility)
  response.headers.set('X-Frame-Options', 'ALLOW-FROM http://localhost:8080/');

  return response;
}
