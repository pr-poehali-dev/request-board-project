import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Request {
  id: number;
  title: string;
  category: string;
  budget: string;
  author: string;
  rating: number;
  responses: number;
  description: string;
  city: string;
  delivery: boolean;
  exchange?: boolean;
}

interface Offer {
  id: number;
  title: string;
  category: string;
  price: string;
  author: string;
  rating: number;
  views: number;
  description: string;
  city: string;
  delivery: boolean;
  exchange?: boolean;
}

const categories = [
  { name: 'Электроника', icon: 'Smartphone', color: 'bg-gradient-instagram' },
  { name: 'Одежда', icon: 'ShoppingBag', color: 'bg-gradient-purple-pink' },
  { name: 'Услуги', icon: 'Wrench', color: 'bg-gradient-orange-pink' },
  { name: 'Недвижимость', icon: 'Home', color: 'bg-gradient-blue-purple' },
  { name: 'Транспорт', icon: 'Car', color: 'bg-gradient-instagram' },
];

const mockRequests: Request[] = [
  {
    id: 1,
    title: 'Ищу iPhone 15 Pro',
    category: 'Электроника',
    budget: 'до 120 000 ₽',
    author: 'Александр',
    rating: 4.8,
    responses: 12,
    description: 'Нужен iPhone 15 Pro в хорошем состоянии, желательно с гарантией',
    city: 'Москва',
    delivery: true,
    exchange: true
  },
  {
    id: 2,
    title: 'Требуется мастер по ремонту',
    category: 'Услуги',
    budget: 'договорная',
    author: 'Мария',
    rating: 4.9,
    responses: 8,
    description: 'Ремонт квартиры, необходим опытный специалист',
    city: 'Санкт-Петербург',
    delivery: false
  },
  {
    id: 3,
    title: 'Куплю MacBook Air M2',
    category: 'Электроника',
    budget: 'до 90 000 ₽',
    author: 'Дмитрий',
    rating: 4.7,
    responses: 15,
    description: 'Интересует MacBook Air на M2, новый или б/у в отличном состоянии',
    city: 'Казань',
    delivery: true
  },
  {
    id: 4,
    title: 'Ищу репетитора английского',
    category: 'Услуги',
    budget: '1500 ₽/час',
    author: 'Елена',
    rating: 5.0,
    responses: 23,
    description: 'Нужен репетитор для подготовки к IELTS, уровень Intermediate',
    city: 'Москва',
    delivery: false,
    exchange: false
  }
];

