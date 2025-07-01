'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";

export default function AuthCallbackPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const redirect = "valysis://auth/callback";

	useEffect(() => {
		if (!code) {
			// No code? Just deep link immediately
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
			} catch (err) {
				console.error("OAuth processing failed, retrying deep link...");
				setTimeout(() => {
					window.location.href = `${redirect}?status=error`;
				}, 5000);
			}
		};

		processOAuth();
	}, [code]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col items-center">
				<div className={cn("inline-block")}>
					<div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
				</div>
				<p className="mt-4 text-sm text-muted-foreground">Processing sign-in…</p>
			</div>
		</div>
	);
}
