import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import { ChatDialog, Notification, Request, Offer, UserProfile } from '@/types';
import { mockRequests, mockOffers, mockUserProfiles, categories, cities } from '@/data/mockData';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
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
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dialogs, setDialogs] = useState<ChatDialog[]>([
    {
      id: 1,
      name: 'Сергей',
      avatar: 'С',
      lastMessage: 'Отлично, жду вашего ответа!',
      lastTime: '2 мин назад',
      type: 'request',
      unread: 2,
      relatedItem: mockRequests[0],
      messages: [
        { id: 1, text: 'Здравствуйте! Интересует ваш запрос на iPhone', sender: 'other', timestamp: 'сегодня 10:00', author: 'Сергей' },
        { id: 2, text: 'Могу предложить iPhone 15 Pro в идеальном состоянии', sender: 'other', timestamp: 'сегодня 10:01', author: 'Сергей' },
        { id: 3, text: 'Добрый день! Да, интересно. Какая цена?', sender: 'me', timestamp: 'сегодня 10:05', author: 'Вы' },
        { id: 4, text: '95 000 рублей, все документы есть', sender: 'other', timestamp: 'сегодня 10:06', author: 'Сергей' },
        { id: 5, text: 'Отлично, жду вашего ответа!', sender: 'other', timestamp: 'сегодня 10:10', author: 'Сергей' },
      ]
    },
    {
      id: 2,
      name: 'Мария',
      avatar: 'М',
      lastMessage: 'Когда удобно встретиться?',
      lastTime: '1 час назад',
      type: 'request',
      unread: 0,
      relatedItem: mockRequests[1],
      messages: [
        { id: 1, text: 'Добрый день! Видел ваш запрос на ремонт', sender: 'other', timestamp: 'вчера 15:30', author: 'Мария' },
        { id: 2, text: 'Могу помочь с ремонтом квартиры', sender: 'other', timestamp: 'вчера 15:31', author: 'Мария' },
        { id: 3, text: 'Отлично! Какие у вас условия?', sender: 'me', timestamp: 'вчера 16:00', author: 'Вы' },
        { id: 4, text: 'Когда удобно встретиться?', sender: 'other', timestamp: 'вчера 16:30', author: 'Мария' },
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
  
  const [supportMessages, setSupportMessages] = useState([
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
      message: 'Сергей откликнулся на ваш запрос "Ищу iPhone 15 Pro"',
      time: '2 мин назад',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Сообщение',
      message: 'Мария написала вам сообщение',
      time: '1 час назад',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Избранное',
      message: 'Появилось новое предложение в категории "Электроника"',
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
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return b.id - a.id;
    } else if (sortBy === 'popular') {
      return b.responses - a.responses;
    } else if (sortBy === 'price') {
      const priceA = parseInt(a.budget.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.budget.replace(/[^0-9]/g, '')) || 0;
      return priceB - priceA;
    }
    return 0;
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
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return b.id - a.id;
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    } else if (sortBy === 'price') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      return priceB - priceA;
    }
    return 0;
  });

  const getCategoryCount = (categoryName: string) => {
    const requestCount = mockRequests.filter(r => r.category === categoryName).length;
    const offerCount = mockOffers.filter(o => o.category === categoryName).length;
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
    setTouchEnd(e.targetTouches[0].clientX);
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - e.targetTouches[0].clientX;
    if (Math.abs(distance) > 10) {
      setSwipeDirection(distance > 0 ? 'left' : 'right');
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
      const message = {
        id: currentDialog.messages.length + 1,
        text: newMessage,
        sender: 'me' as const,
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
      <Header
        isAuthenticated={isAuthenticated}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
        favorites={favorites}
        notifications={notifications}
        isNotificationsOpen={isNotificationsOpen}
        setIsNotificationsOpen={setIsNotificationsOpen}
        dialogs={dialogs}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        language={language}
        setLanguage={setLanguage}
        setIsLoginOpen={setIsLoginOpen}
        avatarPreview={avatarPreview}
        profileData={profileData}
        setIsCreateFormOpen={setIsCreateFormOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />

      <MobileNav
        isAuthenticated={isAuthenticated}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-6" style={{ maxWidth: '1400px' }}>
        <p className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Найди то, что нужно тебе! 🚀
        </p>
        
        <div className="text-center text-sm text-gray-500 mb-4">
          Всего объявлений: {getAllListingsCount()}
        </div>

        {/* Остальной контент будет добавлен по мере декомпозиции */}
        <div className="text-center py-20">
          <p className="text-gray-600">Декомпозиция в процессе...</p>
          <p className="text-sm text-gray-400 mt-2">Компоненты Header и MobileNav созданы</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
