import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";
import { createClient } from "@supabase/supabase-js";
import { XMLParser } from 'fast-xml-parser';
export const runtime = "edge";

console.log()
const supabase = createClient(
	process.env.SUPABASE_URL!,
process.env.SUPABASE_SERVICE_ACC_KEY!
);



export async function GET(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	const { searchParams } = new URL(req.url);
  if (rateLimitResponse) return rateLimitResponse;
  const env = searchParams.get("env"); 

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

    const text = await data.text();
    return new Response(text, {headers: {"Content-Type": "text/xml"}}); 

  }
catch(err){
    console.error("Error fetching appcast:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch appcast" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
  }
}
