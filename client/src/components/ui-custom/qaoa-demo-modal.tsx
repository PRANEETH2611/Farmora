import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Cpu, Activity } from "lucide-react";
import { useState } from "react";
import { quantumQAOADemo, type QAOAResult } from "@/lib/api";

export default function QAOADemoModal() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<QAOAResult | null>(null);

  async function runSimulation() {
    setIsSimulating(true);
    setResult(null);
    try {
      const data = await quantumQAOADemo(8);
      setResult(data);
    } catch (err) {
      console.error("QAOA simulation failed:", err);
    } finally {
      setIsSimulating(false);
    }
  }

  const chartData = result?.probabilities.slice(0, 12).map(p => ({
    name: p.state,
    prob: p.probability,
  })) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/20 text-primary hover:bg-primary/5 rounded-full" data-testid="button-qaoa-demo">
          <Cpu className="w-4 h-4" />
          Run Quantum Demo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Activity className="w-6 h-6 text-primary" />
            QAOA Simulation
          </DialogTitle>
          <DialogDescription>
            Simulating Quantum Approximate Optimization Algorithm (QAOA) to find the optimal subset of recommendations by solving a QUBO formulation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 h-[300px] w-full flex flex-col items-center justify-center bg-muted/20 rounded-2xl border border-border/50">
          {!chartData.length && !isSimulating ? (
             <Button onClick={runSimulation} className="rounded-full px-8 bg-primary hover:bg-primary/90" data-testid="button-init-quantum">
               Initialize Quantum Circuit
             </Button>
          ) : isSimulating ? (
            <div className="flex flex-col items-center gap-4 text-primary">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="font-mono text-sm uppercase tracking-widest animate-pulse">Running on Simulator...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="prob" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(155, 100%, 23%)' : 'hsl(150, 15%, 85%)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {result && (
          <div className="space-y-3">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-sm text-foreground">
              <p><strong>Optimal State Found:</strong> <span className="font-mono text-primary">|{result.optimalState}⟩</span></p>
              <p className="text-muted-foreground mt-1">This bitstring maps to the optimal subset of items maximizing relevance while maintaining category diversity.</p>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground font-mono">
              <span>Execution: {result.executionTimeMs}ms</span>
              <span>Selected indices: [{result.selectedIndices.join(", ")}]</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
