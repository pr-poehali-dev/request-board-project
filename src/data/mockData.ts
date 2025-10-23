import { Request, Offer, UserProfile, Category } from '@/types';

export const cities = [
  'Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург', 
  'Нижний Новгород', 'Самара', 'Омск', 'Челябинск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'
];

export const categories: Category[] = [
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

export const mockRequests: Request[] = [
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

export const mockOffers: Offer[] = [
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

export const mockUserProfiles: Record<string, UserProfile> = {
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
