// src/app/api/auth/callback/route.ts

export const runtime = "edge"; // ✅ Use Edge Runtime

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!
);

function toBase64(str: string) {
	return Buffer.from(str).toString("base64");
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const redirect = "valysis://auth/callback";

	if (!code) {
		return new Response("Missing code", { status: 400 }); 
	}

	try {
		// Exchange code for access token
		const tokenRes = await fetch("https://auth.riotgames.com/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${toBase64(
					`${process.env.RIOT_CLIENT_ID!}:${process.env.RIOT_CLIENT_SECRET!}`
				)}`,
			},
			body: new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri: process.env.RIOT_REDIRECT_URI!,
			}),
		});

		if (!tokenRes.ok) {
			const error = await tokenRes.text();
			console.error("Token exchange failed:", error);
			return Response.redirect(`${redirect}?status=error`);
		}

		const tokenData = await tokenRes.json();
		const accessToken = tokenData.access_token;

		// Get user info
		const userInfoRes = await fetch("https://auth.riotgames.com/userinfo", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!userInfoRes.ok) {
			const error = await userInfoRes.text();
			console.error("Failed to fetch user info:", error);
			return Response.redirect(`${redirect}?status=error`);
		}

		const userInfo = await userInfoRes.json();
		const { sub } = userInfo;

		// Call Riot Account API to get gameName + tagLine (NA region)
		const riotAccountRes = await fetch(
			`https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/${sub}`,
			{
				headers: {
					"X-Riot-Token": process.env.RIOT_API_KEY!,
				},
			}
		);

		if (!riotAccountRes.ok) {
			const error = await riotAccountRes.text();
			console.error("Failed to get Riot account data:", error);
			return Response.redirect(`${redirect}?status=error`);
		}

		const riotAccount = await riotAccountRes.json();
		console.log(riotAccount);
		const { gameName, tagLine } = riotAccount;

		// Upsert into Supabase
		const { error } = await supabase
			.from("User")
			.upsert(
				{ riotSub: sub, gameName ,tagLine, hasConsented: true },
				{ onConflict: "riotSub" }
			);

		if (error) {
			console.error("Supabase upsert error:", error);
			return Response.redirect(`${redirect}?status=error`);
		}

		return Response.redirect(`${redirect}?status=success`);
	} catch (err: any) {
		console.error("OAuth Error:", err.message);
		return Response.redirect(`${redirect}?status=error`);
	}
}
