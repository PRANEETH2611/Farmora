import KitCard from "@/components/ui-custom/kit-card";
import { MOCK_KITS } from "@/mock/data";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KitsPage() {
  const [search, setSearch] = useState("");
  // In a real app, we'd have a price filter, etc.
  
  const filteredKits = MOCK_KITS.filter(k => 
    k.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 min-h-screen">
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">DIY Kits & Tools</h1>
            <p className="text-xl text-muted-foreground">Curated sustainable tools to help you get started.</p>
          </div>
          <Button variant="outline" className="h-14 px-8 rounded-2xl gap-2 font-medium">
            <SlidersHorizontal className="h-5 w-5" />
            Filter Products
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredKits.map(kit => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </div>
    </div>
  );
}
