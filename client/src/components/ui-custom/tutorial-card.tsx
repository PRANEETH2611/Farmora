import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, PlayCircle } from "lucide-react";
import { Tutorial } from "@/mock/data";
import { Link } from "wouter";

interface TutorialCardProps {
  tutorial: Tutorial;
}

export default function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Link href={`/tutorials/${tutorial.id}`}>
      <a className="block h-full">
        <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-none bg-card group cursor-pointer">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <img 
              src={tutorial.thumbnail} 
              alt={tutorial.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-white fill-white/20" />
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {tutorial.duration}
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs font-normal">
                {tutorial.category}
              </Badge>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {tutorial.difficulty}
              </span>
            </div>
            
            <h3 className="font-serif font-bold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {tutorial.title}
            </h3>
            
            <p className="text-sm text-muted-foreground">
              by <span className="font-medium text-foreground">{tutorial.creator}</span>
            </p>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {tutorial.views.toLocaleString()} views
            </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
