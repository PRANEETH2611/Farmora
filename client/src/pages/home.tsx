import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sprout, ShoppingBag, Users, Brain } from "lucide-react";
import { Link } from "wouter";
import TutorialCard from "@/components/ui-custom/tutorial-card";
import KitCard from "@/components/ui-custom/kit-card";
import { MOCK_TUTORIALS, MOCK_KITS } from "@/mock/data";

export default function Home() {
  const featuredTutorials = MOCK_TUTORIALS.slice(0, 3);
  const featuredKits = MOCK_KITS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/farmora-hero.png" 
            alt="Organic Farming" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white space-y-6 animate-in fade-in zoom-in duration-1000">
          <Badge className="bg-primary/80 hover:bg-primary text-white border-none px-4 py-1.5 text-sm backdrop-blur-md">
            Revolutionizing Organic Agriculture
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-tight">
            Organic made <span className="text-green-400">practical</span>.
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Master organic farming with AI-powered tutorials, expert community, and curated DIY tools. From soil to solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/tutorials">
              <Button size="lg" className="text-base h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-white border-none shadow-lg shadow-primary/20">
                Explore Tutorials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/advisor">
              <Button size="lg" variant="outline" className="text-base h-12 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md">
                Ask Farmora AI
                <Brain className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">How Farmora Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine traditional wisdom with cutting-edge AI to make organic farming accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: PlayCircle, title: "Watch", desc: "User-generated organic farming tutorials" },
              { icon: Brain, title: "Learn", desc: "AI transcribes, summarizes & extracts steps" },
              { icon: Sprout, title: "Apply", desc: "Follow step-by-step guides in your garden" },
              { icon: ShoppingBag, title: "Equip", desc: "Get the exact DIY kits used in videos" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all group">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-serif font-bold">Trending Tutorials</h2>
              <p className="text-muted-foreground">Learn from the community's best growers</p>
            </div>
            <Link href="/tutorials">
              <Button variant="ghost" className="hidden md:flex">View All <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutorials.map(tutorial => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/tutorials">
              <Button variant="outline" className="w-full">View All Tutorials</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* DIY Kits */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
             <div className="space-y-1">
              <h2 className="text-3xl font-serif font-bold">Essential DIY Kits</h2>
              <p className="text-muted-foreground">Start your journey with the right tools</p>
            </div>
             <Link href="/kits">
              <Button variant="ghost" className="hidden md:flex">Visit Shop <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredKits.map(kit => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pattern-dots" /> {/* Add a pattern here if possible */}
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to grow your own food?</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of urban farmers transforming their spaces into green sanctuaries.
          </p>
          <Link href="/tutorials">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all">
              Start Learning Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
