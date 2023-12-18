import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get, has } from '@vercel/edge-config'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  const paths = request.nextUrl.pathname.split('/')
  const edgeConfigKeyExists = await has(paths[1])

  if (edgeConfigKeyExists) {
    const redirect = (await get(paths[1])) as string

    if (paths[1] === 'issues' && paths[2]) {
      return NextResponse.redirect(`${redirect}/${paths[2]}`)
    } else {
      return NextResponse.redirect(redirect)
    }
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!_next|icon.svg).*)'],
}
