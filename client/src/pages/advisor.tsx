import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles, Sprout, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  links?: { title: string; href: string }[];
}

export default function AdvisorPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm your Farmora AI advisor. Ask me anything about soil health, pest control, or crop planning." 
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        role: "assistant",
        content: "Based on organic farming principles, for that issue I recommend using a neem oil solution. Mix 5ml of neem oil with 1 liter of water and a drop of soap. Apply every 7 days.",
        links: [
          { title: "Neem Oil Mastery Tutorial", href: "/tutorials/3" },
          { title: "Buy Cold Pressed Neem Oil", href: "/kits/3" }
        ]
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="container max-w-5xl px-4 py-8 h-[calc(100vh-4rem)] flex gap-6">
      {/* Sidebar Suggestions */}
      <div className="hidden md:flex flex-col w-64 space-y-4">
        <h3 className="font-serif font-bold text-lg px-2">Quick Prompts</h3>
        <div className="space-y-2">
          {[
            "Best compost for tomatoes?",
            "How to fix yellow leaves?",
            "Companion planting guide",
            "Soil pH adjustment"
          ].map((prompt, i) => (
            <Button 
              key={i} 
              variant="ghost" 
              className="w-full justify-start text-sm h-auto py-3 whitespace-normal text-left border border-transparent hover:border-border hover:bg-card"
              onClick={() => setInput(prompt)}
            >
              <Leaf className="w-4 h-4 mr-2 text-primary shrink-0" />
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden border-border/50 shadow-lg bg-background/50 backdrop-blur-sm">
        <div className="bg-primary/5 p-4 border-b flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-medium">Farmora AI Advisor</span>
          <span className="text-xs text-muted-foreground ml-auto bg-background/50 px-2 py-1 rounded">Quantum-Optimized</span>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3 max-w-[85%]", m.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                <Avatar className={cn("h-8 w-8", m.role === "assistant" ? "bg-primary" : "bg-muted")}>
                  {m.role === "assistant" ? (
                    <div className="flex items-center justify-center w-full h-full text-white"><Sprout className="w-5 h-5" /></div>
                  ) : (
                    <AvatarFallback>U</AvatarFallback>
                  )}
                </Avatar>
                <div className={cn(
                  "rounded-2xl p-4 text-sm",
                  m.role === "user" 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-card border shadow-sm rounded-tl-sm"
                )}>
                  <p className="leading-relaxed">{m.content}</p>
                  
                  {/* Recommendations */}
                  {m.links && (
                    <div className="mt-4 space-y-2 pt-3 border-t border-border/10">
                      <p className="text-xs font-semibold opacity-70">Recommended Resources:</p>
                      <div className="flex flex-wrap gap-2">
                        {m.links.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.href}
                            className="text-xs bg-background/50 hover:bg-background/80 px-3 py-2 rounded border border-border/20 transition-colors inline-block"
                          >
                            {link.title} →
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 bg-background border-t">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about your plants..." 
              className="flex-1 bg-muted/20"
            />
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
