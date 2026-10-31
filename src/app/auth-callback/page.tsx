"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/utils";

// 👇 This disables prerender/SSG and ensures client-side rendering
export const dynamic = "force-dynamic";

interface OAuthState {
	/** 'delete' for the web data deletion flow, unset for app sign-in. */
	action?: string;
	nonce?: string;
	shard?: string;
	riotNameAndTag?: string;
}

function decodeState(state: string | null): OAuthState | undefined {


if (state) {
  try {
    const decoded = JSON.parse(
      atob(state.replace(/-/g, '+').replace(/_/g, '/'))
    );
   return {
   	action: decoded.action,
   	nonce: decoded.nonce,
   	shard: decoded.shard,
	riotNameAndTag: decoded.gameNameAndTag,
   }
  } catch (e) {
    console.error("Failed to decode OAuth state", e);
  }
}
}

function Spinner({ label }: { label: string }) {
	return (
		<>
			<div className={cn("inline-block")}>
				<div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
			</div>
			<p className="mt-4 text-sm text-muted-foreground">{label}</p>
		</>
	);
}

/** App sign-in: finish it, then hand back to the app. */
function AppSignIn({ code, state }: { code: string | null; state?: OAuthState }) {
	const shard = state?.shard ?? '';
	const riotNameAndTag = state?.riotNameAndTag ?? '';
	const redirect = "valysis://auth/callback";

	useEffect(() => {
		if (!code) {
			window.location.href = `${redirect}?status=error`;
			return;
		}

		const processOAuth = async () => {
			try {
				const res = await fetch(`/api/auth/callback?code=${code}&shard=${shard || ""}&riotNameAndTag=${riotNameAndTag || ""}`);
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

	return <Spinner label="Processing your login…" />;
}

type DeleteResult =
	| { status: "pending" }
	| { status: "success"; deleted: boolean; riotId: string }
	| { status: "error" };

/** Web data deletion: delete the account Riot just signed in. */
function WebDeletion({ code, state }: { code: string | null; state?: OAuthState }) {
	const [result, setResult] = useState<DeleteResult>({ status: "pending" });
	// The code only works once, so never send it twice.
	const sent = useRef(false);

	useEffect(() => {
		if (sent.current) return;
		sent.current = true;
		if (!code || !state?.nonce) {
			setResult({ status: "error" });
			return;
		}
		fetch("/api/auth/delete-account", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ code, nonce: state.nonce }),
		})
			.then((res) => res.json())
			.then((data) =>
				setResult(
					data.status === "success"
						? { status: "success", deleted: data.deleted, riotId: data.riotId }
						: { status: "error" }
				)
			)
			.catch(() => setResult({ status: "error" }));
	}, [code, state?.nonce]);

	if (result.status === "pending") return <Spinner label="Deleting your data…" />;

	return (
		<div className="max-w-md text-center px-8">
			<h1 className="text-2xl font-heading font-bold">
				{result.status === "success" ? "Done" : "Something went wrong"}
			</h1>
			<p className="mt-4 text-muted-foreground">
				{result.status === "error"
					? "We couldn't delete your data. Your sign-in may have expired, so try again from the start."
					: result.deleted
						? `We've deleted the Valysis account for ${result.riotId}. To clear match history on your phone too, remove account data in the app or uninstall it.`
						: `There's no Valysis account for ${result.riotId}, so there's nothing on our servers to delete.`}
			</p>
			<a href="/delete-account" className="inline-block mt-6 text-sm underline">
				Back to Delete your data
			</a>
		</div>
	);
}

function AuthCallbackInner() {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");
	const state = decodeState(searchParams.get("state"));

	return state?.action === "delete" ? (
		<WebDeletion code={code} state={state} />
	) : (
		<AppSignIn code={code} state={state} />
	);
}

export default function AuthCallbackPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col items-center">
				<Suspense fallback={<Spinner label="Loading…" />}>
					<AuthCallbackInner />
				</Suspense>
			</div>
		</div>
	);
}
