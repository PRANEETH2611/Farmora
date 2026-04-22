import { Link, useLocation } from "wouter";
import { Sprout, Video, ShoppingBag, Brain, Upload, User, Menu, CalendarDays, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui-custom/theme-toggle";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { href: "/", label: "Home", icon: Sprout },
    { href: "/tutorials", label: "Tutorials", icon: Video },
    { href: "/advisor", label: "AI Advisor", icon: Brain },
    { href: "/kits", label: "Shop Kits", icon: ShoppingBag },
    { href: "/farm-plan", label: "Farm Planner", icon: CalendarDays },
    { href: "/creator", label: "Creator", icon: User },
    { href: "/about", label: "About", icon: Sprout },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary hover:opacity-90 transition-opacity">
          <Sprout className="h-6 w-6" />
          <span>Farmora</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                location === item.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" className="rounded-full" onClick={logout}>
              {user?.name} (Logout)
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="rounded-full">Login</Button>
            </Link>
          )}
          <Link href="/cart">
            <Button variant="outline" size="sm" className="rounded-full">
              Cart ({itemCount})
            </Button>
          </Link>
          <ThemeToggle />
          <Link href="/upload">
            <Button variant="default" size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-white rounded-full">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {!isAuthenticated && (
            <Link href="/login">
              <Button variant="ghost" size="icon" aria-label="Login">
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          )}
          {isAuthenticated && (
            <Button variant="ghost" size="sm" className="rounded-full px-3" onClick={logout}>
              Logout
            </Button>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary" onClick={() => setIsOpen(false)}>
                <Sprout className="h-6 w-6" />
                <span>Farmora</span>
              </Link>
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
                      location === item.href ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <Link href="/cart" onClick={() => setIsOpen(false)} className="px-4">
                  <Button variant="outline" className="w-full rounded-full">
                    Cart ({itemCount})
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <div className="px-4">
                    <Button variant="ghost" className="w-full rounded-full" onClick={() => { logout(); setIsOpen(false); }}>
                      {user?.name} (Logout)
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="px-4">
                    <Button variant="ghost" className="w-full rounded-full">Login</Button>
                  </Link>
                )}
                <div className="flex items-center justify-between px-4">
                  <span className="text-sm text-muted-foreground">Dark mode</span>
                  <ThemeToggle />
                </div>
                <Link href="/upload">
                  <Button className="w-full gap-2 rounded-full" onClick={() => setIsOpen(false)}>
                    <Upload className="h-4 w-4" />
                    Upload Tutorial
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
