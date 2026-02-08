import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, TrendingUp } from "lucide-react";
import { Kit } from "@/mock/data";
import { formatRupee } from "@/lib/utils";

interface KitCardProps {
  kit: Kit;
}

export default function KitCard({ kit }: KitCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-card">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={kit.image} 
          alt={kit.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {kit.commission && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground border-none">
            <TrendingUp className="w-3 h-3 mr-1" />
            Commission
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-foreground">{kit.rating}</span>
            <span className="text-xs text-muted-foreground">({kit.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-serif font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {kit.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {kit.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">
          {formatRupee(kit.price)}
        </span>
        
        <Button size="sm" className="rounded-full gap-2">
          <ShoppingCart className="w-4 h-4" />
          View Kit
        </Button>
      </CardFooter>
    </Card>
  );
}
