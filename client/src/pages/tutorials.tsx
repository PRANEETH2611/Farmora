import TutorialCard from "@/components/ui-custom/tutorial-card";
import { MOCK_TUTORIALS } from "@/mock/data";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TutorialsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "all", difficulty: "all" });

  const filteredTutorials = MOCK_TUTORIALS.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = filters.category === "all" || t.category === filters.category;
    const matchesDifficulty = filters.difficulty === "all" || t.difficulty === filters.difficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="container px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Tutorials</h1>
            <p className="text-xl text-muted-foreground">Expert guides structured by AI.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search tutorials..." 
              className="h-14 pl-12 rounded-2xl bg-white border-border shadow-sm focus-visible:ring-primary"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {["All", "Compost", "Bio-pesticide", "Fertilizer", "Planting", "Soil Health"].map((cat) => (
              <Button 
                key={cat}
                variant={filters.category === cat.toLowerCase() || (cat === "All" && filters.category === "all") ? "default" : "outline"}
                className="h-14 px-6 rounded-2xl font-medium border-border whitespace-nowrap"
                onClick={() => setFilters(prev => ({ ...prev, category: cat.toLowerCase() }))}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {filteredTutorials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTutorials.map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
            <h3 className="text-lg font-medium">No tutorials found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
