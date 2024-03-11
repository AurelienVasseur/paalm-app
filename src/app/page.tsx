import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase
    .from("assets")
    .select("*")
    .order("created_at", { ascending: false });
  
  return (
    <>
      <Hero />
    </>
    // <div>
    //   <Button>Click Me</Button>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
  );
}
