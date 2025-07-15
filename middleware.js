// This file is used to handle redirects for dynamic routes in static export
// It's a workaround for Next.js static export with dynamic routes

import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Extract the path from the URL
  const url = new URL(request.url)
  const path = url.pathname
  
  // Check if it's a dynamic order path
  if (path.startsWith('/orders/') && path.match(/^\/orders\/(?!sample-order-[123])[\w-]+$/)) {
    // Redirect to a sample order as a fallback
    return NextResponse.redirect(new URL('/orders/sample-order-1', request.url))
  }
  
  // Check if it's a dynamic order edit path
  if (path.match(/^\/orders\/(?!sample-order-[123])[\w-]+\/edit$/)) {
    // Redirect to a sample order edit page as a fallback
    return NextResponse.redirect(new URL('/orders/sample-order-1/edit', request.url))
  }
  
  // Continue with the request for all other paths
  return NextResponse.next()
}
