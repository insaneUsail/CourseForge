import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible Auth.js config (no Prisma/bcrypt imports).
 * Used by middleware for route-level authorization.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const pathname = nextUrl.pathname;

      // Teacher routes require teacher role
      if (pathname.startsWith("/teacher")) {
        if (!isLoggedIn) return false;
        if (role !== "TEACHER") {
          return Response.redirect(new URL("/student/dashboard", nextUrl));
        }
        return true;
      }

      // Student routes require student role
      if (pathname.startsWith("/student")) {
        if (!isLoggedIn) return false;
        if (role !== "STUDENT") {
          return Response.redirect(new URL("/teacher/dashboard", nextUrl));
        }
        return true;
      }

      // Redirect logged-in users away from login/signup
      if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
        const redirectUrl =
          role === "TEACHER" ? "/teacher/dashboard" : "/student/dashboard";
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      // Public routes — allow all
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as "TEACHER" | "STUDENT";
      }
      return session;
    },
  },
  providers: [], // Providers added in the Node-runtime auth.ts
  trustHost: true,
} satisfies NextAuthConfig;
