import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get, has } from '@vercel/edge-config'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  const edgeConfigKeyExists = await has(request.nextUrl.pathname.substring(1))

  if (edgeConfigKeyExists) {
    const redirect = (await get(
      request.nextUrl.pathname.substring(1),
    )) as string
    return NextResponse.redirect(redirect)
  }
}

export const config = {
  matcher: ['/((?!_next|icon.svg).*)'],
}
