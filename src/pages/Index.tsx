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
  isFavorite?: boolean;
  photos?: string[];
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
  isFavorite?: boolean;
  photos?: string[];
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
    exchange: true,
    photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/fc00d06a-d099-40ff-ad81-00acaf3bcc1d.jpg']
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
    delivery: false,
    photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/0b1914a4-8040-4ba5-b056-340aa7672cc2.jpg']
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
    delivery: true,
    photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/a0739562-21b8-43e0-9bb1-abaeafd67dbd.jpg']
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
    exchange: true,
    photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/fc00d06a-d099-40ff-ad81-00acaf3bcc1d.jpg', 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/a0739562-21b8-43e0-9bb1-abaeafd67dbd.jpg']
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
    exchange: false,
    photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/f1a02277-f0d3-44f5-a04a-246b3ea08cdf.jpg']
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
    exchange: true,
    photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/a0739562-21b8-43e0-9bb1-abaeafd67dbd.jpg']
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
  type: 'request' | 'offer' | 'support';
  unread: number;
  messages: ChatMessage[];
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const [profileData, setProfileData] = useState({ name: 'Александр', email: 'user@example.com', currentPassword: '', newPassword: '', avatar: '' });
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<number>(1);
  const [favorites, setFavorites] = useState<number[]>([]);
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
  
  const [supportMessages, setSupportMessages] = useState<ChatMessage[]>([
    { id: 1, text: 'Здравствуйте! Я бот-помощник. Чем могу помочь?', sender: 'other', timestamp: 'сейчас', author: 'Поддержка' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [formType, setFormType] = useState<'request' | 'offer'>('request');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Новый отклик',
      message: 'Сергей откликнулся на ваш запрос iPhone 15 Pro',
      time: '5 мин назад',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Сделка завершена',
      message: 'Вы успешно завершили сделку с Анной',
      time: '2 часа назад',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Новое сообщение',
      message: 'Мария ответила на ваше сообщение',
      time: 'вчера',
      type: 'info',
      read: true
    },
    {
      id: 4,
      title: 'Новый отзыв',
      message: 'Игорь оставил вам отзыв на 5 звёзд',
      time: '2 дня назад',
      type: 'success',
      read: true
    },
  ]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    budget: '',
    description: '',
    city: '',
    delivery: false,
    exchange: false,
    photos: [] as string[],
  });
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
              {isAuthenticated && (
                <Button 
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('profile')}
                  className="font-medium"
                >
                  <Avatar className="w-5 h-5 mr-2 bg-gradient-instagram">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                        {profileData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  Профиль
                </Button>
              )}
            </div>
            
            <button
              onClick={() => setActiveTab('favorites')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon name="Heart" size={22} className="text-gray-700" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                  {favorites.length}
                </span>
              )}
            </button>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="Bell" size={22} className="text-gray-700" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-instagram rounded-full text-white text-xs flex items-center justify-center font-semibold">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="MessageCircle" size={22} className="text-gray-700" />
                {dialogs.some(d => d.unread > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-instagram rounded-full"></span>
                )}
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => setIsLoginOpen(true)}
                  variant="outline" 
                  className="font-semibold text-sm"
                >
                  Войти
                </Button>
                <Button 
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-gradient-instagram text-white hover:opacity-90 font-semibold text-sm"
                >
                  Регистрация
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsCreateFormOpen(true)}
                className="bg-gradient-instagram text-white hover:opacity-90 font-semibold shadow-lg text-sm sm:text-base px-3 sm:px-4 hidden md:flex"
              >
                <Icon name="Plus" size={16} className="sm:mr-2" />
                <span className="hidden sm:inline">Создать</span>
              </Button>
            )}
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
          {isAuthenticated && (
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              <Avatar className="w-5 h-5 bg-gradient-instagram">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                    {profileData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-xs mt-1">Профиль</span>
            </button>
          )}
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
                    {request.photos && request.photos.length > 0 && (
                      <div className="mb-4 -mx-6 -mt-6">
                        <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                          {request.photos.map((photo, idx) => (
                            <img 
                              key={idx}
                              src={photo} 
                              alt={`${request.title} ${idx + 1}`}
                              className="h-48 w-auto object-cover rounded-t-xl first:rounded-tl-xl"
                            />
                          ))}
                        </div>
                      </div>
                    )}
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
                        <Button 
                          onClick={() => {
                            if (!isAuthenticated) {
                              setIsLoginOpen(true);
                            } else {
                              if (favorites.includes(request.id)) {
                                setFavorites(favorites.filter(id => id !== request.id));
                              } else {
                                setFavorites([...favorites, request.id]);
                              }
                            }
                          }}
                          variant="outline" 
                          className={`font-semibold text-sm ${favorites.includes(request.id) ? 'text-red-500 border-red-500' : ''}`}
                        >
                          <Icon name="Heart" size={14} className={`mr-1.5 ${favorites.includes(request.id) ? 'fill-red-500' : ''}`} />
                          {favorites.includes(request.id) ? 'В избранном' : 'В избранное'}
                        </Button>
                        <Button variant="outline" className="flex-1 sm:flex-none font-semibold text-sm">
                          <Icon name="Eye" size={14} className="mr-1.5" />
                          Смотреть
                        </Button>
                        <Button 
                          onClick={() => {
                            if (!isAuthenticated) {
                              setIsLoginOpen(true);
                            } else {
                              alert('Функция откликов будет доступна в следующей версии');
                            }
                          }}
                          className="flex-1 sm:flex-none bg-gradient-instagram text-white hover:opacity-90 font-semibold text-sm"
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
                    {offer.photos && offer.photos.length > 0 && (
                      <div className="mb-4 -mx-6 -mt-6">
                        <div className="flex overflow-x-auto gap-2 scrollbar-hide">
                          {offer.photos.map((photo, idx) => (
                            <img 
                              key={idx}
                              src={photo} 
                              alt={`${offer.title} ${idx + 1}`}
                              className="h-48 w-auto object-cover rounded-t-xl first:rounded-tl-xl"
                            />
                          ))}
                        </div>
                      </div>
                    )}
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
                        <Button 
                          onClick={() => {
                            if (!isAuthenticated) {
                              setIsLoginOpen(true);
                            } else {
                              if (favorites.includes(offer.id)) {
                                setFavorites(favorites.filter(id => id !== offer.id));
                              } else {
                                setFavorites([...favorites, offer.id]);
                              }
                            }
                          }}
                          variant="outline" 
                          className={`font-semibold text-sm ${favorites.includes(offer.id) ? 'text-red-500 border-red-500' : ''}`}
                        >
                          <Icon name="Heart" size={14} className={`mr-1.5 ${favorites.includes(offer.id) ? 'fill-red-500' : ''}`} />
                          {favorites.includes(offer.id) ? 'В избранном' : 'В избранное'}
                        </Button>
                        <Button variant="outline" className="flex-1 sm:flex-none font-semibold text-sm">
                          <Icon name="Eye" size={14} className="mr-1.5" />
                          Смотреть
                        </Button>
                        <Button 
                          onClick={() => {
                            if (!isAuthenticated) {
                              setIsLoginOpen(true);
                            } else {
                              setIsChatOpen(true);
                            }
                          }}
                          className="flex-1 sm:flex-none bg-gradient-instagram text-white hover:opacity-90 font-semibold text-sm"
                        >
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

        {activeTab === 'favorites' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <div className="text-center mb-4 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-3">
                Избранное
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'объявление' : 'объявлений'}
              </p>
            </div>
            
            {favorites.length === 0 ? (
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <Icon name="Heart" size={64} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Избранное пусто</h3>
                  <p className="text-gray-600 mb-4">Добавьте объявления в избранное, чтобы быстро находить их</p>
                  <Button onClick={() => setActiveTab('requests')} className="bg-gradient-instagram text-white hover:opacity-90">
                    Посмотреть объявления
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                <p className="text-gray-600 text-center">Здесь будут отображаться ваши избранные объявления</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Категории</h2>
              <p className="text-base sm:text-lg text-gray-600">Выберите категорию для просмотра запросов и предложений</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category, index) => {
                const requestCount = Math.floor(Math.random() * 50 + 10);
                const offerCount = Math.floor(Math.random() * 30 + 5);
                
                return (
                  <Card
                    key={category.name}
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      setActiveTab('requests');
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={category.icon as any} size={32} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 flex items-center">
                                <Icon name="Search" size={14} className="mr-1.5 text-blue-500" />
                                Запросы
                              </span>
                              <span className="font-bold text-gray-800">{requestCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 flex items-center">
                                <Icon name="Package" size={14} className="mr-1.5 text-green-500" />
                                Предложения
                              </span>
                              <span className="font-bold text-gray-800">{offerCount}</span>
                            </div>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-gray-400 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
              <CardContent className="p-8 text-center">
                <Icon name="HelpCircle" size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Не нашли нужную категорию?</h3>
                <p className="text-gray-600 mb-4">Напишите нам, и мы добавим её!</p>
                <Button 
                  onClick={() => setIsSupportOpen(true)}
                  variant="outline" 
                  className="font-semibold"
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Связаться с поддержкой
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-instagram">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <AvatarFallback className="bg-transparent text-white text-2xl sm:text-3xl font-bold">
                      {profileData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
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
                  <Button 
                    onClick={() => setIsProfileEditOpen(true)}
                    variant="outline" 
                    className="w-full justify-start text-sm sm:text-base font-medium"
                  >
                    <Icon name="Settings" size={18} className="mr-2 sm:mr-3" />
                    Настройки профиля
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm sm:text-base font-medium">
                    <Icon name="Bell" size={18} className="mr-2 sm:mr-3" />
                    Уведомления
                  </Button>
                  <Button 
                    onClick={() => setIsSupportOpen(true)}
                    variant="outline" 
                    className="w-full justify-start text-sm sm:text-base font-medium"
                  >
                    <Icon name="HelpCircle" size={18} className="mr-2 sm:mr-3" />
                    Помощь
                  </Button>
                  <Button 
                    onClick={() => setIsAuthenticated(false)}
                    variant="outline" 
                    className="w-full justify-start text-sm sm:text-base font-medium text-red-600 hover:text-red-700"
                  >
                    <Icon name="LogOut" size={18} className="mr-2 sm:mr-3" />
                    Выйти
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
                      dialog.type === 'support'
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-l-purple-500'
                        : selectedDialog === dialog.id 
                          ? 'bg-primary/10 border-l-4 border-l-primary' 
                          : 'hover:bg-gray-100'
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
                              dialog.type === 'support'
                                ? 'bg-purple-100 text-purple-700 border-purple-200'
                                : dialog.type === 'request' 
                                  ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                  : 'bg-green-100 text-green-700 border-green-200'
                            }`}
                          >
                            {dialog.type === 'support' ? 'Поддержка' : dialog.type === 'request' ? 'Запрос' : 'Предложение'}
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
                  <div className={`${
                    currentDialog.type === 'support' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gradient-instagram'
                  } text-white p-4 flex items-center justify-between`}>
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
                          <Badge className="text-[10px] px-2 py-0.5 bg-white/20 text-white border-white/30">
                            {currentDialog.type === 'support' ? 'Поддержка' : currentDialog.type === 'request' ? 'Запрос' : 'Предложение'}
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
                    {currentDialog.type !== 'support' && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Button
                          onClick={() => setIsReviewFormOpen(true)}
                          className="bg-gradient-purple-pink text-white hover:opacity-90 font-semibold text-sm px-4 py-2 rounded-xl"
                        >
                          <Icon name="CheckCircle" size={16} className="mr-2" />
                          Заключить сделку
                        </Button>
                      </div>
                    )}
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

      {isCreateFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gradient-instagram text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between z-10">
              <h2 className="text-xl sm:text-2xl font-bold">Создать объявление</h2>
              <button 
                onClick={() => setIsCreateFormOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Тип объявления</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormType('request')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formType === 'request'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon name="Search" size={24} className="mx-auto mb-2" />
                    <p className="font-semibold">Запрос</p>
                    <p className="text-xs text-gray-500 mt-1">Я ищу товар/услугу</p>
                  </button>
                  <button
                    onClick={() => setFormType('offer')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formType === 'offer'
                        ? 'border-secondary bg-secondary/10 text-secondary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon name="Package" size={24} className="mx-auto mb-2" />
                    <p className="font-semibold">Предложение</p>
                    <p className="text-xs text-gray-500 mt-1">Я предлагаю товар/услугу</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Заголовок *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={formType === 'request' ? 'Например: Ищу iPhone 15 Pro' : 'Например: Продаю iPhone 14 Pro Max'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Категория *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formType === 'request' ? 'Бюджет' : 'Цена'}
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder={formType === 'request' ? 'Например: до 120 000 ₽' : 'Например: 85 000 ₽'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Описание *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Подробно опишите что вы ищете или предлагаете..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Город *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Например: Москва"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Фотографии (до 5 шт)
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img 
                          src={photo} 
                          alt={`Фото ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          onClick={() => {
                            setFormData({ 
                              ...formData, 
                              photos: formData.photos.filter((_, i) => i !== idx) 
                            });
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                    {formData.photos.length < 5 && (
                      <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const remainingSlots = 5 - formData.photos.length;
                            const filesToAdd = files.slice(0, remainingSlots);
                            
                            filesToAdd.forEach(file => {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormData(prev => ({
                                  ...prev,
                                  photos: [...prev.photos, reader.result as string]
                                }));
                              };
                              reader.readAsDataURL(file);
                            });
                          }}
                        />
                        <div className="text-center">
                          <Icon name="Plus" size={24} className="mx-auto text-gray-400" />
                          <p className="text-xs text-gray-500 mt-1">Добавить</p>
                        </div>
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Добавлено {formData.photos.length} из 5 фотографий
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.delivery}
                    onChange={(e) => setFormData({ ...formData, delivery: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm font-medium text-gray-700">Возможна доставка</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.exchange}
                    onChange={(e) => setFormData({ ...formData, exchange: e.target.checked })}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/50"
                  />
                  <span className="text-sm font-medium text-gray-700">Возможен обмен</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setIsCreateFormOpen(false)}
                  variant="outline"
                  className="flex-1 py-3 text-base font-semibold"
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => {
                    if (formData.title && formData.category && formData.description && formData.city) {
                      alert('Объявление создано!');
                      setIsCreateFormOpen(false);
                      setFormData({
                        title: '',
                        category: '',
                        budget: '',
                        description: '',
                        city: '',
                        delivery: false,
                        exchange: false,
                        photos: [],
                      });
                    } else {
                      alert('Заполните все обязательные поля');
                    }
                  }}
                  className="flex-1 bg-gradient-instagram text-white hover:opacity-90 py-3 text-base font-semibold"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isReviewFormOpen && currentDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-instagram text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold">Оставить отзыв</h2>
              <button 
                onClick={() => {
                  setIsReviewFormOpen(false);
                  setReviewRating(0);
                  setReviewText('');
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3 bg-gradient-purple-pink">
                  <AvatarFallback className="bg-transparent text-white font-bold text-xl">
                    {currentDialog.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold text-gray-800">{currentDialog.name}</h3>
                <p className="text-sm text-gray-500">Оцените вашу сделку</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">Ваша оценка</label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Icon 
                        name="Star" 
                        size={40} 
                        className={`${
                          star <= reviewRating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {reviewRating > 0 && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {reviewRating === 5 && 'Отлично!'}
                    {reviewRating === 4 && 'Хорошо!'}
                    {reviewRating === 3 && 'Нормально'}
                    {reviewRating === 2 && 'Плохо'}
                    {reviewRating === 1 && 'Ужасно'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ваш отзыв</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Расскажите о вашем опыте сделки..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => {
                    setIsReviewFormOpen(false);
                    setReviewRating(0);
                    setReviewText('');
                  }}
                  variant="outline"
                  className="flex-1 py-3 text-base font-semibold"
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => {
                    if (reviewRating > 0) {
                      alert(`Отзыв отправлен! Оценка: ${reviewRating} звезд`);
                      setIsReviewFormOpen(false);
                      setReviewRating(0);
                      setReviewText('');
                    } else {
                      alert('Поставьте оценку');
                    }
                  }}
                  className="flex-1 bg-gradient-instagram text-white hover:opacity-90 py-3 text-base font-semibold"
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[600px] flex flex-col animate-scale-in">
            <div className="bg-gradient-instagram text-white p-4 sm:p-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Уведомления</h2>
                <p className="text-xs text-white/80 mt-1">
                  {notifications.filter(n => !n.read).length} новых
                </p>
              </div>
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Icon name="Bell" size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500">У вас пока нет уведомлений</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}
                      onClick={() => {
                        setNotifications(notifications.map(n => 
                          n.id === notification.id ? { ...n, read: true } : n
                        ));
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'success' 
                            ? 'bg-green-100' 
                            : notification.type === 'warning' 
                              ? 'bg-yellow-100' 
                              : 'bg-blue-100'
                        }`}>
                          <Icon 
                            name={
                              notification.type === 'success' 
                                ? 'CheckCircle' 
                                : notification.type === 'warning' 
                                  ? 'AlertCircle' 
                                  : 'Info'
                            } 
                            size={20} 
                            className={`${
                              notification.type === 'success' 
                                ? 'text-green-600' 
                                : notification.type === 'warning' 
                                  ? 'text-yellow-600' 
                                  : 'text-blue-600'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="font-semibold text-sm text-gray-800">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t rounded-b-2xl">
              <Button
                onClick={() => {
                  setNotifications(notifications.map(n => ({ ...n, read: true })));
                }}
                variant="outline"
                className="w-full font-semibold"
                disabled={notifications.filter(n => !n.read).length === 0}
              >
                <Icon name="CheckCheck" size={16} className="mr-2" />
                Отметить все как прочитанные
              </Button>
            </div>
          </div>
        </div>
      )}

      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-instagram text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Вход</h2>
              <p className="text-white/80 text-sm mt-1">Войдите в свой аккаунт</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Пароль</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setIsLoginOpen(false)} variant="outline" className="flex-1">
                  Отмена
                </Button>
                <Button 
                  onClick={() => {
                    if (loginData.email && loginData.password) {
                      setIsAuthenticated(true);
                      setIsLoginOpen(false);
                      setLoginData({ email: '', password: '' });
                    } else {
                      alert('Заполните все поля');
                    }
                  }}
                  className="flex-1 bg-gradient-instagram text-white hover:opacity-90"
                >
                  Войти
                </Button>
              </div>
              <p className="text-center text-sm text-gray-600">
                Нет аккаунта?{' '}
                <button 
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Зарегистрируйтесь
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-instagram text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Регистрация</h2>
              <p className="text-white/80 text-sm mt-1">Создайте новый аккаунт</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Имя</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  placeholder="Александр"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Пароль</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setIsRegisterOpen(false)} variant="outline" className="flex-1">
                  Отмена
                </Button>
                <Button 
                  onClick={() => {
                    if (registerData.name && registerData.email && registerData.password) {
                      setIsAuthenticated(true);
                      setIsRegisterOpen(false);
                      setRegisterData({ email: '', password: '', name: '' });
                    } else {
                      alert('Заполните все поля');
                    }
                  }}
                  className="flex-1 bg-gradient-instagram text-white hover:opacity-90"
                >
                  Зарегистрироваться
                </Button>
              </div>
              <p className="text-center text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <button 
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  Войдите
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {isProfileEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-instagram text-white p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold">Редактирование профиля</h2>
              <button onClick={() => setIsProfileEditOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Фото профиля</label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 bg-gradient-instagram">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <AvatarFallback className="bg-transparent text-white text-2xl font-bold">
                        {profileData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const result = reader.result as string;
                            setAvatarPreview(result);
                            setProfileData({ ...profileData, avatar: result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer text-sm font-semibold text-gray-700 transition-colors"
                    >
                      Выбрать фото
                    </label>
                    {avatarPreview && (
                      <button
                        onClick={() => {
                          setAvatarPreview('');
                          setProfileData({ ...profileData, avatar: '' });
                        }}
                        className="ml-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Имя</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <hr className="my-4" />
              <h3 className="font-bold text-lg text-gray-800">Смена пароля</h3>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Текущий пароль</label>
                <input
                  type="password"
                  value={profileData.currentPassword}
                  onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Новый пароль</label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setIsProfileEditOpen(false)} variant="outline" className="flex-1">
                  Отмена
                </Button>
                <Button 
                  onClick={() => {
                    alert('Профиль обновлён!');
                    setIsProfileEditOpen(false);
                  }}
                  className="flex-1 bg-gradient-instagram text-white hover:opacity-90"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col animate-scale-in">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 bg-white/20">
                  <AvatarFallback className="bg-transparent text-white font-bold text-xl">👮</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">Поддержка</h3>
                  <p className="text-xs text-white/80">Онлайн 24/7</p>
                </div>
              </div>
              <button onClick={() => setIsSupportOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {supportMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-instagram text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t rounded-b-2xl">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newMessage.trim()) {
                      const msg: ChatMessage = {
                        id: supportMessages.length + 1,
                        text: newMessage,
                        sender: 'me',
                        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                        author: 'Вы'
                      };
                      setSupportMessages([...supportMessages, msg]);
                      setNewMessage('');
                    }
                  }}
                  placeholder="Напишите ваш вопрос..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <Button 
                  onClick={() => {
                    if (newMessage.trim()) {
                      const msg: ChatMessage = {
                        id: supportMessages.length + 1,
                        text: newMessage,
                        sender: 'me',
                        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                        author: 'Вы'
                      };
                      setSupportMessages([...supportMessages, msg]);
                      setNewMessage('');
                    }
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 px-4 py-2 rounded-xl"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-40 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <Icon name="HelpCircle" size={28} />
      </button>
    </div>
  );
};

export default Index;