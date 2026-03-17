import KitCard from "@/components/ui-custom/kit-card";
import { useState } from "react";
import { SlidersHorizontal, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuantumToggle from "@/components/ui-custom/quantum-toggle";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { kitsQuery, quantumRecommend, type Kit } from "@/lib/api";

export default function KitsPage() {
  const [search, setSearch] = useState("");
  const [quantumMode, setQuantumMode] = useState(false);
  const [quantumKits, setQuantumKits] = useState<Kit[]>([]);

  const { data: allKits = [], isLoading } = useQuery(kitsQuery(search));

  const displayKits = quantumMode && quantumKits.length > 0
    ? quantumKits
    : allKits;

  async function handleQuantumToggle(enabled: boolean) {
    setQuantumMode(enabled);
    if (enabled) {
      try {
        const result = await quantumRecommend("kits", search ? [search] : [], 10);
        setQuantumKits(result.selected as Kit[]);
      } catch (err) {
        console.error("Quantum recommendation failed:", err);
      }
    } else {
      setQuantumKits([]);
    }
  }

  return (
    <div className="container px-4 py-8 min-h-screen relative">
      {quantumMode && (
        <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      )}
      <div className="space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">DIY Kits & Tools</h1>
            <p className="text-xl text-muted-foreground">Curated sustainable tools to help you get started.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow-sm border border-border/50">
             <QuantumToggle enabled={quantumMode} onToggle={handleQuantumToggle} />
          </div>
        </div>

        {quantumMode && (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-4 max-w-4xl"
           >
             <Share2 className="w-5 h-5 text-primary mt-1" />
             <div>
               <p className="font-bold text-sm text-primary">Quantum Recommendations Active</p>
               <p className="text-sm text-muted-foreground">Kits selected via QUBO simulated annealing, optimizing for relevance and community success scores.</p>
             </div>
           </motion.div>
        )}

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1,2,3,4].map(i => <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {displayKits.map((kit, idx) => (
              <motion.div
                 key={kit.id}
                 layout
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <KitCard kit={kit} quantumSelected={quantumMode && idx < 2} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