const mockOffers: Offer[] = [
  {
    id: 1,
    title: 'Продаю iPhone 14 Pro Max',
    category: 'Электроника',
    price: '85 000 ₽',
    author: 'Сергей',
    rating: 4.9,
    views: 145,
    description: 'iPhone 14 Pro Max 256GB, черный, отличное состояние, все документы',
    city: 'Москва',
    delivery: true,
    exchange: true
  },
  {
    id: 2,
    title: 'Услуги дизайнера интерьера',
    category: 'Услуги',
    price: 'от 3000 ₽',
    author: 'Анна',
    rating: 5.0,
    views: 89,
    description: 'Профессиональный дизайн интерьера квартир и домов, 3D визуализация',
    city: 'Санкт-Петербург',
    delivery: false,
    exchange: false
  },
  {
    id: 3,
    title: 'MacBook Pro 16" M1 Pro',
    category: 'Электроника',
    price: '150 000 ₽',
    author: 'Игорь',
    rating: 4.8,
    views: 234,
    description: 'MacBook Pro 16" M1 Pro, 32GB RAM, 1TB SSD, состояние идеальное',
    city: 'Москва',
    delivery: true,
    exchange: true
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRequests = selectedCategory 
    ? mockRequests.filter(req => req.category === selectedCategory)
    : mockRequests;

  const filteredOffers = selectedCategory 
    ? mockOffers.filter(offer => offer.category === selectedCategory)
    : mockOffers;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-instagram flex items-center justify-center">
                <Icon name="MessageSquare" className="text-white" size={20} />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-gray-800">Доска запросов</span>
            </div>

            <div className="hidden md:flex space-x-1">
              <Button 
                variant={activeTab === 'requests' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('requests')}
                className="font-medium"
              >
                <Icon name="Search" size={18} className="mr-2" />
                Запросы
              </Button>
              <Button 
                variant={activeTab === 'offers' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('offers')}
                className="font-medium"
              >
                <Icon name="Package" size={18} className="mr-2" />
                Предложения
              </Button>
              <Button 
                variant={activeTab === 'categories' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('categories')}
                className="font-medium"
              >
                <Icon name="FolderOpen" size={18} className="mr-2" />
                Категории
              </Button>
              <Button 
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className="font-medium"
              >
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="Bell" size={22} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-instagram rounded-full text-white text-xs flex items-center justify-center font-semibold">3</span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="MessageCircle" size={22} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-instagram rounded-full"></span>
              </button>
            </div>

            <Button className="bg-gradient-instagram text-white hover:opacity-90 font-semibold shadow-lg text-sm sm:text-base px-3 sm:px-4 hidden md:flex">
              <Icon name="Plus" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Создать</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button 
            onClick={() => setActiveTab('requests')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeTab === 'requests' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            <Icon name="Search" size={20} />
            <span className="text-xs mt-1">Запросы</span>
          </button>
          <button 
            onClick={() => setActiveTab('offers')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeTab === 'offers' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            <Icon name="Package" size={20} />
            <span className="text-xs mt-1">Предложения</span>
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeTab === 'categories' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            <Icon name="FolderOpen" size={20} />
            <span className="text-xs mt-1">Категории</span>
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            <Icon name="User" size={20} />
            <span className="text-xs mt-1">Профиль</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-8">
        {activeTab === 'requests' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="text-center mb-4 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-3">
                Найди то, что ищешь
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Создай запрос и получи предложения от продавцов
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap font-medium text-sm"
              >
                Все
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  className="whitespace-nowrap font-medium text-sm"
                >
                  <Icon name={category.icon as any} size={14} className="mr-1.5" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid gap-3 sm:gap-4">
              {filteredRequests.map((request, index) => (
                <Card 
                  key={request.id} 
                  className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                          <Badge className="bg-gradient-instagram text-white border-0 text-xs">
                            {request.category}
                          </Badge>
                          <Badge variant="secondary" className="font-medium text-xs">
                            <Icon name="MapPin" size={10} className="mr-1" />
                            {request.city}
                          </Badge>
                          {request.delivery && (
                            <Badge variant="outline" className="font-medium text-green-600 border-green-300 bg-green-50 text-xs">
                              <Icon name="Truck" size={10} className="mr-1" />
                              Доставка
                            </Badge>
                          )}
                          {request.exchange && (
                            <Badge variant="outline" className="font-medium text-blue-600 border-blue-300 bg-blue-50 text-xs">
                              <Icon name="ArrowLeftRight" size={10} className="mr-1" />
                              Обмен
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg sm:text-2xl mb-1.5 sm:mb-2">{request.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          {request.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-extrabold bg-gradient-purple-pink bg-clip-text text-transparent whitespace-nowrap">
                          {request.budget}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-purple-pink">
                            <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                              {request.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-xs sm:text-sm">{request.author}</p>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-xs sm:text-sm text-gray-600">{request.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <Icon name="MessageCircle" size={22} className="text-primary" />
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500 leading-none">Откликнулись</span>
                            <span className="text-sm sm:text-base font-bold text-gray-800">{request.responses}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none font-semibold text-sm">
                          <Icon name="Eye" size={14} className="mr-1.5" />
                          Смотреть
                        </Button>
                        <Button className="flex-1 sm:flex-none bg-gradient-instagram text-white hover:opacity-90 font-semibold text-sm">
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
        )}

        {activeTab === 'offers' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="text-center mb-4 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-3">
                Предложения
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Товары и услуги от продавцов
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap font-medium text-sm"
              >
                Все
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  className="whitespace-nowrap font-medium text-sm"
                >
                  <Icon name={category.icon as any} size={14} className="mr-1.5" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid gap-3 sm:gap-4">
              {filteredOffers.map((offer, index) => (
                <Card 
                  key={offer.id} 
                  className="hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                          <Badge className="bg-gradient-purple-pink text-white border-0 text-xs">
                            {offer.category}
                          </Badge>
                          <Badge variant="secondary" className="font-medium text-xs">
                            <Icon name="MapPin" size={10} className="mr-1" />
                            {offer.city}
                          </Badge>
                          {offer.delivery && (
                            <Badge variant="outline" className="font-medium text-green-600 border-green-300 bg-green-50 text-xs">
                              <Icon name="Truck" size={10} className="mr-1" />
                              Доставка
                            </Badge>
                          )}
                          {offer.exchange && (
                            <Badge variant="outline" className="font-medium text-blue-600 border-blue-300 bg-blue-50 text-xs">
                              <Icon name="ArrowLeftRight" size={10} className="mr-1" />
                              Обмен
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg sm:text-2xl mb-1.5 sm:mb-2">{offer.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                          {offer.description}
                        </CardDescription>
                      </div>
                      <div className="ml-4">
                        <div className="text-2xl font-extrabold bg-gradient-purple-pink bg-clip-text text-transparent whitespace-nowrap">
                          {offer.price}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-blue-purple">
                            <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                              {offer.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-xs sm:text-sm">{offer.author}</p>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-xs sm:text-sm text-gray-600">{offer.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 text-gray-600">
                          <Icon name="Eye" size={18} />
                          <span className="text-sm font-medium">{offer.views}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none font-semibold text-sm">
                          <Icon name="Eye" size={14} className="mr-1.5" />
                          Смотреть
                        </Button>
                        <Button className="flex-1 sm:flex-none bg-gradient-purple-pink text-white hover:opacity-90 font-semibold text-sm">
                          Написать
                          <Icon name="MessageCircle" size={14} className="ml-1.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Категории</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {categories.map((category, index) => (
                <Card 
                  key={category.name}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setActiveTab('requests');
                  }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl ${category.color} flex items-center justify-center`}>
                        <Icon name={category.icon as any} size={28} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Активных запросов: {Math.floor(Math.random() * 50 + 10)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-instagram">
                  <AvatarFallback className="bg-transparent text-white text-2xl sm:text-3xl font-bold">
                    А
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl sm:text-3xl">Александр</CardTitle>
                <CardDescription className="text-sm sm:text-base">Пользователь с октября 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                    <Icon name="FileText" size={20} className="mx-auto mb-2 text-primary" />
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">5</p>
                    <p className="text-xs sm:text-sm text-gray-600">Запросов</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl">
                    <Icon name="MessageCircle" size={20} className="mx-auto mb-2 text-secondary" />
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">12</p>
                    <p className="text-xs sm:text-sm text-gray-600">Откликов</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                    <Icon name="Star" size={20} className="mx-auto mb-2 text-accent" />
                    <p className="text-xl sm:text-2xl font-bold text-gray-800">4.8</p>
                    <p className="text-xs sm:text-sm text-gray-600">Рейтинг</p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button variant="outline" className="w-full justify-start text-sm sm:text-base font-medium">
                    <Icon name="Settings" size={18} className="mr-2 sm:mr-3" />
                    Настройки профиля
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm sm:text-base font-medium">
                    <Icon name="Bell" size={18} className="mr-2 sm:mr-3" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm sm:text-base font-medium">
                    <Icon name="HelpCircle" size={18} className="mr-2 sm:mr-3" />
                    Помощь
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;