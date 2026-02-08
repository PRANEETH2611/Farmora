import { useParams } from "wouter";
import { MOCK_TUTORIALS } from "@/mock/data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Globe, Bookmark, Share2, Play, CheckCircle, ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TutorialDetail() {
  const params = useParams();
  const tutorial = MOCK_TUTORIALS.find(t => t.id === params.id) || MOCK_TUTORIALS[0];

  return (
    <div className="container px-4 py-8 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content (Left 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Placeholder */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
             <img 
               src={tutorial.thumbnail} 
               alt={tutorial.title} 
               className="w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 flex items-center justify-center">
               <Button size="icon" className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/50">
                 <Play className="h-8 w-8 ml-1 fill-current" />
               </Button>
             </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">{tutorial.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{tutorial.creator}</span>
                  <span>•</span>
                  <span>{tutorial.views} views</span>
                  <span>•</span>
                  <span>{tutorial.duration}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" title="Save"><Bookmark className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" title="Share"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
               <Badge variant="secondary">{tutorial.category}</Badge>
               <Badge variant="outline">{tutorial.difficulty}</Badge>
            </div>
          </div>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto bg-muted/50 p-1">
              <TabsTrigger value="summary">AI Summary</TabsTrigger>
              <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="summary" className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
                      <span className="bg-primary/10 p-1 rounded text-primary text-xs">AI Generated</span>
                      Key Takeaways
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In this tutorial, {tutorial.creator} demonstrates the essential techniques for growing organic {tutorial.category.toLowerCase()}. 
                      Key points include soil preparation using compost, proper spacing for optimal growth, and natural pest control methods. 
                      The video emphasizes the importance of consistent watering and early intervention for common issues.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" /> Download PDF
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Globe className="h-4 w-4" /> Translate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="steps">
                <div className="space-y-4">
                   {[1, 2, 3, 4].map((step) => (
                     <div key={step} className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                       <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                         {step}
                       </div>
                       <div>
                         <h4 className="font-semibold mb-1">Step {step} Title</h4>
                         <p className="text-sm text-muted-foreground">Detailed description of this step extracted by AI from the video content.</p>
                       </div>
                     </div>
                   ))}
                </div>
              </TabsContent>

              <TabsContent value="transcript">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-muted/20">
                   <div className="space-y-4 text-sm text-muted-foreground">
                     <p><span className="text-foreground font-mono text-xs mr-2">[00:00]</span> Welcome back to the channel. Today we are talking about...</p>
                     <p><span className="text-foreground font-mono text-xs mr-2">[00:15]</span> First, let's look at the soil composition needed for...</p>
                     <p><span className="text-foreground font-mono text-xs mr-2">[01:20]</span> Make sure you have your compost ready. If not, check my other video...</p>
                     {/* Mock more text */}
                     <p><span className="text-foreground font-mono text-xs mr-2">[02:45]</span> Now, gently plant the seeds about 2 inches deep...</p>
                   </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="materials">
                 <Card>
                   <CardContent className="pt-6">
                     <ul className="space-y-2">
                       {["Organic Compost", "Seedling Tray", "Water Spray Bottle", "Neem Oil"].map((item, i) => (
                         <li key={i} className="flex items-center gap-2 text-sm">
                           <CheckCircle className="h-4 w-4 text-primary" />
                           {item}
                         </li>
                       ))}
                     </ul>
                   </CardContent>
                 </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="space-y-6">
          <Card className="bg-secondary/20 border-secondary">
            <CardContent className="pt-6 space-y-4">
              <h3 className="font-serif font-bold text-lg">Shop the Look</h3>
              <p className="text-sm text-muted-foreground">Get the materials used in this video.</p>
              <div className="space-y-3">
                 {/* Mock mini products */}
                 <div className="flex gap-3 items-center p-2 rounded-lg bg-background border">
                   <div className="h-12 w-12 bg-muted rounded shrink-0" />
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium truncate">Premium Compost</p>
                     <p className="text-xs text-muted-foreground">₹499</p>
                   </div>
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><ShoppingBag className="h-4 w-4" /></Button>
                 </div>
                 <div className="flex gap-3 items-center p-2 rounded-lg bg-background border">
                   <div className="h-12 w-12 bg-muted rounded shrink-0" />
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium truncate">Neem Oil Spray</p>
                     <p className="text-xs text-muted-foreground">₹350</p>
                   </div>
                   <Button size="sm" variant="ghost" className="h-8 w-8 p-0"><ShoppingBag className="h-4 w-4" /></Button>
                 </div>
              </div>
              <Button className="w-full" variant="outline">View All Kits</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
