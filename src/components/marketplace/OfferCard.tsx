import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Offer } from '@/types';
import { CATEGORIES } from '@/constants/data';

interface OfferCardProps {
  offer: Offer;
  onCardClick: (offer: Offer) => void;
}

export default function OfferCard({ offer, onCardClick }: OfferCardProps) {
  const category = CATEGORIES.find(c => c.name === offer.category);

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 group overflow-hidden"
      onClick={() => onCardClick(offer)}
    >
      <div className="relative">
        {offer.photos && offer.photos.length > 0 && (
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src={offer.photos[0]}
              alt={offer.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        {category && (
          <div className="absolute top-3 left-3">
            <Badge className={`${category.color} text-white border-0 shadow-lg`}>
              <Icon name={category.icon as any} className="h-3 w-3 mr-1" />
              {offer.category}
            </Badge>
          </div>
        )}
        {offer.condition && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {offer.condition}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {offer.title}
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-2">
          {offer.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="MapPin" className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{offer.city}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {offer.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{offer.author}</span>
              <div className="flex items-center gap-1">
                <Icon name="Star" className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{offer.rating}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="font-bold text-primary text-lg">{offer.price}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Eye" className="h-3 w-3" />
              <span>{offer.views} просмотров</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2 flex-wrap">
          {offer.delivery && (
            <Badge variant="secondary" className="gap-1">
              <Icon name="Truck" className="h-3 w-3" />
              Доставка
            </Badge>
          )}
          {offer.exchange && (
            <Badge variant="secondary" className="gap-1">
              <Icon name="Repeat" className="h-3 w-3" />
              Обмен
            </Badge>
          )}
          {offer.warranty && (
            <Badge variant="secondary" className="gap-1">
              <Icon name="ShieldCheck" className="h-3 w-3" />
              Гарантия
            </Badge>
          )}
        </div>

        <Button 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(offer);
          }}
        >
          Связаться
        </Button>
      </CardContent>
    </Card>
  );
}
