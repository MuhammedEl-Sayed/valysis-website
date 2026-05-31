import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";


const supabase = createClient(
	process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ACC_KEY!
);



export async function GET(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	const { searchParams } = new URL(req.url);
  if (rateLimitResponse) return rateLimitResponse;
	const internalKey = req.headers.get("x-internal-token");
  const env = searchParams.get("env"); 
	if (internalKey !== process.env.INTERNAL_TOKEN) {
		return new Response(JSON.stringify({ error: "Forbidden" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}
  
  try{

    const storageClient = supabase.storage;
    const { data, error } = await storageClient.from('valysis-appcast').download(`./appcast-${env}.xml`);
    if (error){
 console.error("Error fetching appcast:", error);
		return new Response(JSON.stringify({ error: "Failed to fetch appcast" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
  
    }
  }
catch(err){
    console.error("Error fetching appcast:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch appcast" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
  }
}
