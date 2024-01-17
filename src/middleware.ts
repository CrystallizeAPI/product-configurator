import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { credentials, cookieName } from "@/core/credentials";

const EXPIRES_IN = 18000;
const { tenantIdentifier, accessTokenId, accessTokenSecret } = credentials;

export async function middleware(request: NextRequest) {
    if (request.cookies.has(cookieName)) {
        return;
    }

    const shopResponse = await fetch(
        `https://shop-api.crystallize.com/@${tenantIdentifier}/auth/token`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Crystallize-Access-Token-Id": accessTokenId,
                "X-Crystallize-Access-Token-Secret": accessTokenSecret,
            },
            body: JSON.stringify({
                scopes: ["cart"],
                expiresIn: EXPIRES_IN + 2000,
            }),
        }
    );

    const { token } = await shopResponse.json();
    const response = NextResponse.redirect(new URL(request.url));

    response.cookies.set({
        name: cookieName,
        value: token,
        path: "/",
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + EXPIRES_IN),
    });

    return response;
}
