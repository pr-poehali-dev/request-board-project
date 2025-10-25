import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Request, Offer } from '@/types';
import { CITIES, CATEGORIES } from '@/constants/data';

const cities = CITIES;
const categories = CATEGORIES;


const mockRequests: Request[] = [
  { id: 1, title: 'Ищу iPhone 15 Pro', category: 'Электроника', budget: 'до 120 000 ₽', author: 'Александр', rating: 4.8, responses: 12, description: 'Нужен iPhone 15 Pro в хорошем состоянии, желательно с гарантией', city: 'Москва', delivery: true, exchange: true, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 2, title: 'Куплю MacBook Air M2', category: 'Электроника', budget: 'до 90 000 ₽', author: 'Дмитрий', rating: 4.7, responses: 15, description: 'Интересует MacBook Air на M2, новый или б/у в отличном состоянии', city: 'Казань', delivery: true, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 3, title: 'Ищу AirPods Pro 2', category: 'Электроника', budget: 'до 20 000 ₽', author: 'Игорь', rating: 4.6, responses: 8, description: 'Нужны наушники AirPods Pro 2 поколения', city: 'Москва', delivery: true, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  
  { id: 4, title: 'Требуется мастер по ремонту', category: 'Услуги', budget: 'договорная', author: 'Мария', rating: 4.9, responses: 8, description: 'Ремонт квартиры, необходим опытный специалист', city: 'Санкт-Петербург', delivery: false, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 5, title: 'Ищу репетитора английского', category: 'Услуги', budget: '1500 ₽/час', author: 'Елена', rating: 5.0, responses: 23, description: 'Нужен репетитор для подготовки к IELTS, уровень Intermediate', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 6, title: 'Нужен веб-разработчик', category: 'Услуги', budget: 'от 50 000 ₽', author: 'Артем', rating: 4.8, responses: 18, description: 'Разработка сайта для стартапа', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  
  { id: 7, title: 'Куплю пальто зимнее', category: 'Одежда', budget: 'до 15 000 ₽', author: 'Светлана', rating: 4.5, responses: 6, description: 'Ищу женское зимнее пальто, размер 44-46', city: 'Санкт-Петербург', delivery: true, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 8, title: 'Ищу кроссовки Nike', category: 'Одежда', budget: 'до 8 000 ₽', author: 'Роман', rating: 4.7, responses: 11, description: 'Нужны кроссовки Nike, размер 42', city: 'Москва', delivery: true, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  
  { id: 9, title: 'Сниму квартиру 2-комн', category: 'Недвижимость', budget: 'до 50 000 ₽/мес', author: 'Андрей', rating: 4.9, responses: 14, description: 'Ищу 2-комнатную квартиру в центре', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 10, title: 'Куплю участок под дачу', category: 'Недвижимость', budget: 'до 1 500 000 ₽', author: 'Владимир', rating: 4.6, responses: 9, description: 'Ищу земельный участок 6-10 соток', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  
  { id: 11, title: 'Куплю BMW 3 series', category: 'Транспорт', budget: 'до 2 000 000 ₽', author: 'Сергей', rating: 4.8, responses: 16, description: 'Ищу BMW 3 series в хорошем состоянии', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] },
  { id: 12, title: 'Нужен самокат', category: 'Транспорт', budget: 'до 15 000 ₽', author: 'Денис', rating: 4.5, responses: 7, description: 'Электросамокат для города', city: 'Санкт-Петербург', delivery: true, photos: ['https://cdn.poehali.dev/files/e635c0dc-edea-447d-ba7f-f02d1ec89bc8.png'] }
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
    offers: [],
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

const getCategoryGradient = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Электроника': 'bg-gradient-to-r from-blue-500 to-indigo-600',
    'Одежда': 'bg-gradient-to-r from-pink-500 to-rose-500',
    'Услуги': 'bg-gradient-to-r from-orange-500 to-yellow-500',
    'Недвижимость': 'bg-gradient-to-r from-emerald-500 to-teal-500',
    'Транспорт': 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
    'Мебель': 'bg-gradient-to-r from-amber-600 to-red-600',
    'Детские товары': 'bg-gradient-to-r from-sky-400 to-blue-400',
    'Спорт': 'bg-gradient-to-r from-lime-500 to-emerald-600',
    'Красота': 'bg-gradient-to-r from-fuchsia-500 to-rose-500',
    'Животные': 'bg-gradient-to-r from-amber-500 to-amber-600',
    'Хобби': 'bg-gradient-to-r from-indigo-500 to-pink-500',
    'Книги': 'bg-gradient-to-r from-slate-600 to-zinc-600',
    'Строительство': 'bg-gradient-to-r from-yellow-600 to-red-600',
    'Работа': 'bg-gradient-to-r from-cyan-600 to-indigo-700',
    'Еда и напитки': 'bg-gradient-to-r from-rose-500 to-orange-500',
  };
  return colorMap[category] || 'bg-gradient-to-r from-blue-500 to-purple-500';
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Электроника': 'bg-blue-600',
    'Одежда': 'bg-pink-600',
    'Услуги': 'bg-orange-600',
    'Недвижимость': 'bg-emerald-600',
    'Транспорт': 'bg-purple-600',
    'Мебель': 'bg-amber-600',
    'Детские товары': 'bg-sky-500',
    'Спорт': 'bg-green-600',
    'Красота': 'bg-fuchsia-600',
    'Животные': 'bg-yellow-600',
    'Хобби': 'bg-indigo-600',
    'Книги': 'bg-slate-600',
    'Строительство': 'bg-yellow-700',
    'Работа': 'bg-cyan-600',
    'Еда и напитки': 'bg-rose-600'
  };
  return colors[category] || 'bg-violet-600';
};

interface RequestCardProps {
  request: Request;
  index: number;
  contentTopRef: React.RefObject<HTMLDivElement> | null;
  isAuthenticated: boolean;
  onViewClick: () => void;
  onResponseClick: () => void;
  onAuthorClick: () => void;
}

const RequestCard = ({ 
  request, 
  index, 
  contentTopRef, 
  isAuthenticated, 
  onViewClick, 
  onResponseClick,
  onAuthorClick 
}: RequestCardProps) => {
  return (
    <Card 
      key={request.id}
      ref={index === 0 ? contentTopRef : null}
      className="border border-purple-100 bg-white rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-sm hover:shadow-2xl hover:scale-[1.03] hover:border-purple-300 hover:-translate-y-1 transition-all duration-300"
    >
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {request.photos && request.photos.length > 0 && (
            <img 
              src={request.photos[0]} 
              alt={request.title}
              className="w-full h-48 sm:w-32 sm:h-32 object-contain rounded-xl flex-shrink-0 bg-white"
            />
          )}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap flex-1 min-w-0">
                <Badge className={`${getCategoryColor(request.category)} text-white border-0 text-xs whitespace-nowrap shadow-md`}>
                  {request.category}
                </Badge>
                <Badge variant="outline" className="font-medium text-gray-700 border-gray-200 bg-gray-50 text-xs whitespace-nowrap">
                  <Icon name="MapPin" size={10} className="mr-1" />
                  {request.city}
                </Badge>
                {request.delivery && (
                  <Badge variant="outline" className="font-medium text-green-700 border-green-300 bg-green-50 text-xs whitespace-nowrap">
                    <Icon name="Truck" size={10} className="mr-1" />
                    Доставка
                  </Badge>
                )}
                {request.exchange && (
                  <Badge variant="outline" className="font-medium text-blue-700 border-blue-300 bg-blue-50 text-xs whitespace-nowrap">
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
              onClick={onAuthorClick}
            >
              <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 ring-2 ring-purple-200">
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
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Icon name="MessageCircle" size={16} className="text-purple-600" />
                <span className="text-sm font-bold text-purple-700">{request.responses}</span>
                <span className="text-xs text-purple-600 font-medium">откликов</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Icon name="Eye" size={16} />
                <span className="text-sm font-medium">{Math.floor(Math.random() * 500) + 100}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              onClick={onViewClick}
              variant="outline" 
              size="sm"
              className="flex-1 sm:flex-none font-semibold rounded-xl border-gray-300 hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300"
            >
              <Icon name="Eye" size={14} className="sm:mr-1.5" />
              <span className="hidden sm:inline">Смотреть</span>
            </Button>
            <Button 
              onClick={onResponseClick}
              size="sm"
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              Откликнуться
              <Icon name="Send" size={14} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Request | Offer | null>(null);
  const [responseData, setResponseData] = useState({ price: '', comment: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ email: '', password: '', name: '' });
  const [profileData, setProfileData] = useState({ name: 'Александр', email: 'user@example.com', currentPassword: '', newPassword: '', avatar: '' });
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSortOpen, setIsSortOpen] = useState(true);
  const contentTopRef = useRef<HTMLDivElement>(null);
  const prevActiveTab = useRef(activeTab);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFeed = () => {
    const feedElement = document.getElementById('feed-start');
    if (feedElement) {
      const offsetTop = feedElement.offsetTop - 20;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<number>(1);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [filterDelivery, setFilterDelivery] = useState(false);
  const [filterExchange, setFilterExchange] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'price'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [hoveredSort, setHoveredSort] = useState<string | null>(null);
  const [sortMenuPosition, setSortMenuPosition] = useState({ top: 0, left: 0 });
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
    }
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
    const matchesSearch = searchQuery ? 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Город работает всегда, независимо от других фильтров
    const matchesCity = selectedCity ? req.city === selectedCity : true;
    const matchesDelivery = filterDelivery ? req.delivery === true : true;
    const matchesExchange = filterExchange ? req.exchange === true : true;
    
    // Если есть поиск, игнорируем фильтры категорий, но учитываем город, доставку и обмен
    if (searchQuery) {
      return matchesSearch && matchesCity && matchesDelivery && matchesExchange;
    }
    
    // Иначе применяем все фильтры
    const matchesCategory = selectedCategory ? req.category === selectedCategory : true;
    return matchesCategory && matchesCity && matchesDelivery && matchesExchange;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'desc' ? b.id - a.id : a.id - b.id;
    } else if (sortBy === 'popular') {
      return sortDirection === 'desc' ? b.responses - a.responses : a.responses - b.responses;
    } else if (sortBy === 'price') {
      const priceA = parseInt(a.budget.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.budget.replace(/[^0-9]/g, '')) || 0;
      return sortDirection === 'desc' ? priceB - priceA : priceA - priceB;
    }
    return 0;
  });



  const getCategoryCount = (categoryName: string) => {
    const requestCount = mockRequests.filter(req => req.category === categoryName).length;
    return requestCount;
  };

  const getAllListingsCount = () => {
    return mockRequests.length;
  };

  const popularCategories = categories.filter(c => c.popular);

  const getCategoryStats = (categoryName: string) => {
    const requestCount = mockRequests.filter(r => r.category === categoryName).length;
    return { requestCount, offerCount: 0, total: requestCount };
  };

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
    
    // Swipe navigation removed
    
    setSwipeDirection(null);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const createChatMessage = (text: string, messagesLength: number): ChatMessage => ({
    id: messagesLength + 1,
    text,
    sender: 'me',
    timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    author: 'Вы'
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentDialog) return;
    
    const message = createChatMessage(newMessage, currentDialog.messages.length);
    const updatedDialogs = dialogs.map(d => 
      d.id === selectedDialog 
        ? { ...d, messages: [...d.messages, message], lastMessage: newMessage, lastTime: 'только что' }
        : d
    );
    
    setDialogs(updatedDialogs);
    setNewMessage('');
  };

  const handleSendSupportMessage = () => {
    if (!newMessage.trim()) return;
    
    const msg = createChatMessage(newMessage, supportMessages.length);
    setSupportMessages([...supportMessages, msg]);
    setNewMessage('');
  };

  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentDialog?.messages, isChatOpen]);



  useEffect(() => {
    // При переключении вкладок сбрасываем только фильтры категорий, но НЕ поиск и НЕ город
    if (prevActiveTab.current !== activeTab) {
      setSelectedCategory(null);
      prevActiveTab.current = activeTab;
    }
  }, [activeTab]);

  useEffect(() => {
    // При смене категории сбрасываем строку поиска
    if (selectedCategory) {
      setSearchQuery('');
    }
  }, [selectedCategory]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="relative z-0">
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-700/50 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8" style={{ maxWidth: '1400px' }}>
          <div className="flex justify-between items-center h-14 sm:h-16 gap-4">
            <button 
              onClick={() => setActiveTab('requests')}
              className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/d2f7801c-af44-4162-850f-93d100ad17ae.jpg" 
                alt="Логотип"
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl shadow-lg ring-2 ring-white/30"
              />
              <span className="text-lg sm:text-2xl font-bold text-white">Доска запросов</span>
            </button>

            <div className="hidden md:flex flex-1 max-w-2xl items-center gap-3">
              <div className="relative flex-1">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск запросов..."
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
              
              <div className="relative w-48 flex-shrink-0">
                <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                <select
                  value={selectedCity || ''}
                  onChange={(e) => setSelectedCity(e.target.value || null)}
                  className="w-full appearance-none pl-9 pr-8 py-2 border border-white/30 bg-white/10 backdrop-blur-md text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-sm cursor-pointer"
                  style={{
                    backgroundImage: 'none'
                  }}
                >
                  <option value="" className="bg-gray-800">Все города</option>
                  {cities.map((city) => (
                    <option key={city} value={city} className="bg-gray-800">
                      {city}
                    </option>
                  ))}
                </select>
                <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0">
            {isAuthenticated && (
              <div className="flex items-center space-x-1 text-white">
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
                  {dialogs.filter(d => d.unread > 0).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {dialogs.reduce((sum, d) => sum + d.unread, 0)}
                    </span>
                  )}
                </button>
              </div>
            )}

            {!isAuthenticated ? (
              <Button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm px-6 h-9 shadow-lg hover:shadow-xl transition-all"
              >
                Войти
              </Button>
            ) : (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                title="Профиль"
              >
                <Avatar className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600">
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-sm px-6 h-9 shadow-lg hover:shadow-xl transition-all"
                title="Создать запрос"
              >
                <Icon name="Search" size={18} className="mr-1.5" />
                Создать запрос
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
        <div className={`grid ${isAuthenticated ? 'grid-cols-3' : 'grid-cols-2'} gap-1 p-2`}>
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
            onClick={() => setActiveTab('categories')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeTab === 'categories' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            <Icon name="FolderOpen" size={20} />
            <span className="text-xs mt-1">Все</span>
          </button>
          {isAuthenticated && (
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors text-gray-600"
            >
              <Avatar className="w-5 h-5 bg-gradient-to-br from-purple-600 to-pink-600">
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
          
          <div className="relative max-w-[200px]">
            <Icon name="MapPin" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={selectedCity || ''}
              onChange={(e) => setSelectedCity(e.target.value || null)}
              className="appearance-none w-full pl-8 pr-8 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-white cursor-pointer"
            >
              <option value="">Все города</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <Icon name="ChevronDown" size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white/60 to-gray-50/80 backdrop-blur-sm py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Найди. Предложи. Обменяй.
          </h1>
          <p className="text-sm sm:text-base text-black max-w-2xl mx-auto font-medium">
            Доска объявлений нового поколения — где запросы встречаются с предложениями
          </p>
        </div>
        

      </div>
      


      <main id="feed-start" className="container mx-auto px-3 sm:px-6 lg:px-8 pb-24 md:pb-8 pt-12" style={{ maxWidth: '1400px' }}>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0 relative">
            <div className="sticky top-20 space-y-3 relative z-10">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Тип</h3>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeTab === 'requests' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="Search" size={16} className="inline mr-2" />
                    Запросы
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Сортировка</h3>
                <div className="space-y-1.5">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        const menuElement = e.currentTarget;
                        if (menuElement) {
                          const menuRect = menuElement.getBoundingClientRect();
                          const viewportHeight = window.innerHeight;
                          setSortMenuPosition({
                            top: viewportHeight / 2 - 160,
                            left: menuRect.right + 8
                          });
                        }
                        if (hoveredSort === 'price') {
                          setHoveredSort(null);
                        } else {
                          setHoveredSort('price');
                        }
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-left flex items-center justify-between ${
                        sortBy === 'price' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>
                        <Icon name="DollarSign" size={14} className="inline mr-2" />
                        По цене
                      </span>
                      <Icon name="ChevronRight" size={14} className="opacity-50" />
                    </button>
                    
                    {hoveredSort === 'price' && (
                      <>
                        <div 
                          className="fixed inset-0 z-[99998]"
                          onClick={() => setHoveredSort(null)}
                        />
                        <div 
                          className="fixed w-64 bg-white rounded-xl shadow-2xl border-2 border-purple-200 p-4 z-[99999] animate-in slide-in-from-left-2 duration-200"
                          style={{ 
                            top: `${sortMenuPosition.top}px`,
                            left: `${sortMenuPosition.left}px`
                          }}
                        >
                          <h4 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                            <Icon name="DollarSign" size={14} />
                            Сортировка по цене
                          </h4>
                          <div className="space-y-1">
                            <button
                              onClick={() => {
                                setSortBy('price');
                                setSortDirection('desc');
                                setHoveredSort(null);
                                scrollToTop();
                              }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                                sortBy === 'price' && sortDirection === 'desc'
                                  ? 'bg-purple-600 text-white shadow-md'
                                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                              }`}
                            >
                              От большей к меньшей
                            </button>
                            <button
                              onClick={() => {
                                setSortBy('price');
                                setSortDirection('asc');
                                setHoveredSort(null);
                                scrollToTop();
                              }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                                sortBy === 'price' && sortDirection === 'asc'
                                  ? 'bg-purple-600 text-white shadow-md'
                                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                              }`}
                            >
                              От меньшей к большей
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        const menuElement = e.currentTarget;
                        if (menuElement) {
                          const menuRect = menuElement.getBoundingClientRect();
                          const viewportHeight = window.innerHeight;
                          setSortMenuPosition({
                            top: viewportHeight / 2 - 160,
                            left: menuRect.right + 8
                          });
                        }
                        if (hoveredSort === 'date') {
                          setHoveredSort(null);
                        } else {
                          setHoveredSort('date');
                        }
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-left flex items-center justify-between ${
                        sortBy === 'date' 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>
                        <Icon name="Calendar" size={14} className="inline mr-2" />
                        По дате
                      </span>
                      <Icon name="ChevronRight" size={14} className="opacity-50" />
                    </button>
                    
                    {hoveredSort === 'date' && (
                      <>
                        <div 
                          className="fixed inset-0 z-[99998]"
                          onClick={() => setHoveredSort(null)}
                        />
                        <div 
                          className="fixed w-64 bg-white rounded-xl shadow-2xl border-2 border-purple-200 p-4 z-[99999] animate-in slide-in-from-left-2 duration-200"
                          style={{ 
                            top: `${sortMenuPosition.top}px`,
                            left: `${sortMenuPosition.left}px`
                          }}
                        >
                          <h4 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                            <Icon name="Calendar" size={14} />
                            Сортировка по дате
                          </h4>
                          <div className="space-y-1">
                            <button
                              onClick={() => {
                                setSortBy('date');
                                setSortDirection('desc');
                                setHoveredSort(null);
                                scrollToTop();
                              }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                                sortBy === 'date' && sortDirection === 'desc'
                                  ? 'bg-purple-600 text-white shadow-md'
                                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                              }`}
                            >
                              От нового к старому
                            </button>
                            <button
                              onClick={() => {
                                setSortBy('date');
                                setSortDirection('asc');
                                setHoveredSort(null);
                                scrollToTop();
                              }}
                              className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                                sortBy === 'date' && sortDirection === 'asc'
                                  ? 'bg-purple-600 text-white shadow-md'
                                  : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                              }`}
                            >
                              От старого к новому
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSortBy('popular');
                      setSortDirection('desc');
                      scrollToTop();
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      sortBy === 'popular' 
                        ? 'bg-purple-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="TrendingUp" size={14} className="inline mr-2" />
                    По популярности
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3" id="categories-menu">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Категории</h3>
                <div className="space-y-1 max-h-[320px] overflow-y-auto scrollbar-thin">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      scrollToFeed();
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      selectedCategory === null 
                        ? 'bg-gray-800 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="Grid3x3" size={14} className="inline mr-2" />
                    Все категории
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        scrollToFeed();
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors text-left ${
                        selectedCategory === category.name 
                          ? `${getCategoryColor(category.name)} text-white shadow-md` 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon name={category.icon as any} size={14} className="inline mr-2" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Дополнительно</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filterDelivery}
                      onChange={(e) => {
                        setFilterDelivery(e.target.checked);
                        scrollToFeed();
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors flex items-center gap-1.5">
                      <Icon name="Truck" size={14} />
                      Доставка
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filterExchange}
                      onChange={(e) => {
                        setFilterExchange(e.target.checked);
                        scrollToFeed();
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <Icon name="ArrowLeftRight" size={14} />
                      Возможен обмен
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedCity(null);
                  setFilterDelivery(false);
                  setFilterExchange(false);
                  setSortBy('date');
                  setSortDirection('desc');
                  scrollToFeed();
                }}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2 px-3 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
              >
                <Icon name="X" size={16} className="inline mr-2" />
                Сбросить фильтры
              </button>
            </div>
          </aside>
          <div className="flex-1 min-w-0 relative z-0">
            {swipeDirection && (
              <div className="md:hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm flex items-center gap-2 pointer-events-none">
                <Icon name={swipeDirection === 'left' ? 'ChevronLeft' : 'ChevronRight'} size={24} />
                <span className="font-semibold">
                  {swipeDirection === 'left' && activeTab === 'requests' && 'Категории'}
                  {swipeDirection === 'right' && activeTab === 'categories' && 'Запросы'}
                </span>
                <Icon name={swipeDirection === 'left' ? 'ChevronLeft' : 'ChevronRight'} size={24} />
              </div>
            )}
          {activeTab === 'requests' && (
            <div 
              className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4">
              Запросы
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(null);
                  scrollToFeed();
                }}
                className="whitespace-nowrap font-medium text-sm"
              >
                Все
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    scrollToFeed();
                  }}
                  className="whitespace-nowrap font-medium text-sm"
                >
                  <Icon name={category.icon as any} size={14} className="mr-1.5" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div>
              {filteredRequests.length === 0 ? (
                <Card className="max-w-2xl mx-auto my-8">
                  <CardContent className="p-8 sm:p-12 text-center">
                    <Icon name="SearchX" size={64} className="mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">По вашему запросу ничего не найдено</h3>
                    <p className="text-gray-600 mb-6">Попробуйте изменить поисковый запрос, выбрать другой город или сбросить все фильтры</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                        setSelectedSubcategory(null);
                        setSelectedCity(null);
                        setFilterDelivery(false);
                        setFilterExchange(false);
                        scrollToTop();
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 font-semibold"
                    >
                      <Icon name="RefreshCw" size={18} className="mr-2" />
                      Сбросить все фильтры
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {filteredRequests.map((request, index) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  index={index}
                  contentTopRef={contentTopRef}
                  isAuthenticated={isAuthenticated}
                  onViewClick={() => {
                    setSelectedItem(request);
                    setIsViewModalOpen(true);
                  }}
                  onResponseClick={() => {
                    if (!isAuthenticated) {
                      setIsLoginOpen(true);
                    } else {
                      setSelectedItem(request);
                      setIsResponseModalOpen(true);
                    }
                  }}
                  onAuthorClick={() => {
                    if (mockUserProfiles[request.author]) {
                      setSelectedUserProfile(mockUserProfiles[request.author]);
                      setIsUserProfileOpen(true);
                    }
                  }}
                />
              ))}
                </>
              )}
            </div>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
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
                        scrollToFeed();
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
              <p className="text-xs sm:text-sm text-gray-400">© 2025 Доска запросов. Все права защищены.</p>
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
                      src="https://cdn.poehali.dev/files/38354c02-a50d-4c8a-be42-53e5ca23cbfd.png" 
                      alt="Albeweb" 
                      className="h-12"
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
                        ? 'bg-blue-50 border-l-4 border-l-blue-600'
                        : selectedDialog === dialog.id 
                          ? 'bg-gray-100 border-l-4 border-l-gray-700' 
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
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 hover:opacity-80 transition-opacity">
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
                                ? 'bg-blue-100 text-blue-700 border-blue-200'
                                : dialog.type === 'request' 
                                  ? 'bg-gray-100 text-gray-700 border-gray-300' 
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
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
                  <div className="bg-gray-100 p-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
                    <div 
                      className={`flex items-center space-x-3 ${currentDialog.type !== 'support' ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                      onClick={() => {
                        if (currentDialog.type !== 'support' && mockUserProfiles[currentDialog.name]) {
                          setSelectedUserProfile(mockUserProfiles[currentDialog.name]);
                          setIsUserProfileOpen(true);
                        }
                      }}
                    >
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600">
                        <AvatarFallback className="bg-transparent text-white font-bold">
                          {currentDialog.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className={`font-bold text-lg text-gray-900 ${currentDialog.type !== 'support' ? 'hover:underline' : ''}`}>{currentDialog.name}</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-600">онлайн</p>
                          <Badge className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-700 border-gray-300">
                            {currentDialog.type === 'support' ? 'Поддержка' : currentDialog.type === 'request' ? 'Запрос' : 'Предложение'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(false)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Icon name="X" size={24} className="text-gray-700" />
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
                              <Badge className="bg-gray-600 text-white border-0 text-xs">
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
                          <div className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                            msg.sender === 'me' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.text}</p>
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
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-xl"
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
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
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
            <div className="sticky top-0 bg-gray-100 p-4 sm:p-6 rounded-t-2xl flex items-center justify-between z-10 border-b border-gray-200 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Создать запрос</h2>
              <button 
                onClick={() => setIsCreateFormOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} className="text-gray-700" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Заголовок *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Например: Ищу iPhone 15 Pro"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Категория *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Бюджет (опционально)</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="Например: до 120 000 ₽"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Описание *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    const text = e.target.value;
                    if (text.length <= 1000) {
                      setFormData({ ...formData, description: text });
                    }
                  }}
                  placeholder="Подробно опишите что вы ищете..."
                  rows={4}
                  maxLength={1000}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none transition-all bg-gray-50"
                />
                <div className="text-sm text-gray-500 mt-1 text-right">
                  {formData.description.length}/1000 символов
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Город *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Например: Москва"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
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
                      alert('Запрос создан!');
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all"
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
            <div className="bg-gray-100 p-4 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between border-b border-gray-200 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Оставить отзыв</h2>
              <button 
                onClick={() => {
                  setIsReviewFormOpen(false);
                  setReviewRating(0);
                  setReviewText('');
                }}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} className="text-gray-700" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="text-center">
                <Avatar className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-600 to-pink-600">
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 py-3 text-base font-semibold"
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
            <div className="bg-gray-100 p-4 rounded-t-xl sm:rounded-t-2xl flex items-center justify-between border-b border-gray-200 shadow-sm">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Уведомления</h2>
                <p className="text-xs text-gray-600 mt-1">
                  {notifications.filter(n => !n.read).length} новых
                </p>
              </div>
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} className="text-gray-700" />
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

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="max-w-md rounded-2xl overflow-hidden shadow-2xl">
          <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="LogIn" size={22} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">Вход</DialogTitle>
                <p className="text-gray-600 text-sm">Войдите в свой аккаунт</p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setIsLoginOpen(false)} variant="outline" className="flex-1 rounded-xl">
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
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Войти
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 pt-2">
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
        </DialogContent>
      </Dialog>

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="max-w-md rounded-2xl overflow-hidden shadow-2xl">
          <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="UserPlus" size={22} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">Регистрация</DialogTitle>
                <p className="text-gray-600 text-sm">Создайте новый аккаунт</p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Имя</label>
              <input
                type="text"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                placeholder="Александр"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Пароль</label>
              <input
                type="password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setIsRegisterOpen(false)} variant="outline" className="flex-1 rounded-xl">
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
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Зарегистрироваться
              </Button>
            </div>
            <p className="text-center text-sm text-gray-600 pt-2">
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
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileEditOpen} onOpenChange={setIsProfileEditOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
          <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="Settings" size={22} className="text-white" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900">Редактирование профиля</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Фото профиля</label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent transition-all bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent transition-all bg-gray-50"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent transition-all bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Новый пароль</label>
                <input
                  type="password"
                  value={profileData.newPassword}
                  onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent transition-all bg-gray-50"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setIsProfileEditOpen(false)} variant="outline" className="flex-1 rounded-xl">
                Отмена
              </Button>
              <Button 
                onClick={() => {
                  alert('Профиль обновлён!');
                  setIsProfileEditOpen(false);
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Сохранить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewModalOpen && !!selectedItem} onOpenChange={(open) => {
        if (!open) {
          setIsViewModalOpen(false);
          setSelectedItem(null);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
          {selectedItem && (
            <>
              <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <Icon name="Eye" size={22} className="text-white" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-gray-900 line-clamp-2">{selectedItem.title}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-6">
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
                      <Avatar className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600">
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
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
                    >
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Написать
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
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
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isResponseModalOpen && !!selectedItem} onOpenChange={(open) => {
        if (!open) {
          setIsResponseModalOpen(false);
          setSelectedItem(null);
          setResponseData({ price: '', comment: '' });
        }
      }}>
        <DialogContent className="max-w-md rounded-2xl shadow-2xl">
          {selectedItem && (
            <>
              <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="MessageSquare" size={22} className="text-white" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-gray-900">Откликнуться</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent transition-all bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Комментарий</label>
                <textarea
                  value={responseData.comment}
                  onChange={(e) => setResponseData({ ...responseData, comment: e.target.value })}
                  placeholder="Расскажите подробнее о вашем предложении..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none transition-all bg-gray-50"
                />
              </div>

              <div className="flex gap-3 pt-2">
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
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
                >
                  Отправить
                </Button>
              </div>
            </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
        <DialogContent className="max-w-md h-[600px] flex flex-col p-0 rounded-2xl overflow-hidden shadow-2xl">
          <DialogHeader className="bg-gray-100 p-5 flex-shrink-0 border-b border-gray-200 rounded-t-2xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Icon name="Headphones" size={22} className="text-white" />
                </div>
                <div>
                  <DialogTitle className="font-bold text-lg text-gray-900">Поддержка</DialogTitle>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-gray-600">Онлайн</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
              {supportMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <p className={`text-xs text-gray-400 mt-1.5 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
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
                  placeholder="Сообщение..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-transparent text-sm transition-all bg-gray-50"
                />
              </div>
              <Button 
                onClick={handleSendSupportMessage}
                className="bg-gradient-to-br from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 px-4 py-3 rounded-xl shadow-lg transition-all hover:shadow-xl"
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isUserProfileOpen && !!selectedUserProfile} onOpenChange={(open) => {
        if (!open) {
          setIsUserProfileOpen(false);
          setSelectedUserProfile(null);
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
          {selectedUserProfile && (
            <>
              <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="User" size={22} className="text-white" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-gray-900">Профиль пользователя</DialogTitle>
                </div>
              </DialogHeader>
              <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0">
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
                          <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600">
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
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-0">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-3xl"></div>
            <button 
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all"
            >
              <Icon name="X" size={18} className="text-white" />
            </button>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Avatar className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 ring-4 ring-white shadow-xl">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-transparent text-white text-4xl font-bold">
                    {profileData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
          
          <div className="pt-20 px-6 pb-6 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Александр</h2>
              <p className="text-gray-500 text-sm mt-1">user@example.com</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Icon name="Star" size={16} className="fill-current" />
                  <span className="font-semibold text-gray-900">4.8</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">На сайте с октября 2024</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-2xl p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-600 mt-1">Запросов</p>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-600 mt-1">Откликов</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-600 mt-1">Сделок</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsProfileEditOpen(true);
                }}
                variant="outline" 
                className="w-full justify-start h-12 rounded-xl hover:bg-gray-50"
              >
                <Icon name="Settings" size={20} className="mr-3 text-gray-600" />
                <span className="font-medium">Настройки профиля</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 rounded-xl hover:bg-gray-50"
              >
                <Icon name="Bell" size={20} className="mr-3 text-gray-600" />
                <span className="font-medium">Уведомления</span>
              </Button>
              <Button 
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsSupportOpen(true);
                }}
                variant="outline" 
                className="w-full justify-start h-12 rounded-xl hover:bg-gray-50"
              >
                <Icon name="HelpCircle" size={20} className="mr-3 text-gray-600" />
                <span className="font-medium">Помощь и поддержка</span>
              </Button>
              <div className="pt-2 border-t border-gray-200">
                <Button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsAuthenticated(false);
                  }}
                  variant="outline" 
                  className="w-full justify-start h-12 rounded-xl hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <Icon name="LogOut" size={20} className="mr-3" />
                  <span className="font-medium">Выйти из аккаунта</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <button
        onClick={() => setIsSupportOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 animate-bounce hover:from-purple-700 hover:via-pink-700 hover:to-orange-600"
        style={{ animationDuration: '3s' }}
      >
        <Icon name="HelpCircle" size={28} />
      </button>
      </div>
    </div>
  );
};

export default Index;