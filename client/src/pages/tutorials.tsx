import FilterBar from "@/components/ui-custom/filter-bar";
import TutorialCard from "@/components/ui-custom/tutorial-card";
import { MOCK_TUTORIALS } from "@/mock/data";
import { useState } from "react";

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
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Tutorial Library</h1>
          <p className="text-muted-foreground">Explore practical guides for organic farming.</p>
        </div>

        <FilterBar 
          onSearch={setSearch} 
          onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))} 
        />

        {filteredTutorials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
