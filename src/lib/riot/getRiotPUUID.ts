// lib/riot/getRiotPUUID.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ACC_KEY!
);

export async function getRiotPUUID(
	normalizedGameName: string,
	normalizedTagLine: string,
	shard: string
) {
	console.log("Fetching PUUID for:", normalizedGameName, normalizedTagLine, shard);
	// Check if the user exists in the database
	const { data, error } = await supabase
		.from("User")
		.select("puuid")
		.eq("normalizedGameName", normalizedGameName)
		.eq("normalizedTagLine", normalizedTagLine)
		.eq("shard", shard)
		.single();

	if (error || !data) {
		throw new Error(`User not found for ${normalizedGameName}#${normalizedTagLine} in region ${shard}`);
	}

	return data.puuid;
}
