//  "middleware" term is enforced by Next.js, has to go in the root dir
import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

export async function middleware(req: NextRequest) {
    // determine the ip address making the request
    const ip = req.ip ?? "127.0.0.1"; // or localhost

    try {
        const { success } = await rateLimiter.limit(ip);

        if (!success)
            return new NextResponse(
                "Slow down cowboy, you are submitting messages too fast"
            );
        return NextResponse.next();
    } catch (error) {
        return new NextResponse(
            "Oops, something went wrong processing your message"
        );
    }
}

// Tell middleware which routes to run on
// config is enforced by Next.js
export const config = {
    matcher: "/api/message/:path*",
};
