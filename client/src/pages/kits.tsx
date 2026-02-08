import FilterBar from "@/components/ui-custom/filter-bar";
import KitCard from "@/components/ui-custom/kit-card";
import { MOCK_KITS } from "@/mock/data";
import { useState } from "react";

export default function KitsPage() {
  const [search, setSearch] = useState("");
  // In a real app, we'd have a price filter, etc.
  
  const filteredKits = MOCK_KITS.filter(k => 
    k.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 min-h-screen">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">DIY Marketplace</h1>
            <p className="text-muted-foreground">Curated kits and tools for your organic garden.</p>
          </div>
        </div>

        <FilterBar 
          onSearch={setSearch} 
          onFilterChange={() => {}} // Simple mock for now
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredKits.map(kit => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </div>
    </div>
  );
}
