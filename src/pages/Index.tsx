import { useState, useRef, useEffect } from 'react';
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

interface ChatMessage {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  author: string;
}

interface ChatDialog {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  type: 'request' | 'offer';
  unread: number;
  messages: ChatMessage[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<number>(1);
  const [dialogs, setDialogs] = useState<ChatDialog[]>([
    {
      id: 1,
      name: 'Сергей',
      avatar: 'С',
      lastMessage: '115 000₽, Москва, район метро Таганская',
      lastTime: '10:36',
      type: 'request',
      unread: 1,
      messages: [
        { id: 1, text: 'Здравствуйте! Заинтересовал ваш запрос на iPhone 15 Pro', sender: 'other', timestamp: '10:30', author: 'Сергей' },
        { id: 2, text: 'Привет! Да, всё ещё актуально', sender: 'me', timestamp: '10:32', author: 'Вы' },
        { id: 3, text: 'У меня есть отличный вариант в идеальном состоянии, 256GB', sender: 'other', timestamp: '10:33', author: 'Сергей' },
        { id: 4, text: 'Отлично! Какая цена и где находитесь?', sender: 'me', timestamp: '10:35', author: 'Вы' },
        { id: 5, text: '115 000₽, Москва, район метро Таганская', sender: 'other', timestamp: '10:36', author: 'Сергей' },
      ]
    },
    {
      id: 2,
      name: 'Мария',
      avatar: 'М',
      lastMessage: 'Могу выполнить работу качественно',
      lastTime: 'вчера',
      type: 'request',
      unread: 0,
      messages: [
        { id: 1, text: 'Добрый день! Интересует ремонт?', sender: 'other', timestamp: 'вчера 15:20', author: 'Мария' },
        { id: 2, text: 'Да, нужен мастер по ремонту квартиры', sender: 'me', timestamp: 'вчера 15:25', author: 'Вы' },
        { id: 3, text: 'Могу выполнить работу качественно, опыт 8 лет', sender: 'other', timestamp: 'вчера 15:30', author: 'Мария' },
      ]
    },
    {
      id: 3,
      name: 'Анна',
      avatar: 'А',
      lastMessage: 'Спасибо за покупку!',
      lastTime: '2 дня назад',
      type: 'offer',
      unread: 0,
      messages: [
        { id: 1, text: 'Здравствуйте! Интересуют услуги дизайнера?', sender: 'other', timestamp: '2 дня 10:00', author: 'Анна' },
        { id: 2, text: 'Да, расскажите подробнее о ваших услугах', sender: 'me', timestamp: '2 дня 10:15', author: 'Вы' },
        { id: 3, text: 'Спасибо за покупку!', sender: 'other', timestamp: '2 дня 11:00', author: 'Анна' },
      ]
    },
    {
      id: 4,
      name: 'Игорь',
      avatar: 'И',
      lastMessage: 'Могу обменять на что-то интересное',
      lastTime: '3 дня назад',
      type: 'offer',
      unread: 2,
      messages: [
        { id: 1, text: 'Привет! Видел твоё предложение MacBook Pro', sender: 'other', timestamp: '3 дня 14:00', author: 'Игорь' },
        { id: 2, text: 'Да, доступен для обмена', sender: 'me', timestamp: '3 дня 14:10', author: 'Вы' },
        { id: 3, text: 'Могу обменять на что-то интересное', sender: 'other', timestamp: '3 дня 14:20', author: 'Игорь' },
      ]
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentDialog = dialogs.find(d => d.id === selectedDialog);

  const filteredRequests = selectedCategory 
    ? mockRequests.filter(req => req.category === selectedCategory)
    : mockRequests;

  const filteredOffers = selectedCategory 
    ? mockOffers.filter(offer => offer.category === selectedCategory)
    : mockOffers;

  const handleSendMessage = () => {
    if (newMessage.trim() && currentDialog) {
      const message: ChatMessage = {
        id: currentDialog.messages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        author: 'Вы'
      };
      
      const updatedDialogs = dialogs.map(d => 
        d.id === selectedDialog 
          ? { ...d, messages: [...d.messages, message], lastMessage: newMessage, lastTime: 'только что' }
          : d
      );
      
      setDialogs(updatedDialogs);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentDialog?.messages, isChatOpen]);

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
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
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
                        <Button className="flex-1 sm:flex-none bg-gradient-instagram text-white hover:opacity-90 font-semibold text-sm">
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
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Категории</h2>
              <p className="text-base sm:text-lg text-gray-600">Выберите категорию для поиска</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {categories.map((category, index) => (
                <div
                  key={category.name}
                  className="group cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setActiveTab('requests');
                  }}
                >
                  <div className="relative">
                    <div className={`w-full aspect-square rounded-2xl ${category.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}>
                      <Icon name={category.icon as any} size={32} className="text-white transition-transform duration-300 group-hover:scale-125" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-center mt-2 text-xs sm:text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-0.5">{Math.floor(Math.random() * 50 + 10)}</p>
                </div>
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

      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-instagram flex items-center justify-center">
                  <Icon name="MessageSquare" className="text-white" size={16} />
                </div>
                <span className="text-lg font-bold text-white">Доска запросов</span>
              </div>
              <p className="text-sm text-gray-400">Платформа для размещения запросов и предложений товаров и услуг</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab('requests')} className="hover:text-white transition-colors">Запросы</button></li>
                <li><button onClick={() => setActiveTab('offers')} className="hover:text-white transition-colors">Предложения</button></li>
                <li><button onClick={() => setActiveTab('categories')} className="hover:text-white transition-colors">Категории</button></li>
                <li><button onClick={() => setActiveTab('profile')} className="hover:text-white transition-colors">Профиль</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4">Категории</h4>
              <ul className="space-y-2 text-sm">
                {categories.map(cat => (
                  <li key={cat.name}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setActiveTab('requests');
                      }} 
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3 sm:mb-4">Информация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs sm:text-sm text-gray-400">© 2024 Доска запросов. Все права защищены.</p>
              <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                <a href="#" className="hover:text-white transition-colors">Условия использования</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[600px] flex animate-scale-in overflow-hidden">
            <div className="w-80 bg-gray-50 border-r flex flex-col">
              <div className="p-4 border-b bg-white">
                <h3 className="font-bold text-lg text-gray-800">Сообщения</h3>
                <p className="text-xs text-gray-500 mt-1">{dialogs.length} диалогов</p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {dialogs.map((dialog) => (
                  <div
                    key={dialog.id}
                    onClick={() => setSelectedDialog(dialog.id)}
                    className={`p-4 border-b cursor-pointer transition-colors ${
                      selectedDialog === dialog.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 bg-gradient-instagram">
                          <AvatarFallback className="bg-transparent text-white font-bold">
                            {dialog.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {dialog.unread > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                            {dialog.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-gray-800 truncate">{dialog.name}</h4>
                          <span className="text-xs text-gray-500 ml-2">{dialog.lastTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge 
                            className={`text-[10px] px-2 py-0.5 ${
                              dialog.type === 'request' 
                                ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                : 'bg-green-100 text-green-700 border-green-200'
                            }`}
                          >
                            {dialog.type === 'request' ? 'Запрос' : 'Предложение'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{dialog.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {currentDialog && (
                <>
                  <div className="bg-gradient-instagram text-white p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 bg-white/20">
                        <AvatarFallback className="bg-transparent text-white font-bold">
                          {currentDialog.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg">{currentDialog.name}</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-white/80">онлайн</p>
                          <Badge className={`text-[10px] px-2 py-0.5 ${
                            currentDialog.type === 'request'
                              ? 'bg-white/20 text-white border-white/30'
                              : 'bg-white/20 text-white border-white/30'
                          }`}>
                            {currentDialog.type === 'request' ? 'Запрос' : 'Предложение'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <Icon name="X" size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                    {currentDialog.messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                          <div className={`rounded-2xl px-4 py-2 ${
                            msg.sender === 'me' 
                              ? 'bg-gradient-instagram text-white' 
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${
                            msg.sender === 'me' ? 'text-right' : 'text-left'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Введите сообщение..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-gradient-instagram text-white hover:opacity-90 px-4 py-2 rounded-xl"
                      >
                        <Icon name="Send" size={18} />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;