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

const cities = [
  'Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 
  'Нижний Новгород', 'Самара', 'Омск', 'Челябинск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'
];

const categories = [
  { name: 'Электроника', icon: 'Smartphone', color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600', popular: true },
  { name: 'Одежда', icon: 'ShoppingBag', color: 'bg-gradient-to-br from-pink-500 via-rose-500 to-red-500', popular: true },
  { name: 'Услуги', icon: 'Wrench', color: 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500', popular: true },
  { name: 'Недвижимость', icon: 'Home', color: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500', popular: true },
  { name: 'Транспорт', icon: 'Car', color: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500', popular: true },
  { name: 'Мебель', icon: 'Armchair', color: 'bg-gradient-to-br from-amber-600 via-orange-600 to-red-600', popular: false },
  { name: 'Детские товары', icon: 'Baby', color: 'bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-400', popular: false },
  { name: 'Спорт', icon: 'Dumbbell', color: 'bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600', popular: false },
  { name: 'Красота', icon: 'Sparkles', color: 'bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500', popular: false },
  { name: 'Животные', icon: 'Dog', color: 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600', popular: false },
  { name: 'Хобби', icon: 'Gamepad2', color: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500', popular: false },
  { name: 'Книги', icon: 'BookOpen', color: 'bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-600', popular: false },
  { name: 'Строительство', icon: 'HardHat', color: 'bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600', popular: false },
  { name: 'Работа', icon: 'Briefcase', color: 'bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700', popular: true },
  { name: 'Еда и напитки', icon: 'Coffee', color: 'bg-gradient-to-br from-rose-500 via-red-500 to-orange-500', popular: false },
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
    photos: ['https://cdn.poehali.dev/files/609c2405-3d9e-47e8-b11a-a587fb53e663.jpg']
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
  },
  {
    id: 5,
    title: 'Куплю диван для гостиной',
    category: 'Мебель',
    budget: 'до 50 000 ₽',
    author: 'Анастасия',
    rating: 4.6,
    responses: 7,
    description: 'Ищу угловой диван в хорошем состоянии',
    city: 'Новосибирск',
    delivery: true
  },
  {
    id: 6,
    title: 'Нужна коляска для ребенка',
    category: 'Детские товары',
    budget: 'до 15 000 ₽',
    author: 'Ольга',
    rating: 4.9,
    responses: 12,
    description: 'Трансформер или прогулочная коляска',
    city: 'Екатеринбург',
    delivery: false
  },
  {
    id: 7,
    title: 'Ищу велосипед горный',
    category: 'Спорт',
    budget: 'до 30 000 ₽',
    author: 'Максим',
    rating: 4.7,
    responses: 9,
    description: 'Нужен горный велосипед для трейлов',
    city: 'Москва',
    delivery: true
  }
];

const mockOffers: Offer[] = [
  {
    id: 1,
    title: 'Продаю iPhone 15 Pro',
    category: 'Электроника',
    price: '95 000 ₽',
    author: 'Сергей',
    rating: 4.9,
    views: 145,
    description: 'iPhone 15 Pro 256GB, титановый, отличное состояние, все документы',
    city: 'Москва',
    delivery: true,
    exchange: true,
    photos: ['https://cdn.poehali.dev/files/609c2405-3d9e-47e8-b11a-a587fb53e663.jpg']
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
  },
  {
    id: 4,
    title: 'Продаю шкаф-купе',
    category: 'Мебель',
    price: '35 000 ₽',
    author: 'Виктория',
    rating: 4.7,
    views: 67,
    description: 'Шкаф-купе 2.5м, зеркальные двери, отличное состояние',
    city: 'Москва',
    delivery: false,
    exchange: false
  },
  {
    id: 5,
    title: 'Детская кроватка с матрасом',
    category: 'Детские товары',
    price: '8 000 ₽',
    author: 'Татьяна',
    rating: 5.0,
    views: 89,
    description: 'Кроватка-маятник с ортопедическим матрасом',
    city: 'Санкт-Петербург',
    delivery: true
  },
  {
    id: 6,
    title: 'Горный велосипед Trek',
    category: 'Спорт',
    price: '45 000 ₽',
    author: 'Николай',
    rating: 4.8,
    views: 112,
    description: 'Trek X-Caliber 8, карбоновая вилка, гидравлика',
    city: 'Казань',
    delivery: true,
    exchange: true
  },
  {
    id: 7,
    title: 'Вакансия: Junior разработчик',
    category: 'Работа',
    price: 'от 80 000 ₽',
    author: 'IT Компания',
    rating: 4.9,
    views: 234,
    description: 'Ищем Junior Python разработчика в команду',
    city: 'Москва',
    delivery: false
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
  relatedItem?: Request | Offer;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface UserProfile {
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  completedDeals: number;
  registeredDate: string;
  city: string;
  description: string;
  requests: Request[];
  offers: Offer[];
  reviews: Review[];
}

const mockUserProfiles: Record<string, UserProfile> = {
  'Александр': {
    name: 'Александр',
    avatar: 'А',
    rating: 4.8,
    reviewsCount: 24,
    completedDeals: 18,
    registeredDate: 'Январь 2023',
    city: 'Москва',
    description: 'Продаю и покупаю технику. Всегда на связи, быстрые сделки.',
    requests: [mockRequests[0]],
    offers: [],
    reviews: [
      { id: 1, author: 'Мария', rating: 5, text: 'Отличный покупатель, быстро договорились!', date: '15 янв 2024' },
      { id: 2, author: 'Иван', rating: 4, text: 'Все прошло хорошо, рекомендую', date: '10 дек 2023' },
    ]
  },
  'Сергей': {
    name: 'Сергей',
    avatar: 'С',
    rating: 4.9,
    reviewsCount: 42,
    completedDeals: 35,
    registeredDate: 'Март 2022',
    city: 'Москва',
    description: 'Специализируюсь на продаже техники Apple. Все товары с гарантией.',
    requests: [],
    offers: [mockOffers[0]],
    reviews: [
      { id: 1, author: 'Петр', rating: 5, text: 'Надежный продавец, все как описано!', date: '20 янв 2024' },
      { id: 2, author: 'Анна', rating: 5, text: 'Отлично упаковано, быстрая доставка', date: '18 янв 2024' },
      { id: 3, author: 'Дмитрий', rating: 4, text: 'Хорошее качество товара', date: '12 янв 2024' },
    ]
  },
  'Мария': {
    name: 'Мария',
    avatar: 'М',
    rating: 4.9,
    reviewsCount: 31,
    completedDeals: 28,
    registeredDate: 'Июнь 2022',
    city: 'Санкт-Петербург',
    description: 'Мастер по ремонту квартир. Качество и сроки гарантирую.',
    requests: [mockRequests[1]],
    offers: [],
    reviews: [
      { id: 1, author: 'Александр', rating: 5, text: 'Профессиональная работа!', date: '22 янв 2024' },
      { id: 2, author: 'Ольга', rating: 5, text: 'Все сделали качественно и в срок', date: '15 янв 2024' },
    ]
  }
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile | null>(null);
  const [selectedItem, setSelectedItem] = useState<Request | Offer | null>(null);
  const [responseData, setResponseData] = useState({ price: '', comment: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const [profileData, setProfileData] = useState({ name: 'Александр', email: 'user@example.com', currentPassword: '', newPassword: '', avatar: '' });
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<number>(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dialogs, setDialogs] = useState<ChatDialog[]>([
    {
      id: 1,
      name: 'Сергей',
      avatar: 'С',
      lastMessage: '115 000₽, Москва, район метро Таганская',
      lastTime: '10:36',
      type: 'request',
      unread: 1,
      relatedItem: mockRequests[0],
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
      relatedItem: mockRequests[1],
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
      relatedItem: mockOffers[1],
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
      relatedItem: mockOffers[2],
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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [language, setLanguage] = useState<'ru' | 'ua'>('ru');
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'price'>('date');
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

  const filteredRequests = mockRequests.filter(req => {
    const matchesCategory = selectedCategory ? req.category === selectedCategory : true;
    const matchesCity = selectedCity ? req.city === selectedCity : true;
    const matchesSearch = searchQuery ? 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesCity && matchesSearch;
  });

  const filteredOffers = mockOffers.filter(offer => {
    const matchesCategory = selectedCategory ? offer.category === selectedCategory : true;
    const matchesCity = selectedCity ? offer.city === selectedCity : true;
    const matchesSearch = searchQuery ? 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesCity && matchesSearch;
  });

  const getCategoryCount = (categoryName: string) => {
    const requestCount = mockRequests.filter(req => req.category === categoryName).length;
    const offerCount = mockOffers.filter(offer => offer.category === categoryName).length;
    return requestCount + offerCount;
  };

  const getAllListingsCount = () => {
    return mockRequests.length + mockOffers.length;
  };

  const popularCategories = categories.filter(c => c.popular);

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    if (touchStart) {
      const distance = touchStart - currentTouch;
      if (Math.abs(distance) > minSwipeDistance / 2) {
        setSwipeDirection(distance > 0 ? 'left' : 'right');
      }
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setSwipeDirection(null);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      if (activeTab === 'requests') {
        setActiveTab('offers');
      } else if (activeTab === 'offers' && isAuthenticated) {
        setActiveTab('favorites');
      }
    }
    
    if (isRightSwipe) {
      if (activeTab === 'favorites' && isAuthenticated) {
        setActiveTab('offers');
      } else if (activeTab === 'offers') {
        setActiveTab('requests');
      }
    }
    
    setSwipeDirection(null);
    setTouchStart(null);
    setTouchEnd(null);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50">
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-4">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/30">
                <Icon name="MessageSquare" className="text-white" size={20} />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">Доска запросов</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск объявлений..."
                  className="w-full pl-10 pr-4 py-2 border border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
            {isAuthenticated && (
              <div className="flex items-center space-x-1 text-white">
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className="relative p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                  title="Избранное"
                >
                  <Icon name="Heart" size={22} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white text-[10px] flex items-center justify-center font-semibold shadow-lg">
                      {favorites.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                  title="Уведомления"
                >
                  <Icon name="Bell" size={22} />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white text-[10px] flex items-center justify-center font-semibold shadow-lg">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setIsChatOpen(!isChatOpen)} 
                  className="relative p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                  title="Сообщения"
                >
                  <Icon name="MessageCircle" size={22} />
                  {dialogs.some(d => d.unread > 0) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></span>
                  )}
                </button>
              </div>
            )}

            <div className="h-6 w-px bg-white/30"></div>

            <div className="flex items-center bg-white/20 backdrop-blur-md rounded-lg p-0.5">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  language === 'ru' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-300 hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('ua')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  language === 'ua' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-300 hover:text-white'
                }`}
              >
                UA
              </button>
            </div>

            {!isAuthenticated ? (
              <Button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white font-medium text-sm px-6 h-9"
              >
                Войти
              </Button>
            ) : (
              <button
                onClick={() => setActiveTab('profile')}
                className="flex items-center space-x-2 px-3 py-1.5 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                title="Профиль"
              >
                <Avatar className="w-7 h-7 bg-gradient-orange-pink">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <AvatarFallback className="bg-transparent text-white font-semibold text-xs">
                      {profileData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm font-medium text-white">AlbeWeb</span>
                <Icon name="ChevronDown" size={16} className="text-gray-300" />
              </button>
            )}

            {isAuthenticated && (
              <Button
                onClick={() => setIsCreateFormOpen(true)}
                className="bg-white text-indigo-600 hover:bg-white/90 font-semibold shadow-lg hover:shadow-2xl transition-all duration-200 px-4 h-9 rounded-xl hover:scale-105"
                title="Создать объявление"
              >
                <Icon name="Plus" size={20} className="mr-1.5" />
                Создать
              </Button>
            )}
            </div>
          </div>

        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-lg">
        <div className="text-center py-1 bg-gradient-to-r from-purple-50 to-pink-50">
          <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
            <Icon name="MoveHorizontal" size={12} />
            <span>Свайпайте влево/вправо для переключения</span>
          </p>
        </div>
        <div className={`grid ${isAuthenticated ? 'grid-cols-5' : 'grid-cols-3'} gap-1 p-2`}>
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
            <span className="text-xs mt-1">Все</span>
          </button>
          {isAuthenticated && (
            <>
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                  activeTab === 'favorites' ? 'bg-primary text-white' : 'text-gray-600'
                }`}
              >
                <Icon name="Heart" size={20} />
                <span className="text-xs mt-1">Избранное</span>
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-600'
                }`}
              >
                <Avatar className="w-5 h-5 bg-gradient-orange-pink">
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
            </>
          )}
        </div>
      </div>

      <div className="md:hidden bg-white border-b px-3 py-3">
        <div className="space-y-2">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск объявлений..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
          
          <div className="relative">
            <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={selectedCity || ''}
              onChange={(e) => setSelectedCity(e.target.value || null)}
              className="appearance-none w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-white cursor-pointer"
            >
              <option value="">Все города</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-24 md:pb-8 max-w-6xl">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Найди. Предложи. Обменяй.
          </h1>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-medium">
            Доска объявлений нового поколения — где запросы встречаются с предложениями
          </p>
        </div>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[88px] space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-700 mb-3 px-3">Навигация</h3>
                <Button
                  variant={activeTab === 'requests' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('requests')}
                  className="w-full justify-start font-medium"
                >
                  <Icon name="Search" size={18} className="mr-2" />
                  Запросы
                </Button>
                <Button
                  variant={activeTab === 'offers' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('offers')}
                  className="w-full justify-start font-medium"
                >
                  <Icon name="Package" size={18} className="mr-2" />
                  Предложения
                </Button>
                <div className="pt-2">
                  <div className="relative">
                    <Icon name="MapPin" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                    <select
                      value={selectedCity || ''}
                      onChange={(e) => setSelectedCity(e.target.value || null)}
                      className="appearance-none w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm bg-white cursor-pointer"
                    >
                      <option value="">Все города</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <Icon name="ChevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-700 mb-3 px-3">Категории</h3>
                <Button
                  variant={selectedCategory === null ? 'default' : 'ghost'}
                  onClick={() => setSelectedCategory(null)}
                  className="w-full justify-start"
                >
                  <Icon name="Grid3x3" size={18} className="mr-2" />
                  Все категории
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'default' : 'ghost'}
                    onClick={() => setSelectedCategory(category.name)}
                    className="w-full justify-start"
                  >
                    <Icon name={category.icon as any} size={18} className="mr-2" />
                    {category.name}
                  </Button>
                ))}
              </div>

              <div className="space-y-1 pt-4 border-t">
                <h3 className="text-sm font-bold text-gray-700 mb-3 px-3">Сортировка</h3>
                <Button
                  variant={sortBy === 'date' ? 'default' : 'ghost'}
                  onClick={() => setSortBy('date')}
                  className="w-full justify-start font-medium text-sm"
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  По дате
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'ghost'}
                  onClick={() => setSortBy('popular')}
                  className="w-full justify-start font-medium text-sm"
                >
                  <Icon name="TrendingUp" size={16} className="mr-2" />
                  По популярности
                </Button>
                <Button
                  variant={sortBy === 'price' ? 'default' : 'ghost'}
                  onClick={() => setSortBy('price')}
                  className="w-full justify-start font-medium text-sm"
                >
                  <Icon name="DollarSign" size={16} className="mr-2" />
                  По цене
                </Button>
              </div>
            </div>
          </aside>
          <div className="flex-1 min-w-0 relative">
            {swipeDirection && (
              <div className="md:hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm flex items-center gap-2 pointer-events-none">
                <Icon name={swipeDirection === 'left' ? 'ChevronLeft' : 'ChevronRight'} size={24} />
                <span className="font-semibold">
                  {swipeDirection === 'left' && activeTab === 'requests' && 'Предложения'}
                  {swipeDirection === 'left' && activeTab === 'offers' && isAuthenticated && 'Избранное'}
                  {swipeDirection === 'right' && activeTab === 'offers' && 'Запросы'}
                  {swipeDirection === 'right' && activeTab === 'favorites' && 'Предложения'}
                </span>
                <Icon name={swipeDirection === 'left' ? 'ChevronLeft' : 'ChevronRight'} size={24} />
              </div>
            )}
          {activeTab === 'requests' && (
            <div 
              className="space-y-4 sm:space-y-6 animate-fade-in"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
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

            <div>
              {filteredRequests.map((request, index) => (
                <Card 
                  key={request.id} 
                  className="border border-indigo-100 bg-white rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-sm"
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
                            <Badge variant="outline" className="font-medium text-indigo-700 border-indigo-200 bg-indigo-50 text-xs whitespace-nowrap">
                              <Icon name="MapPin" size={10} className="mr-1" />
                              {request.city}
                            </Badge>
                            {request.delivery && (
                              <Badge variant="outline" className="font-medium text-emerald-700 border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 text-xs whitespace-nowrap">
                                <Icon name="Truck" size={10} className="mr-1" />
                                Доставка
                              </Badge>
                            )}
                            {request.exchange && (
                              <Badge variant="outline" className="font-medium text-violet-700 border-violet-300 bg-gradient-to-r from-violet-50 to-purple-50 text-xs whitespace-nowrap">
                                <Icon name="ArrowLeftRight" size={10} className="mr-1" />
                                Обмен
                              </Badge>
                            )}
                          </div>
                          <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-black whitespace-nowrap flex-shrink-0">
                            {request.budget}
                          </div>
                        </div>
                        <CardTitle className="text-lg sm:text-2xl mb-1">{request.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base line-clamp-2">
                          {request.description}
                        </CardDescription>
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
                              setSelectedUserProfile(mockUserProfiles[request.author]);
                              setIsUserProfileOpen(true);
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
                            size="sm"
                            className={`flex-1 sm:flex-none font-semibold rounded-xl ${favorites.includes(request.id) ? 'text-pink-600 border-pink-300 bg-gradient-to-r from-pink-50 to-rose-50' : 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'}`}
                          >
                            <Icon name="Heart" size={14} className={`sm:mr-1.5 ${favorites.includes(request.id) ? 'fill-primary' : ''}`} />
                            <span className="hidden sm:inline">{favorites.includes(request.id) ? 'В избранном' : 'В избранное'}</span>
                          </Button>
                          <Button 
                            onClick={() => {
                              setSelectedItem(request);
                              setIsViewModalOpen(true);
                            }}
                            variant="outline" 
                            size="sm"
                            className="flex-1 sm:flex-none font-semibold rounded-xl border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
                          >
                            <Icon name="Eye" size={14} className="sm:mr-1.5" />
                            <span className="hidden sm:inline">Смотреть</span>
                          </Button>
                        </div>
                        <Button 
                          onClick={() => {
                            if (!isAuthenticated) {
                              setIsLoginOpen(true);
                            } else {
                              setSelectedItem(request);
                              setIsResponseModalOpen(true);
                            }
                          }}
                          size="sm"
                          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white hover:opacity-90 font-semibold shadow-lg hover:shadow-xl transition-all rounded-xl"
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
          <div 
            className="space-y-4 sm:space-y-6 animate-fade-in"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
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

            <div>
              {filteredOffers.map((offer, index) => (
                <Card 
                  key={offer.id} 
                  className="border border-indigo-100 bg-white rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-sm"
                >
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {offer.photos && offer.photos.length > 0 && (
                        <img 
                          src={offer.photos[0]} 
                          alt={offer.title}
                          className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
                        />
                      )}
                      <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap flex-1 min-w-0">
                            <Badge className={`${
                              offer.category === 'Электроника' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                              offer.category === 'Одежда' ? 'bg-gradient-to-r from-pink-500 to-rose-500' :
                              offer.category === 'Услуги' ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                              offer.category === 'Недвижимость' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                              offer.category === 'Транспорт' ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' :
                              'bg-gradient-to-r from-blue-500 to-purple-500'
                            } text-white border-0 text-xs whitespace-nowrap shadow-md`}>
                              {offer.category}
                            </Badge>
                            <Badge variant="outline" className="font-medium text-indigo-700 border-indigo-200 bg-indigo-50 text-xs whitespace-nowrap">
                              <Icon name="MapPin" size={10} className="mr-1" />
                              {offer.city}
                            </Badge>
                            {offer.delivery && (
                              <Badge variant="outline" className="font-medium text-emerald-700 border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 text-xs whitespace-nowrap">
                                <Icon name="Truck" size={10} className="mr-1" />
                                Доставка
                              </Badge>
                            )}
                            {offer.exchange && (
                              <Badge variant="outline" className="font-medium text-violet-700 border-violet-300 bg-gradient-to-r from-violet-50 to-purple-50 text-xs whitespace-nowrap">
                                <Icon name="ArrowLeftRight" size={10} className="mr-1" />
                                Обмен
                              </Badge>
                            )}
                          </div>
                          <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-black whitespace-nowrap flex-shrink-0">
                            {offer.price}
                          </div>
                        </div>
                        <CardTitle className="text-lg sm:text-2xl mb-1">{offer.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base line-clamp-2">
                          {offer.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                        <div 
                          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {
                            if (mockUserProfiles[offer.author]) {
                              setSelectedUserProfile(mockUserProfiles[offer.author]);
                              setIsUserProfileOpen(true);
                            }
                          }}
                        >
                          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-blue-purple">
                            <AvatarFallback className="bg-transparent text-white font-semibold text-sm">
                              {offer.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-xs sm:text-sm hover:underline">{offer.author}</p>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-xs sm:text-sm text-gray-600">{offer.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Icon name="MessageCircle" size={16} />
                            <span className="text-sm font-medium">{Math.floor(Math.random() * 30) + 5}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Icon name="Eye" size={16} />
                            <span className="text-sm font-medium">{offer.views}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <div className="flex gap-2">
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
                            size="sm"
                            className={`flex-1 sm:flex-none font-semibold ${favorites.includes(offer.id) ? 'text-primary border-primary bg-primary/5' : ''}`}
                          >
                            <Icon name="Heart" size={14} className={`sm:mr-1.5 ${favorites.includes(offer.id) ? 'fill-primary' : ''}`} />
                            <span className="hidden sm:inline">{favorites.includes(offer.id) ? 'В избранном' : 'В избранное'}</span>
                          </Button>
                          <Button 
                            onClick={() => {
                              setSelectedItem(offer);
                              setIsViewModalOpen(true);
                            }}
                            variant="outline" 
                            size="sm"
                            className="flex-1 sm:flex-none font-semibold"
                          >
                            <Icon name="Eye" size={14} className="sm:mr-1.5" />
                            <span className="hidden sm:inline">Смотреть</span>
                          </Button>
                        </div>
                        <Button 
                          onClick={() => {
                            if (!isAuthenticated) {
                              setIsLoginOpen(true);
                            } else {
                              setSelectedItem(offer);
                              setIsResponseModalOpen(true);
                            }
                          }}
                          size="sm"
                          className="w-full sm:w-auto bg-gradient-orange-pink text-white hover:opacity-90 font-semibold"
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
          <div 
            className="space-y-4 sm:space-y-6 animate-fade-in"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
                  <Button onClick={() => setActiveTab('requests')} className="bg-gradient-orange-pink text-white hover:opacity-90">
                    Посмотреть объявления
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3 sm:gap-4">
                {mockRequests.filter(req => favorites.includes(req.id)).map((request, index) => (
                  <Card 
                    key={request.id} 
                    className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3 sm:pb-6">
                      <div className="flex gap-4">
                        {request.photos && request.photos.length > 0 && (
                          <img 
                            src={request.photos[0]} 
                            alt={request.title}
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
                          />
                        )}
                        <div className="flex justify-between items-start flex-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                            <Badge className="bg-gradient-orange-pink text-white border-0 text-xs">
                              {request.category}
                            </Badge>
                            <Badge variant="secondary" className="font-medium text-xs">
                              <Icon name="MapPin" size={10} className="mr-1" />
                              {request.city}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg sm:text-2xl mb-1.5 sm:mb-2">{request.title}</CardTitle>
                          <CardDescription className="text-sm sm:text-base">
                            {request.description}
                          </CardDescription>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-black break-words">
                            {request.budget}
                          </div>
                        </div>
                      </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          onClick={() => {
                            setFavorites(favorites.filter(id => id !== request.id));
                          }}
                          variant="outline" 
                          className="text-muted-foreground border-muted-foreground hover:text-gray-700 hover:border-gray-700 font-semibold text-xs sm:text-sm w-full sm:w-auto"
                        >
                          <Icon name="X" size={14} className="mr-1.5" />
                          <span className="hidden sm:inline">Удалить из избранного</span>
                          <span className="sm:hidden">Удалить</span>
                        </Button>
                        <Button 
                          onClick={() => {
                            setSelectedItem(request);
                            setIsViewModalOpen(true);
                          }}
                          className="bg-gradient-orange-pink text-white hover:opacity-90 font-semibold text-xs sm:text-sm w-full sm:w-auto"
                        >
                          Смотреть
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {mockOffers.filter(offer => favorites.includes(offer.id)).map((offer, index) => (
                  <Card 
                    key={offer.id} 
                    className="hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3 sm:pb-6">
                      <div className="flex gap-4">
                        {offer.photos && offer.photos.length > 0 && (
                          <img 
                            src={offer.photos[0]} 
                            alt={offer.title}
                            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
                          />
                        )}
                        <div className="flex justify-between items-start flex-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 flex-wrap">
                            <Badge className="bg-gradient-purple-pink text-white border-0 text-xs">
                              {offer.category}
                            </Badge>
                            <Badge variant="secondary" className="font-medium text-xs">
                              <Icon name="MapPin" size={10} className="mr-1" />
                              {offer.city}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg sm:text-2xl mb-1.5 sm:mb-2">{offer.title}</CardTitle>
                          <CardDescription className="text-sm sm:text-base">
                            {offer.description}
                          </CardDescription>
                        </div>
                        <div className="ml-3 sm:ml-4">
                          <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-black break-words">
                            {offer.price}
                          </div>
                        </div>
                      </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button 
                          onClick={() => {
                            setFavorites(favorites.filter(id => id !== offer.id));
                          }}
                          variant="outline" 
                          className="text-muted-foreground border-muted-foreground hover:text-gray-700 hover:border-gray-700 font-semibold text-xs sm:text-sm w-full sm:w-auto"
                        >
                          <Icon name="X" size={14} className="mr-1.5" />
                          <span className="hidden sm:inline">Удалить из избранного</span>
                          <span className="sm:hidden">Удалить</span>
                        </Button>
                        <Button 
                          onClick={() => {
                            setSelectedItem(offer);
                            setIsViewModalOpen(true);
                          }}
                          className="bg-gradient-orange-pink text-white hover:opacity-90 font-semibold text-xs sm:text-sm w-full sm:w-auto"
                        >
                          Смотреть
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}



        {activeTab === 'profile' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 bg-gradient-orange-pink">
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
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-orange-pink flex items-center justify-center">
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
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {categories.map(cat => (
                  <li key={cat.name}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setActiveTab('requests');
                      }} 
                      className="hover:text-white transition-colors text-left"
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
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                  <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                  <a href="#" className="hover:text-white transition-colors">Условия использования</a>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <span>Разработано в</span>
                  <a 
                    href="https://albeweb.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="https://cdn.poehali.dev/files/0a180c27-7df9-40c0-a8e1-bcea0325f94b.png" 
                      alt="Albeweb" 
                      className="h-4"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4">
          <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl w-full max-w-5xl h-full sm:h-[90vh] sm:max-h-[600px] flex animate-scale-in overflow-hidden">
            <div className="hidden sm:flex w-full sm:w-80 bg-gray-50 border-r flex-col">
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
                      <div 
                        className="relative cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dialog.type !== 'support' && mockUserProfiles[dialog.name]) {
                            setSelectedUserProfile(mockUserProfiles[dialog.name]);
                            setIsUserProfileOpen(true);
                          }
                        }}
                      >
                        <Avatar className="w-12 h-12 bg-gradient-orange-pink hover:opacity-80 transition-opacity">
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
                          <h4 
                            className={`font-semibold text-sm text-gray-800 truncate ${dialog.type !== 'support' ? 'hover:underline cursor-pointer' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (dialog.type !== 'support' && mockUserProfiles[dialog.name]) {
                                setSelectedUserProfile(mockUserProfiles[dialog.name]);
                                setIsUserProfileOpen(true);
                              }
                            }}
                          >{dialog.name}</h4>
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

            <div className="flex-1 flex flex-col w-full">
              {currentDialog && (
                <>
                  <div className={`${
                    currentDialog.type === 'support' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gradient-orange-pink'
                  } text-white p-4 flex items-center justify-between`}>
                    <div 
                      className={`flex items-center space-x-3 ${currentDialog.type !== 'support' ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                      onClick={() => {
                        if (currentDialog.type !== 'support' && mockUserProfiles[currentDialog.name]) {
                          setSelectedUserProfile(mockUserProfiles[currentDialog.name]);
                          setIsUserProfileOpen(true);
                        }
                      }}
                    >
                      <Avatar className="w-10 h-10 bg-white/20">
                        <AvatarFallback className="bg-transparent text-white font-bold">
                          {currentDialog.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className={`font-bold text-lg ${currentDialog.type !== 'support' ? 'hover:underline' : ''}`}>{currentDialog.name}</h3>
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
                    {currentDialog.relatedItem && (
                      <div 
                        onClick={() => {
                          setSelectedItem(currentDialog.relatedItem!);
                          setIsViewModalOpen(true);
                        }}
                        className="mb-4 bg-white rounded-xl border-2 border-primary/20 p-4 shadow-sm cursor-pointer hover:border-primary/40 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Info" size={16} className="text-primary" />
                          <p className="text-xs font-semibold text-gray-600">Обсуждаемое объявление</p>
                        </div>
                        <div className="flex gap-3">
                          {'photos' in currentDialog.relatedItem && currentDialog.relatedItem.photos && currentDialog.relatedItem.photos.length > 0 && (
                            <img 
                              src={currentDialog.relatedItem.photos[0]} 
                              alt={currentDialog.relatedItem.title}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-gray-800 mb-1 line-clamp-1">{currentDialog.relatedItem.title}</h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{currentDialog.relatedItem.description}</p>
                            <div className="flex items-center justify-between">
                              <Badge className="bg-gradient-orange-pink text-white border-0 text-xs">
                                {currentDialog.relatedItem.category}
                              </Badge>
                              <p className="text-sm font-bold text-black">
                                {'budget' in currentDialog.relatedItem ? currentDialog.relatedItem.budget : currentDialog.relatedItem.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {currentDialog.messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] sm:max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                          <div className={`rounded-2xl px-4 py-2 ${
                            msg.sender === 'me' 
                              ? 'bg-gradient-orange-pink text-white' 
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
                        className="bg-gradient-orange-pink text-white hover:opacity-90 px-4 py-2 rounded-xl"
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
            <div className="sticky top-0 bg-gradient-orange-pink text-white p-4 sm:p-6 rounded-t-2xl flex items-center justify-between z-10">
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
                  className="flex-1 bg-gradient-orange-pink text-white hover:opacity-90 py-3 text-base font-semibold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-orange-pink text-white p-4 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold">Оставить отзыв</h2>
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
                  className="flex-1 bg-gradient-orange-pink text-white hover:opacity-90 py-3 text-base font-semibold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] sm:max-h-[600px] flex flex-col animate-scale-in">
            <div className="bg-gradient-orange-pink text-white p-4 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Уведомления</h2>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-orange-pink text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
              <h2 className="text-xl sm:text-2xl font-bold">Вход</h2>
              <p className="text-white/80 text-sm mt-1">Войдите в свой аккаунт</p>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
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
                  className="flex-1 bg-gradient-orange-pink text-white hover:opacity-90"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-orange-pink text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
              <h2 className="text-xl sm:text-2xl font-bold">Регистрация</h2>
              <p className="text-white/80 text-sm mt-1">Создайте новый аккаунт</p>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
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
                  className="flex-1 bg-gradient-orange-pink text-white hover:opacity-90"
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
            <div className="bg-gradient-orange-pink text-white p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold">Редактирование профиля</h2>
              <button onClick={() => setIsProfileEditOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Фото профиля</label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 bg-gradient-orange-pink">
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
                  className="flex-1 bg-gradient-orange-pink text-white hover:opacity-90"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="sticky top-0 bg-gradient-orange-pink text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between z-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">{selectedItem.title}</h2>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedItem(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {'photos' in selectedItem && selectedItem.photos && selectedItem.photos.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Фотографии</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedItem.photos.map((photo, idx) => (
                      <img 
                        key={idx}
                        src={photo} 
                        alt={`${selectedItem.title} ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Описание</h3>
                <p className="text-gray-600">{'description' in selectedItem && selectedItem.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">{'budget' in selectedItem ? 'Бюджет' : 'Цена'}</h3>
                  <p className="text-lg sm:text-xl font-bold text-primary break-words">{'budget' in selectedItem ? selectedItem.budget : 'price' in selectedItem ? selectedItem.price : ''}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-1">Город</h3>
                  <p className="text-base sm:text-lg font-medium text-gray-800">{selectedItem.city}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Автор</h3>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div 
                    className="flex items-center space-x-4 flex-1 cursor-pointer hover:bg-gray-100 -m-4 p-4 rounded-xl transition-colors"
                    onClick={() => {
                      if (mockUserProfiles[selectedItem.author]) {
                        setSelectedUserProfile(mockUserProfiles[selectedItem.author]);
                        setIsUserProfileOpen(true);
                      }
                    }}
                  >
                    <Avatar className="w-16 h-16 bg-gradient-orange-pink">
                      <AvatarFallback className="bg-transparent text-white text-xl font-bold">
                        {selectedItem.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-800 hover:underline">{selectedItem.author}</p>
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-600">Рейтинг: {selectedItem.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      if (!isAuthenticated) {
                        setIsViewModalOpen(false);
                        setIsLoginOpen(true);
                      } else {
                        setIsChatOpen(true);
                        setIsViewModalOpen(false);
                      }
                    }}
                    className="bg-gradient-orange-pink text-white hover:opacity-90"
                  >
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-gradient-orange-pink text-white border-0">
                  {selectedItem.category}
                </Badge>
                {selectedItem.delivery && (
                  <Badge variant="outline" className="font-medium text-green-600 border-green-300 bg-green-50">
                    <Icon name="Truck" size={14} className="mr-1" />
                    Доставка
                  </Badge>
                )}
                {selectedItem.exchange && (
                  <Badge variant="outline" className="font-medium text-blue-600 border-blue-300 bg-blue-50">
                    <Icon name="ArrowLeftRight" size={14} className="mr-1" />
                    Обмен
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isResponseModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md animate-scale-in">
            <div className="bg-gradient-orange-pink text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold">Откликнуться</h2>
              <button 
                onClick={() => {
                  setIsResponseModalOpen(false);
                  setSelectedItem(null);
                  setResponseData({ price: '', comment: '' });
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-4">Откликаетесь на: <span className="font-bold text-gray-800 break-words">{selectedItem.title}</span></p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ваша цена</label>
                <input
                  type="text"
                  value={responseData.price}
                  onChange={(e) => setResponseData({ ...responseData, price: e.target.value })}
                  placeholder="Например: 100 000 ₽"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Комментарий</label>
                <textarea
                  value={responseData.comment}
                  onChange={(e) => setResponseData({ ...responseData, comment: e.target.value })}
                  placeholder="Расскажите подробнее о вашем предложении..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => {
                    setIsResponseModalOpen(false);
                    setSelectedItem(null);
                    setResponseData({ price: '', comment: '' });
                  }}
                  variant="outline" 
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button 
                  onClick={() => {
                    alert(`Отклик отправлен!\nЦена: ${responseData.price}\nКомментарий: ${responseData.comment}`);
                    setIsResponseModalOpen(false);
                    setSelectedItem(null);
                    setResponseData({ price: '', comment: '' });
                  }}
                  className="flex-1 bg-gradient-orange-pink text-white hover:opacity-90"
                >
                  Отправить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4">
          <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl w-full max-w-2xl h-full sm:h-[90vh] sm:max-h-[600px] flex flex-col animate-scale-in">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-none sm:rounded-t-2xl flex items-center justify-between">
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
                  <div className={`max-w-[85%] sm:max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-orange-pink text-white' 
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

      {isUserProfileOpen && selectedUserProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-gradient-orange-pink text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between sticky top-0 z-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Профиль пользователя</h2>
              <button 
                onClick={() => {
                  setIsUserProfileOpen(false);
                  setSelectedUserProfile(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-orange-pink flex-shrink-0">
                  <AvatarFallback className="bg-transparent text-white text-2xl sm:text-3xl font-bold">
                    {selectedUserProfile.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedUserProfile.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Star" size={20} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-lg sm:text-xl font-bold text-gray-800">{selectedUserProfile.rating}</span>
                    <span className="text-gray-600">({selectedUserProfile.reviewsCount} отзывов)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="MapPin" size={18} className="text-primary" />
                      <span>{selectedUserProfile.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="Calendar" size={18} className="text-primary" />
                      <span>На сайте с {selectedUserProfile.registeredDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 mb-4">
                    <Icon name="CheckCircle2" size={18} className="text-green-600" />
                    <span className="font-semibold">{selectedUserProfile.completedDeals} успешных сделок</span>
                  </div>
                  <p className="text-gray-700">{selectedUserProfile.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="List" size={24} className="text-primary" />
                  История объявлений
                </h3>
                <div className="space-y-3">
                  {selectedUserProfile.requests.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Запросы ({selectedUserProfile.requests.length})</h4>
                      {selectedUserProfile.requests.map(request => (
                        <Card key={request.id} className="mb-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                          setSelectedItem(request);
                          setIsViewModalOpen(true);
                          setIsUserProfileOpen(false);
                        }}>
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg">{request.title}</CardTitle>
                                <CardDescription className="mt-1">{request.description}</CardDescription>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-xl font-bold text-primary">{request.budget}</div>
                                <Badge className="mt-1 text-xs">{request.category}</Badge>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                  {selectedUserProfile.offers.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Предложения ({selectedUserProfile.offers.length})</h4>
                      {selectedUserProfile.offers.map(offer => (
                        <Card key={offer.id} className="mb-3 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                          setSelectedItem(offer);
                          setIsViewModalOpen(true);
                          setIsUserProfileOpen(false);
                        }}>
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg">{offer.title}</CardTitle>
                                <CardDescription className="mt-1">{offer.description}</CardDescription>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-xl font-bold text-primary">{offer.price}</div>
                                <Badge className="mt-1 text-xs">{offer.category}</Badge>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                  {selectedUserProfile.requests.length === 0 && selectedUserProfile.offers.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Нет размещенных объявлений</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} className="text-primary" />
                  Отзывы ({selectedUserProfile.reviews.length})
                </h3>
                <div className="space-y-4">
                  {selectedUserProfile.reviews.map(review => (
                    <div key={review.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 bg-gradient-purple-pink">
                            <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                              {review.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800">{review.author}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-gray-800">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                  {selectedUserProfile.reviews.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Пока нет отзывов</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-orange-pink text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-40 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <Icon name="HelpCircle" size={28} />
      </button>
    </div>
  );
};

export default Index;