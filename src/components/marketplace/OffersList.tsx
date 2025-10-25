import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Offer } from '@/types';
import { CATEGORIES } from '@/constants/data';
import OfferCard from './OfferCard';

interface OffersListProps {
  offers: Offer[];
}

export default function OffersList({ offers }: OffersListProps) {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handleCardClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setCurrentPhotoIndex(0);
  };

  const handleCloseDialog = () => {
    setSelectedOffer(null);
    setCurrentPhotoIndex(0);
  };

  const handlePrevPhoto = () => {
    if (selectedOffer?.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedOffer.photos!.length - 1 : prev - 1
      );
    }
  };

  const handleNextPhoto = () => {
    if (selectedOffer?.photos) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedOffer.photos!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const category = selectedOffer ? CATEGORIES.find(c => c.name === selectedOffer.category) : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard 
            key={offer.id} 
            offer={offer} 
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Icon name="Package" className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Предложений не найдено</h3>
          <p className="text-muted-foreground">
            Попробуйте изменить параметры поиска или создайте новое предложение
          </p>
        </div>
      )}

      <Dialog open={!!selectedOffer} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedOffer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedOffer.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {selectedOffer.photos && selectedOffer.photos.length > 0 && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={selectedOffer.photos[currentPhotoIndex]}
                      alt={`${selectedOffer.title} - фото ${currentPhotoIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedOffer.photos.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full"
                          onClick={handlePrevPhoto}
                        >
                          <Icon name="ChevronLeft" className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
                          onClick={handleNextPhoto}
                        >
                          <Icon name="ChevronRight" className="h-4 w-4" />
                        </Button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                          {currentPhotoIndex + 1} / {selectedOffer.photos.length}
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  {category && (
                    <Badge className={`${category.color} text-white border-0`}>
                      <Icon name={category.icon as any} className="h-3 w-3 mr-1" />
                      {selectedOffer.category}
                    </Badge>
                  )}
                  {selectedOffer.condition && (
                    <Badge variant="secondary">{selectedOffer.condition}</Badge>
                  )}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="MapPin" className="h-4 w-4" />
                    {selectedOffer.city}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Описание</h3>
                  <p className="text-muted-foreground">{selectedOffer.description}</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Цена</div>
                    <div className="text-2xl font-bold text-primary">{selectedOffer.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">Просмотров</div>
                    <div className="flex items-center gap-2">
                      <Icon name="Eye" className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xl font-semibold">{selectedOffer.views}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedOffer.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{selectedOffer.author}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Icon name="Star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedOffer.rating}</span>
                      <span className="mx-1">•</span>
                      <span>Рейтинг продавца</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {selectedOffer.delivery && (
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="Truck" className="h-3 w-3" />
                      Доставка возможна
                    </Badge>
                  )}
                  {selectedOffer.exchange && (
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="Repeat" className="h-3 w-3" />
                      Возможен обмен
                    </Badge>
                  )}
                  {selectedOffer.warranty && (
                    <Badge variant="secondary" className="gap-1">
                      <Icon name="ShieldCheck" className="h-3 w-3" />
                      Гарантия
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 gap-2" size="lg">
                    <Icon name="MessageCircle" className="h-4 w-4" />
                    Связаться
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Share2" className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Icon name="Heart" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
