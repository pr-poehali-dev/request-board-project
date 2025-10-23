import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Request, UserProfile } from '@/types';

interface RequestsListProps {
  requests: Request[];
  favorites: string[];
  isAuthenticated: boolean;
  mockUserProfiles: Record<string, UserProfile>;
  onToggleFavorite: (itemKey: string) => void;
  onViewItem: (item: Request) => void;
  onResponse: (item: Request) => void;
  onViewUserProfile: (profile: UserProfile) => void;
  onLogin: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

export default function RequestsList({
  requests,
  favorites,
  isAuthenticated,
  mockUserProfiles,
  onToggleFavorite,
  onViewItem,
  onResponse,
  onViewUserProfile,
  onLogin,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}: RequestsListProps) {
  return (
    <div 
      className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        {requests.map((request) => (
          <Card 
            key={request.id} 
            className="border border-purple-100 bg-white rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-purple-200 transition-all duration-300 cursor-pointer"
          >
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {request.photos && request.photos.length > 0 && (
                  <img 
                    src={request.photos[0]} 
                    alt={request.title}
                    className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
                  />
                )}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap flex-1 min-w-0">
                      <Badge className={`${
                        request.category === 'Электроника' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                        request.category === 'Одежда' ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                        request.category === 'Услуги' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                        request.category === 'Недвижимость' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                        request.category === 'Транспорт' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' :
                        'bg-gradient-to-r from-blue-500 to-purple-500'
                      } text-white border-0 text-xs whitespace-nowrap shadow-md`}>
                        {request.category}
                      </Badge>
                      {request.delivery && (
                        <Badge variant="outline" className="text-xs whitespace-nowrap border-emerald-400 text-emerald-700 bg-emerald-50">
                          <Icon name="Truck" size={12} className="mr-1" />
                          Доставка
                        </Badge>
                      )}
                      {request.exchange && (
                        <Badge variant="outline" className="text-xs whitespace-nowrap border-blue-400 text-blue-700 bg-blue-50">
                          <Icon name="Repeat" size={12} className="mr-1" />
                          Обмен
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardTitle className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">{request.title}</CardTitle>
                  
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{request.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={14} className="text-gray-400" />
                      <span>{request.city}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-primary">
                      <Icon name="Wallet" size={14} />
                      <span>{request.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      if (mockUserProfiles[request.author]) {
                        onViewUserProfile(mockUserProfiles[request.author]);
                      }
                    }}
                  >
                    <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 ring-2 ring-violet-200">
                      <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                        {request.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-xs sm:text-sm hover:underline">{request.author}</p>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm text-gray-600">{request.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Icon name="MessageCircle" size={16} />
                      <span className="text-sm font-medium">{request.responses}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Icon name="Eye" size={16} />
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => {
                        if (!isAuthenticated) {
                          onLogin();
                        } else {
                          const itemKey = `request-${request.id}`;
                          onToggleFavorite(itemKey);
                        }
                      }}
                      variant="outline" 
                      size="sm"
                      className={`flex-1 sm:flex-none font-semibold rounded-xl transition-all duration-300 ${favorites.includes(`request-${request.id}`) ? 'text-rose-600 border-rose-400 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 shadow-md hover:shadow-lg' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'}`}
                    >
                      <Icon name="Heart" size={14} className={`sm:mr-1.5 transition-all duration-300 ${favorites.includes(`request-${request.id}`) ? 'fill-rose-500 text-rose-600' : ''}`} />
                      <span className="hidden sm:inline">{favorites.includes(`request-${request.id}`) ? 'В избранном' : 'В избранное'}</span>
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewItem(request);
                      }}
                      variant="outline" 
                      size="sm"
                      className="flex-1 sm:flex-none font-semibold rounded-xl border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                    >
                      <Icon name="Eye" size={14} className="sm:mr-1.5" />
                      <span className="hidden sm:inline">Смотреть</span>
                    </Button>
                  </div>
                  <Button 
                    onClick={() => {
                      if (!isAuthenticated) {
                        onLogin();
                      } else {
                        onResponse(request);
                      }
                    }}
                    size="sm"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                  >
                    Откликнуться
                    <Icon name="Send" size={14} className="ml-1.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
