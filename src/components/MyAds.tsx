import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { Request, Offer } from '@/types';

interface MyAdsProps {
  userRequests: Request[];
  userOffers: Offer[];
  onPromote: (id: number, type: 'request' | 'offer') => void;
}

const PromotionDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  title: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="TrendingUp" className="text-yellow-500" size={24} />
            Продвижение объявления
          </DialogTitle>
          <DialogDescription>
            Продвигайте ваше объявление "{title}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-xl border-2 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Icon name="Zap" className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Премиум продвижение</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Ваше объявление будет:
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-yellow-600" />
                    Закреплено первым в категории
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-yellow-600" />
                    Выделено золотым цветом
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-yellow-600" />
                    Показывается независимо от фильтров
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-yellow-600" />
                    Увеличенное количество просмотров
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="text-sm text-gray-600">Срок продвижения</div>
              <div className="text-lg font-semibold text-gray-900">7 дней</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Стоимость</div>
              <div className="text-2xl font-bold text-yellow-600">299 ₽</div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onConfirm} className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white">
            <Icon name="CreditCard" size={18} className="mr-2" />
            Оплатить 299 ₽
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MyAds = ({ userRequests, userOffers, onPromote }: MyAdsProps) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'offers'>('requests');
  const [promotionDialog, setPromotionDialog] = useState<{ isOpen: boolean; id: number; type: 'request' | 'offer'; title: string } | null>(null);

  const handlePromoteClick = (id: number, type: 'request' | 'offer', title: string) => {
    setPromotionDialog({ isOpen: true, id, type, title });
  };

  const handleConfirmPromotion = () => {
    if (promotionDialog) {
      onPromote(promotionDialog.id, promotionDialog.type);
      setPromotionDialog(null);
    }
  };

  const ads = activeTab === 'requests' ? userRequests : userOffers;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'requests' ? 'default' : 'outline'}
          onClick={() => setActiveTab('requests')}
          className="flex-1"
        >
          <Icon name="Search" size={18} className="mr-2" />
          Мои запросы ({userRequests.length})
        </Button>
        <Button
          variant={activeTab === 'offers' ? 'default' : 'outline'}
          onClick={() => setActiveTab('offers')}
          className="flex-1"
        >
          <Icon name="ShoppingBag" size={18} className="mr-2" />
          Мои предложения ({userOffers.length})
        </Button>
      </div>

      {ads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Icon name="PackageOpen" size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              {activeTab === 'requests' ? 'У вас пока нет запросов' : 'У вас пока нет предложений'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {ads.map((ad) => {
            const isPromoted = ad.isPromoted;
            const title = 'title' in ad ? ad.title : '';
            const category = ad.category;
            const budget = 'budget' in ad ? ad.budget : 'price' in ad ? ad.price : '';
            const responses = 'responses' in ad ? ad.responses : 'views' in ad ? ad.views : 0;

            return (
              <Card 
                key={ad.id} 
                className={`${
                  isPromoted 
                    ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 shadow-lg shadow-yellow-200/50' 
                    : 'border-gray-200'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isPromoted && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0">
                            <Icon name="Crown" size={14} className="mr-1" />
                            Продвигается
                          </Badge>
                        )}
                        <Badge variant="secondary">{category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="font-semibold text-purple-600">{budget}</span>
                        <span className="flex items-center gap-1">
                          <Icon name={activeTab === 'requests' ? 'MessageSquare' : 'Eye'} size={16} />
                          {responses}
                        </span>
                      </div>
                    </div>
                    
                    {ad.photos && ad.photos.length > 0 && (
                      <img 
                        src={ad.photos[0]} 
                        alt={title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {isPromoted ? (
                      <Button variant="outline" className="flex-1" disabled>
                        <Icon name="Check" size={18} className="mr-2" />
                        Активно до {ad.promotedUntil}
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handlePromoteClick(ad.id, activeTab, title)}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                      >
                        <Icon name="TrendingUp" size={18} className="mr-2" />
                        Продвинуть
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <Icon name="Edit" size={18} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Trash2" size={18} className="text-red-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {promotionDialog && (
        <PromotionDialog
          isOpen={promotionDialog.isOpen}
          onClose={() => setPromotionDialog(null)}
          onConfirm={handleConfirmPromotion}
          title={promotionDialog.title}
        />
      )}
    </div>
  );
};

export default MyAds;
