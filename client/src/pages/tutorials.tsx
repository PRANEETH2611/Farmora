import TutorialCard from "@/components/ui-custom/tutorial-card";
import { useState } from "react";
import { Search, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuantumToggle from "@/components/ui-custom/quantum-toggle";
import QAOADemoModal from "@/components/ui-custom/qaoa-demo-modal";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { tutorialsQuery, quantumRecommend, type Tutorial } from "@/lib/api";

export default function TutorialsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [quantumMode, setQuantumMode] = useState(false);
  const [quantumResults, setQuantumResults] = useState<Tutorial[]>([]);

  const { data: tutorials = [], isLoading } = useQuery(tutorialsQuery(category, search));

  const displayTutorials = quantumMode && quantumResults.length > 0
    ? quantumResults
    : tutorials;

  async function handleQuantumToggle(enabled: boolean) {
    setQuantumMode(enabled);
    if (enabled) {
      try {
        const result = await quantumRecommend("tutorials", search ? [search] : [], 10);
        setQuantumResults(result.selected as Tutorial[]);
      } catch (err) {
        console.error("Quantum recommendation failed:", err);
      }
    } else {
      setQuantumResults([]);
    }
  }

  return (
    <div className="container px-4 py-8 min-h-screen relative">
      {quantumMode && (
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      )}
      
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Tutorials</h1>
            <p className="text-xl text-muted-foreground">Expert guides structured by AI.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow-sm border border-border/50">
             <QAOADemoModal />
             <QuantumToggle enabled={quantumMode} onToggle={handleQuantumToggle} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search tutorials..." 
              className="h-14 pl-12 rounded-2xl bg-white border-border shadow-sm focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-tutorials"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {["All", "Compost", "Bio-pesticide", "Fertilizer", "Planting", "Soil Health"].map((cat) => (
              <Button 
                key={cat}
                variant={category === cat.toLowerCase() || (cat === "All" && category === "all") ? "default" : "outline"}
                className="h-14 px-6 rounded-2xl font-medium border-border whitespace-nowrap"
                onClick={() => setCategory(cat.toLowerCase())}
                data-testid={`button-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {quantumMode && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-4"
           >
             <Share2 className="w-5 h-5 text-primary mt-1" />
             <div>
               <p className="font-bold text-sm text-primary">Quantum Optimization Active</p>
               <p className="text-sm text-muted-foreground">Results optimized using simulated quantum annealing (QUBO), maximizing relevance and category diversity.</p>
             </div>
           </motion.div>
        )}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-video bg-muted animate-pulse rounded-2xl" />)}
          </div>
        ) : displayTutorials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayTutorials.map((tutorial, idx) => (
              <motion.div
                key={tutorial.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <TutorialCard tutorial={tutorial} quantumSelected={quantumMode && idx < 2} />
              </motion.div>
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
