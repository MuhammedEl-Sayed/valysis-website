"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";

// 👇 This disables prerender/SSG and ensures client-side rendering
export const dynamic = "force-dynamic";

function AuthCallbackInner() {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const redirect = "valysis://auth/callback";

	useEffect(() => {
		if (!code) {
			window.location.href = `${redirect}?status=error`;
			return;
		}

		const processOAuth = async () => {
			try {
				const res = await fetch(`/api/auth/callback?code=${code}`);
				const data = await res.json();

				if (data.status === "success") {
					window.location.href = `${redirect}?status=success`;
				} else {
					throw new Error("API returned error");
				}
			} catch {
				console.error("OAuth failed, retrying deep link...");
				setTimeout(() => {
					window.location.href = `${redirect}?status=error`;
				}, 5000);
			}
		};

		processOAuth();
	}, [code]);

	return null;
}

export default function AuthCallbackPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col items-center">

				<div className={cn("inline-block")}>
					<div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
				</div>				<p className="mt-4 text-sm text-muted-foreground">Processing your login…</p>
				<Suspense fallback={null}>
					<AuthCallbackInner />
				</Suspense>
			</div>
		</div>
	);
}

