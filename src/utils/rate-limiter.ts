// utils/rateLimiter.ts
import { LRUCache } from "lru-cache";

const rateLimiter = new LRUCache<string, number[]>({
	max: 5000,
	ttl: 1000 * 60 * 5, // Keep entries for 5 minutes
});

export function isRateLimited(
	id: string,
	maxRequests: number,
	perMs: number
): boolean {
	const now = Date.now();
	const timestamps = rateLimiter.get(id) || [];

	const filtered = timestamps.filter((time) => now - time < perMs);
	filtered.push(now);

	rateLimiter.set(id, filtered);

	return filtered.length > maxRequests;
}

export async function checkRateLimits(ip: string) {
	// Riot short-term global limit: 500 requests / 10s
	if (isRateLimited("global:short", 500, 10_000)) {
		return new Response("Rate limit (10s window) exceeded", { status: 429 });
	}

	// Riot long-term global limit: 30,000 requests / 10min
	if (isRateLimited("global:long", 30_000, 600_000)) {
		return new Response("Rate limit (10min window) exceeded", { status: 429 });
	}

	// Optional: Limit individual clients (IP-based here)
	if (isRateLimited(`ip:${ip}`, 60, 600_000)) {
		return new Response("Too many requests from your IP", { status: 429 });
	}

	return null; // All good
}
