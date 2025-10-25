import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Request } from '@/types';
import { CATEGORIES } from '@/constants/data';

interface RequestCardProps {
  request: Request;
  onCardClick: (request: Request) => void;
}

export default function RequestCard({ request, onCardClick }: RequestCardProps) {
  const category = CATEGORIES.find(c => c.name === request.category);

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 group overflow-hidden"
      onClick={() => onCardClick(request)}
    >
      <div className="relative">
        {request.photos && request.photos.length > 0 && (
          <div className="aspect-video w-full overflow-hidden bg-muted md:block hidden">
            <img
              src={request.photos[0]}
              alt={request.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        {category && (
          <div className="absolute top-3 left-3">
            <Badge className={`${category.color} text-white border-0 shadow-lg`}>
              <Icon name={category.icon as any} className="h-3 w-3 mr-1" />
              {request.category}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex gap-2 md:block">
          {request.photos && request.photos.length > 0 && (
            <img
              src={request.photos[0]}
              alt={request.title}
              className="w-12 h-12 md:hidden object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm md:text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {request.title}
              </CardTitle>
            </div>
            <CardDescription className="line-clamp-2 text-xs md:text-sm">
              {request.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 md:space-y-3">
        <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
          <Icon name="MapPin" className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{request.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {request.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{request.author}</span>
              <div className="flex items-center gap-1">
                <Icon name="Star" className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{request.rating}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-bold text-primary text-lg">{request.budget}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="MessageSquare" className="h-3 w-3" />
              <span>{request.responses} откликов</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex gap-1 md:gap-2 pt-2">
          {request.delivery && (
            <Badge variant="secondary" className="gap-1 text-[10px] md:text-xs">
              <Icon name="Truck" className="h-2 w-2 md:h-3 md:w-3" />
              Доставка
            </Badge>
          )}
          {request.exchange && (
            <Badge variant="secondary" className="gap-1 text-[10px] md:text-xs">
              <Icon name="Repeat" className="h-2 w-2 md:h-3 md:w-3" />
              Обмен
            </Badge>
          )}
          {request.urgent && (
            <Badge variant="destructive" className="gap-1 text-[10px] md:text-xs">
              <Icon name="Zap" className="h-2 w-2 md:h-3 md:w-3" />
              Срочно
            </Badge>
          )}
        </div>

        <Button 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(request);
          }}
        >
          Откликнуться
        </Button>
      </CardContent>
    </Card>
  );
}