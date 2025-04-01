import { NextRequest, NextResponse } from 'next/server'
// import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
import NextAuth from 'next-auth'
import authConfig from './auth.config'
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/routes'

const { auth } = NextAuth(authConfig)
 
// export default async function middleware(req: NextRequest) {
//   // 3. Decrypt the session from the cookie
//   const cookie = (await cookies()).get('session')?.value
//   const session = await decrypt(cookie)
 
//   // 4. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/login', req.nextUrl))
//   }
 
//   // 5. Redirect to /dashboard if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   }
 
  
// }
 
export default auth((req: any) => {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  console.log('Middleware is invoked on ' + path)

  const isLoggedIn = !!req.auth
  console.log('Logged in: ', isLoggedIn)

  const isApiAuthRoute = path.startsWith(apiAuthPrefix)
  // const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const isAuthRoute = authRoutes.includes(path)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
      return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl))
  }

  return
})

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}