import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  { 
    name: 'Электроника', 
    icon: 'Smartphone', 
    color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600', 
    popular: true,
    subcategories: ['Телефоны', 'Ноутбуки', 'Планшеты', 'Наушники', 'Часы', 'Камеры']
  },
  { 
    name: 'Одежда', 
    icon: 'ShoppingBag', 
    color: 'bg-gradient-to-br from-pink-500 via-rose-500 to-red-500', 
    popular: true,
    subcategories: ['Мужская', 'Женская', 'Детская', 'Обувь', 'Аксессуары', 'Верхняя одежда']
  },
  { 
    name: 'Услуги', 
    icon: 'Wrench', 
    color: 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500', 
    popular: true,
    subcategories: ['Ремонт', 'Репетиторы', 'Красота', 'IT-услуги', 'Фото/Видео', 'Доставка']
  },
  { 
    name: 'Недвижимость', 
    icon: 'Home', 
    color: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500', 
    popular: true,
    subcategories: ['Аренда квартир', 'Продажа квартир', 'Дома', 'Участки', 'Коммерческая', 'Гаражи']
  },
  { 
    name: 'Транспорт', 
    icon: 'Car', 
    color: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500', 
    popular: true,
    subcategories: ['Автомобили', 'Мотоциклы', 'Велосипеды', 'Запчасти', 'Самокаты', 'Спецтехника']
  },
  { 
    name: 'Мебель', 
    icon: 'Armchair', 
    color: 'bg-gradient-to-br from-amber-600 via-orange-600 to-red-600', 
    popular: false,
    subcategories: ['Диваны', 'Кровати', 'Столы', 'Шкафы', 'Кухни', 'Кресла']
  },
  { 
    name: 'Детские товары', 
    icon: 'Baby', 
    color: 'bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-400', 
    popular: false,
    subcategories: ['Коляски', 'Игрушки', 'Одежда', 'Мебель', 'Кормление', 'Автокресла']
  },
  { 
    name: 'Спорт', 
    icon: 'Dumbbell', 
    color: 'bg-gradient-to-br from-lime-500 via-green-500 to-emerald-600', 
    popular: false,
    subcategories: ['Тренажеры', 'Велосипеды', 'Зимний спорт', 'Фитнес', 'Туризм', 'Единоборства']
  },
  { 
    name: 'Красота', 
    icon: 'Sparkles', 
    color: 'bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500', 
    popular: false,
    subcategories: ['Косметика', 'Парфюмерия', 'Уход за телом', 'Салоны', 'Ногти', 'Волосы']
  },
  { 
    name: 'Животные', 
    icon: 'Dog', 
    color: 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600', 
    popular: false,
    subcategories: ['Собаки', 'Кошки', 'Птицы', 'Аквариум', 'Грызуны', 'Товары для животных']
  },
  { 
    name: 'Хобби', 
    icon: 'Gamepad2', 
    color: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500', 
    popular: false,
    subcategories: ['Игровые приставки', 'Настольные игры', 'Коллекционирование', 'Музыка', 'Рукоделие', 'Рыбалка']
  },
  { 
    name: 'Книги', 
    icon: 'BookOpen', 
    color: 'bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-600', 
    popular: false,
    subcategories: ['Художественная', 'Учебная', 'Детская', 'Бизнес', 'Комиксы', 'Журналы']
  },
  { 
    name: 'Строительство', 
    icon: 'HardHat', 
    color: 'bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600', 
    popular: false,
    subcategories: ['Инструменты', 'Материалы', 'Сантехника', 'Электрика', 'Отделка', 'Двери и окна']
  },
  { 
    name: 'Работа', 
    icon: 'Briefcase', 
    color: 'bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700', 
    popular: true,
    subcategories: ['IT', 'Продажи', 'Маркетинг', 'Административная', 'Производство', 'Образование']
  },
  { 
    name: 'Еда и напитки', 
    icon: 'Coffee', 
    color: 'bg-gradient-to-br from-rose-500 via-red-500 to-orange-500', 
    popular: false,
    subcategories: ['Рестораны', 'Кафе', 'Доставка еды', 'Продукты', 'Напитки', 'Кондитерские']
  },
];

const mockRequests: Request[] = [
  { id: 1, title: 'Ищу iPhone 15 Pro', category: 'Электроника', budget: 'до 120 000 ₽', author: 'Александр', rating: 4.8, responses: 12, description: 'Нужен iPhone 15 Pro в хорошем состоянии, желательно с гарантией', city: 'Москва', delivery: true, exchange: true, photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20f91e3c-6b83-4a91-8518-c44b398b628e.jpg'] },
  { id: 2, title: 'Куплю MacBook Air M2', category: 'Электроника', budget: 'до 90 000 ₽', author: 'Дмитрий', rating: 4.7, responses: 15, description: 'Интересует MacBook Air на M2, новый или б/у в отличном состоянии', city: 'Казань', delivery: true, photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20f91e3c-6b83-4a91-8518-c44b398b628e.jpg'] },
  { id: 3, title: 'Ищу AirPods Pro 2', category: 'Электроника', budget: 'до 20 000 ₽', author: 'Игорь', rating: 4.6, responses: 8, description: 'Нужны наушники AirPods Pro 2 поколения', city: 'Москва', delivery: true, photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20f91e3c-6b83-4a91-8518-c44b398b628e.jpg'] },
  
  { id: 4, title: 'Требуется мастер по ремонту', category: 'Услуги', budget: 'договорная', author: 'Мария', rating: 4.9, responses: 8, description: 'Ремонт квартиры, необходим опытный специалист', city: 'Санкт-Петербург', delivery: false, photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20f91e3c-6b83-4a91-8518-c44b398b628e.jpg'] },
  { id: 5, title: 'Ищу репетитора английского', category: 'Услуги', budget: '1500 ₽/час', author: 'Елена', rating: 5.0, responses: 23, description: 'Нужен репетитор для подготовки к IELTS, уровень Intermediate', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20f91e3c-6b83-4a91-8518-c44b398b628e.jpg'] },
  { id: 6, title: 'Нужен веб-разработчик', category: 'Услуги', budget: 'от 50 000 ₽', author: 'Артем', rating: 4.8, responses: 18, description: 'Разработка сайта для стартапа', city: 'Москва', delivery: false, photos: ['https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20f91e3c-6b83-4a91-8518-c44b398b628e.jpg'] },
  
  { id: 7, title: 'Куплю пальто зимнее', category: 'Одежда', budget: 'до 15 000 ₽', author: 'Светлана', rating: 4.5, responses: 6, description: 'Ищу женское зимнее пальто, размер 44-46', city: 'Санкт-Петербург', delivery: true },
  { id: 8, title: 'Ищу кроссовки Nike', category: 'Одежда', budget: 'до 8 000 ₽', author: 'Роман', rating: 4.7, responses: 11, description: 'Нужны кроссовки Nike, размер 42', city: 'Москва', delivery: true },
  
  { id: 9, title: 'Сниму квартиру 2-комн', category: 'Недвижимость', budget: 'до 50 000 ₽/мес', author: 'Андрей', rating: 4.9, responses: 14, description: 'Ищу 2-комнатную квартиру в центре', city: 'Москва', delivery: false },
  { id: 10, title: 'Куплю участок под дачу', category: 'Недвижимость', budget: 'до 1 500 000 ₽', author: 'Владимир', rating: 4.6, responses: 9, description: 'Ищу земельный участок 6-10 соток', city: 'Москва', delivery: false },
  
  { id: 11, title: 'Куплю BMW 3 series', category: 'Транспорт', budget: 'до 2 000 000 ₽', author: 'Сергей', rating: 4.8, responses: 16, description: 'Ищу BMW 3 series в хорошем состоянии', city: 'Москва', delivery: false },
  { id: 12, title: 'Нужен самокат', category: 'Транспорт', budget: 'до 15 000 ₽', author: 'Денис', rating: 4.5, responses: 7, description: 'Электросамокат для города', city: 'Санкт-Петербург', delivery: true },
  
  { id: 13, title: 'Куплю диван для гостиной', category: 'Мебель', budget: 'до 50 000 ₽', author: 'Анастасия', rating: 4.6, responses: 7, description: 'Ищу угловой диван в хорошем состоянии', city: 'Новосибирск', delivery: true },
  { id: 14, title: 'Ищу кровать двуспальную', category: 'Мебель', budget: 'до 30 000 ₽', author: 'Татьяна', rating: 4.7, responses: 10, description: 'Нужна кровать с матрасом', city: 'Казань', delivery: true },
  
  { id: 15, title: 'Нужна коляска для ребенка', category: 'Детские товары', budget: 'до 15 000 ₽', author: 'Ольга', rating: 4.9, responses: 12, description: 'Трансформер или прогулочная коляска', city: 'Екатеринбург', delivery: false },
  { id: 16, title: 'Куплю детский велосипед', category: 'Детские товары', budget: 'до 5 000 ₽', author: 'Евгений', rating: 4.5, responses: 8, description: 'Для ребенка 5-7 лет', city: 'Москва', delivery: true },
  
  { id: 17, title: 'Ищу велосипед горный', category: 'Спорт', budget: 'до 30 000 ₽', author: 'Максим', rating: 4.7, responses: 9, description: 'Нужен горный велосипед для трейлов', city: 'Москва', delivery: true },
  { id: 18, title: 'Куплю гантели разборные', category: 'Спорт', budget: 'до 8 000 ₽', author: 'Алексей', rating: 4.6, responses: 5, description: 'Для домашних тренировок', city: 'Санкт-Петербург', delivery: true },
  
  { id: 19, title: 'Нужен мастер маникюра', category: 'Красота', budget: '2000 ₽', author: 'Юлия', rating: 4.8, responses: 15, description: 'Ищу мастера маникюра на дом', city: 'Москва', delivery: false },
  { id: 20, title: 'Куплю фен для волос', category: 'Красота', budget: 'до 5 000 ₽', author: 'Марина', rating: 4.5, responses: 6, description: 'Профессиональный фен', city: 'Казань', delivery: true },
  
  { id: 21, title: 'Ищу щенка хаски', category: 'Животные', budget: 'до 30 000 ₽', author: 'Павел', rating: 4.7, responses: 12, description: 'Хочу купить щенка хаски с документами', city: 'Москва', delivery: false },
  { id: 22, title: 'Нужен корм для кошки', category: 'Животные', budget: 'договорная', author: 'Наталья', rating: 4.6, responses: 4, description: 'Ищу премиальный корм для кошки', city: 'Санкт-Петербург', delivery: true },
  
  { id: 23, title: 'Куплю PS5', category: 'Хобби', budget: 'до 50 000 ₽', author: 'Артур', rating: 4.8, responses: 20, description: 'Ищу PlayStation 5 в хорошем состоянии', city: 'Москва', delivery: true },
  { id: 24, title: 'Ищу настольные игры', category: 'Хобби', budget: 'до 3 000 ₽', author: 'Кирилл', rating: 4.5, responses: 7, description: 'Для семейных вечеров', city: 'Казань', delivery: true },
  
  { id: 25, title: 'Куплю учебники по программированию', category: 'Книги', budget: 'до 2 000 ₽', author: 'Иван', rating: 4.6, responses: 9, description: 'Учебники по Python и JavaScript', city: 'Москва', delivery: true },
  { id: 26, title: 'Ищу классическую литературу', category: 'Книги', budget: 'договорная', author: 'Екатерина', rating: 4.7, responses: 5, description: 'Собрание сочинений классиков', city: 'Санкт-Петербург', delivery: true },
  
  { id: 27, title: 'Нужен строитель', category: 'Строительство', budget: 'договорная', author: 'Николай', rating: 4.8, responses: 11, description: 'Строительство загородного дома', city: 'Москва', delivery: false },
  { id: 28, title: 'Куплю стройматериалы', category: 'Строительство', budget: 'до 100 000 ₽', author: 'Виктор', rating: 4.5, responses: 6, description: 'Кирпич, цемент, песок', city: 'Новосибирск', delivery: true },
  
  { id: 29, title: 'Ищу программиста Python', category: 'Работа', budget: 'от 150 000 ₽/мес', author: 'IT Компания', rating: 4.9, responses: 35, description: 'Требуется Senior Python разработчик', city: 'Москва', delivery: false },
  { id: 30, title: 'Вакансия дизайнера', category: 'Работа', budget: 'от 80 000 ₽/мес', author: 'Студия дизайна', rating: 4.7, responses: 22, description: 'Ищем UX/UI дизайнера', city: 'Санкт-Петербург', delivery: false },
  
  { id: 31, title: 'Куплю кофе в зернах', category: 'Еда и напитки', budget: 'до 2 000 ₽/кг', author: 'Дмитрий', rating: 4.6, responses: 8, description: 'Арабика, свежая обжарка', city: 'Москва', delivery: true },
  { id: 32, title: 'Ищу доставку еды', category: 'Еда и напитки', budget: 'договорная', author: 'Ольга', rating: 4.5, responses: 5, description: 'Здоровое питание на неделю', city: 'Санкт-Петербург', delivery: true }
];

const mockOffers: Offer[] = [
  { id: 1, title: 'Продаю iPhone 15 Pro', category: 'Электроника', price: '95 000 ₽', author: 'Сергей', rating: 4.9, views: 145, description: 'iPhone 15 Pro 256GB, титановый, отличное состояние', city: 'Москва', delivery: true, exchange: true },
  { id: 2, title: 'MacBook Pro 16" M1 Pro', category: 'Электроника', price: '150 000 ₽', author: 'Игорь', rating: 4.8, views: 234, description: 'MacBook Pro 16" M1 Pro, 32GB RAM, 1TB SSD', city: 'Москва', delivery: true, exchange: true },
  { id: 3, title: 'Samsung Galaxy S24', category: 'Электроника', price: '65 000 ₽', author: 'Михаил', rating: 4.7, views: 98, description: 'Новый телефон, все аксессуары в комплекте', city: 'Казань', delivery: true },
  
  { id: 4, title: 'Услуги дизайнера интерьера', category: 'Услуги', price: 'от 3000 ₽', author: 'Анна', rating: 5.0, views: 89, description: 'Профессиональный дизайн интерьера квартир и домов', city: 'Санкт-Петербург', delivery: false },
  { id: 5, title: 'Ремонт квартир', category: 'Услуги', price: 'договорная', author: 'Строймастер', rating: 4.8, views: 156, description: 'Все виды ремонтных работ под ключ', city: 'Москва', delivery: false },
  { id: 6, title: 'Уборка квартир', category: 'Услуги', price: 'от 2000 ₽', author: 'Клининг Сервис', rating: 4.9, views: 78, description: 'Профессиональная уборка квартир и офисов', city: 'Санкт-Петербург', delivery: false },
  
  { id: 7, title: 'Зимнее пальто женское', category: 'Одежда', price: '12 000 ₽', author: 'Елена', rating: 4.6, views: 45, description: 'Пальто, размер 44, почти новое', city: 'Москва', delivery: true },
  { id: 8, title: 'Кроссовки Adidas', category: 'Одежда', price: '6 500 ₽', author: 'Петр', rating: 4.5, views: 67, description: 'Оригинальные кроссовки, размер 42', city: 'Санкт-Петербург', delivery: true },
  { id: 9, title: 'Куртка кожаная', category: 'Одежда', price: '8 000 ₽', author: 'Алина', rating: 4.7, views: 52, description: 'Натуральная кожа, размер M', city: 'Казань', delivery: true },
  
  { id: 10, title: 'Сдаю квартиру 2-комн', category: 'Недвижимость', price: '45 000 ₽/мес', author: 'Владелец', rating: 4.8, views: 189, description: '2-комнатная квартира в центре, евроремонт', city: 'Москва', delivery: false },
  { id: 11, title: 'Продаю дачу', category: 'Недвижимость', price: '3 500 000 ₽', author: 'Александр', rating: 4.6, views: 134, description: 'Участок 8 соток, дом 80 кв.м', city: 'Москва', delivery: false },
  
  { id: 12, title: 'BMW 5 series 2020', category: 'Транспорт', price: '3 200 000 ₽', author: 'Автосалон', rating: 4.9, views: 267, description: 'BMW 5 series, один владелец, пробег 45 000 км', city: 'Москва', delivery: false },
  { id: 13, title: 'Электросамокат Xiaomi', category: 'Транспорт', price: '18 000 ₽', author: 'Олег', rating: 4.5, views: 92, description: 'Xiaomi Mi Electric Scooter Pro 2', city: 'Санкт-Петербург', delivery: true },
  { id: 14, title: 'Велосипед детский', category: 'Транспорт', price: '4 500 ₽', author: 'Мария', rating: 4.6, views: 56, description: 'Для ребенка 6-8 лет, в отличном состоянии', city: 'Казань', delivery: true },
  
  { id: 15, title: 'Продаю шкаф-купе', category: 'Мебель', price: '35 000 ₽', author: 'Виктория', rating: 4.7, views: 67, description: 'Шкаф-купе 2.5м, зеркальные двери', city: 'Москва', delivery: false },
  { id: 16, title: 'Диван угловой', category: 'Мебель', price: '42 000 ₽', author: 'Анатолий', rating: 4.6, views: 89, description: 'Угловой диван с механизмом трансформации', city: 'Санкт-Петербург', delivery: true },
  { id: 17, title: 'Обеденный стол', category: 'Мебель', price: '15 000 ₽', author: 'Наталья', rating: 4.5, views: 45, description: 'Стол на 6 персон, массив дуба', city: 'Новосибирск', delivery: false },
  
  { id: 18, title: 'Детская кроватка с матрасом', category: 'Детские товары', price: '8 000 ₽', author: 'Татьяна', rating: 5.0, views: 89, description: 'Кроватка-маятник с ортопедическим матрасом', city: 'Санкт-Петербург', delivery: true },
  { id: 19, title: 'Коляска-трансформер', category: 'Детские товары', price: '12 000 ₽', author: 'Светлана', rating: 4.8, views: 78, description: 'Коляска 3 в 1, в отличном состоянии', city: 'Москва', delivery: true },
  
  { id: 20, title: 'Горный велосипед Trek', category: 'Спорт', price: '45 000 ₽', author: 'Николай', rating: 4.8, views: 112, description: 'Trek X-Caliber 8, карбоновая вилка', city: 'Казань', delivery: true, exchange: true },
  { id: 21, title: 'Беговая дорожка', category: 'Спорт', price: '25 000 ₽', author: 'Валерий', rating: 4.7, views: 95, description: 'Электрическая беговая дорожка', city: 'Москва', delivery: true },
  { id: 22, title: 'Гантели 20 кг', category: 'Спорт', price: '6 000 ₽', author: 'Дмитрий', rating: 4.6, views: 67, description: 'Разборные гантели, почти новые', city: 'Санкт-Петербург', delivery: true },
  
  { id: 23, title: 'Маникюр на дом', category: 'Красота', price: '1 500 ₽', author: 'Мастер Юлия', rating: 4.9, views: 134, description: 'Профессиональный маникюр и педикюр', city: 'Москва', delivery: false },
  { id: 24, title: 'Фен Dyson', category: 'Красота', price: '22 000 ₽', author: 'Анна', rating: 4.8, views: 56, description: 'Фен Dyson Supersonic, как новый', city: 'Санкт-Петербург', delivery: true },
  
  { id: 25, title: 'Продаю котенка британца', category: 'Животные', price: '15 000 ₽', author: 'Питомник', rating: 4.9, views: 178, description: 'Британский котенок, 2 месяца, с документами', city: 'Москва', delivery: false },
  { id: 26, title: 'Щенок йорка', category: 'Животные', price: '25 000 ₽', author: 'Заводчик', rating: 5.0, views: 145, description: 'Йоркширский терьер, привит', city: 'Санкт-Петербург', delivery: false },
  
  { id: 27, title: 'PlayStation 5', category: 'Хобби', price: '45 000 ₽', author: 'Геймер', rating: 4.7, views: 234, description: 'PS5 в отличном состоянии, 2 джойстика', city: 'Москва', delivery: true },
  { id: 28, title: 'Настольная игра Монополия', category: 'Хобби', price: '2 500 ₽', author: 'Коллекционер', rating: 4.5, views: 67, description: 'Новая настольная игра в упаковке', city: 'Казань', delivery: true },
  { id: 29, title: 'Коллекция марок', category: 'Хобби', price: '10 000 ₽', author: 'Филателист', rating: 4.6, views: 89, description: 'Редкая коллекция советских марок', city: 'Москва', delivery: true },
  
  { id: 30, title: 'Учебники по Python', category: 'Книги', price: '1 500 ₽', author: 'Студент', rating: 4.5, views: 78, description: 'Комплект учебников по программированию', city: 'Москва', delivery: true },
  { id: 31, title: 'Классическая литература', category: 'Книги', price: '3 000 ₽', author: 'Библиофил', rating: 4.8, views: 56, description: 'Собрание сочинений Толстого', city: 'Санкт-Петербург', delivery: true },
  
  { id: 32, title: 'Бригада строителей', category: 'Строительство', price: 'договорная', author: 'Стройкомпания', rating: 4.8, views: 167, description: 'Все виды строительных работ', city: 'Москва', delivery: false },
  { id: 33, title: 'Кирпич керамический', category: 'Строительство', price: '25 ₽/шт', author: 'Стройбаза', rating: 4.6, views: 89, description: 'Кирпич керамический, качественный', city: 'Новосибирск', delivery: true },
  
  { id: 34, title: 'Вакансия: Junior разработчик', category: 'Работа', price: 'от 80 000 ₽', author: 'IT Компания', rating: 4.9, views: 234, description: 'Ищем Junior Python разработчика', city: 'Москва', delivery: false },
  { id: 35, title: 'Требуется дизайнер', category: 'Работа', price: 'от 100 000 ₽', author: 'Агентство', rating: 4.8, views: 189, description: 'UX/UI дизайнер в штат', city: 'Санкт-Петербург', delivery: false },
  
  { id: 36, title: 'Кофе арабика', category: 'Еда и напитки', price: '1 500 ₽/кг', author: 'Кофейня', rating: 4.7, views: 123, description: 'Свежеобжаренный кофе в зернах', city: 'Москва', delivery: true },
  { id: 37, title: 'Доставка здорового питания', category: 'Еда и напитки', price: 'от 2 000 ₽/день', author: 'ЗОЖ-кухня', rating: 4.9, views: 145, description: 'Рационы на неделю, доставка', city: 'Санкт-Петербург', delivery: true }
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
  favorites: any[];
  isAuthenticated: boolean;
  onToggleFavorite: () => void;
  onViewClick: () => void;
  onResponseClick: () => void;
  onAuthorClick: () => void;
}

const RequestCard = ({ 
  request, 
  index, 
  contentTopRef, 
  favorites, 
  isAuthenticated, 
  onToggleFavorite, 
  onViewClick, 
  onResponseClick,
  onAuthorClick 
}: RequestCardProps) => {
  const isFavorited = favorites.includes(`request-${request.id}`);
  
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
              className="w-full h-48 sm:w-32 sm:h-32 object-cover rounded-xl flex-shrink-0"
            />
          )}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap flex-1 min-w-0">
                <Badge className={`${getCategoryColor(request.category)} text-white border-0 text-xs whitespace-nowrap shadow-md`}>
                  {request.category}
                </Badge>
                <Badge variant="outline" className="font-medium text-pink-700 border-pink-200 bg-pink-50 text-xs whitespace-nowrap">
                  <Icon name="MapPin" size={10} className="mr-1" />
                  {request.city}
                </Badge>
                {request.delivery && (
                  <Badge variant="outline" className="font-medium text-orange-700 border-orange-300 bg-orange-50 text-xs whitespace-nowrap">
                    <Icon name="Truck" size={10} className="mr-1" />
                    Доставка
                  </Badge>
                )}
                {request.exchange && (
                  <Badge variant="outline" className="font-medium text-violet-700 border-violet-300 bg-violet-50 text-xs whitespace-nowrap">
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
              <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-orange-500 ring-2 ring-pink-200">
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
            <div className="flex gap-2">
              <Button 
                onClick={onToggleFavorite}
                variant="outline" 
                size="sm"
                className={`flex-1 sm:flex-none font-semibold rounded-xl transition-all duration-300 ${isFavorited ? 'text-rose-600 border-rose-400 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 shadow-md hover:shadow-lg' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'}`}
              >
                <Icon name="Heart" size={14} className={`sm:mr-1.5 transition-all duration-300 ${isFavorited ? 'fill-rose-500 text-rose-600' : ''}`} />
                <span className="hidden sm:inline">{isFavorited ? 'В избранном' : 'В избранное'}</span>
              </Button>
              <Button 
                onClick={onViewClick}
                variant="outline" 
                size="sm"
                className="flex-1 sm:flex-none font-semibold rounded-xl border-gray-300 hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300"
              >
                <Icon name="Eye" size={14} className="sm:mr-1.5" />
                <span className="hidden sm:inline">Смотреть</span>
              </Button>
            </div>
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

interface OfferCardProps {
  offer: Offer;
  index: number;
  offersTopRef: React.RefObject<HTMLDivElement> | null;
  favorites: any[];
  isAuthenticated: boolean;
  onToggleFavorite: () => void;
  onViewClick: () => void;
  onContactClick: () => void;
  onAuthorClick: () => void;
}

const OfferCard = ({ 
  offer, 
  index, 
  offersTopRef, 
  favorites, 
  isAuthenticated, 
  onToggleFavorite, 
  onViewClick, 
  onContactClick,
  onAuthorClick 
}: OfferCardProps) => {
  const isFavorited = favorites.includes(`offer-${offer.id}`);
  
  return (
    <Card 
      key={offer.id}
      ref={index === 0 ? offersTopRef : null}
      className="border border-purple-100 bg-white rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-sm hover:shadow-2xl hover:scale-[1.03] hover:border-purple-300 hover:-translate-y-1 transition-all duration-300"
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
                <Badge className={`${getCategoryColor(offer.category)} text-white border-0 text-xs whitespace-nowrap shadow-md`}>
                  {offer.category}
                </Badge>
                <Badge variant="outline" className="font-medium text-pink-700 border-pink-200 bg-pink-50 text-xs whitespace-nowrap">
                  <Icon name="MapPin" size={10} className="mr-1" />
                  {offer.city}
                </Badge>
                {offer.delivery && (
                  <Badge variant="outline" className="font-medium text-orange-700 border-orange-300 bg-orange-50 text-xs whitespace-nowrap">
                    <Icon name="Truck" size={10} className="mr-1" />
                    Доставка
                  </Badge>
                )}
                {offer.exchange && (
                  <Badge variant="outline" className="font-medium text-violet-700 border-violet-300 bg-violet-50 text-xs whitespace-nowrap">
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
              onClick={onAuthorClick}
            >
              <Avatar className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 ring-2 ring-purple-200">
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Icon name="Eye" size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-700">{offer.views}</span>
                <span className="text-xs text-blue-600 font-medium">просмотров</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex gap-2">
              <Button 
                onClick={onToggleFavorite}
                variant="outline" 
                size="sm"
                className={`flex-1 sm:flex-none font-semibold rounded-xl transition-all duration-300 ${isFavorited ? 'text-rose-600 border-rose-400 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 shadow-md hover:shadow-lg' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'}`}
              >
                <Icon name="Heart" size={14} className={`sm:mr-1.5 transition-all duration-300 ${isFavorited ? 'fill-rose-500 text-rose-600' : ''}`} />
                <span className="hidden sm:inline">{isFavorited ? 'В избранном' : 'В избранное'}</span>
              </Button>
              <Button 
                onClick={onViewClick}
                variant="outline" 
                size="sm"
                className="flex-1 sm:flex-none font-semibold rounded-xl border-gray-300 hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300"
              >
                <Icon name="Eye" size={14} className="sm:mr-1.5" />
                <span className="hidden sm:inline">Смотреть</span>
              </Button>
            </div>
            <Button 
              onClick={onContactClick}
              size="sm"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              Связаться
              <Icon name="MessageCircle" size={14} className="ml-1.5" />
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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isSortOpen, setIsSortOpen] = useState(true);
  const contentTopRef = useRef<HTMLDivElement>(null);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const offersTopRef = useRef<HTMLDivElement>(null);
  const favoritesTopRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedDialog, setSelectedDialog] = useState<number>(1);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
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
  const [language, setLanguage] = useState<'ru' | 'ua'>('ru');
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
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentDialog = dialogs.find(d => d.id === selectedDialog);

  const filteredRequests = mockRequests.filter(req => {
    const matchesCategory = selectedCategory ? req.category === selectedCategory : true;
    const matchesSubcategory = selectedSubcategory ? req.category === selectedCategory : true;
    const matchesCity = selectedCity ? req.city === selectedCity : true;
    const matchesSearch = searchQuery ? 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSubcategory && matchesCity && matchesSearch;
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

  const filteredOffers = mockOffers.filter(offer => {
    const matchesCategory = selectedCategory ? offer.category === selectedCategory : true;
    const matchesSubcategory = selectedSubcategory ? offer.category === selectedCategory : true;
    const matchesCity = selectedCity ? offer.city === selectedCity : true;
    const matchesSearch = searchQuery ? 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSubcategory && matchesCity && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'desc' ? b.id - a.id : a.id - b.id;
    } else if (sortBy === 'popular') {
      return sortDirection === 'desc' ? b.views - a.views : a.views - b.views;
    } else if (sortBy === 'price') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
      const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
      return sortDirection === 'desc' ? priceB - priceA : priceA - priceB;
    }
    return 0;
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

  const getCategoryStats = (categoryName: string) => {
    const requestCount = mockRequests.filter(r => r.category === categoryName).length;
    const offerCount = mockOffers.filter(o => o.category === categoryName).length;
    return { requestCount, offerCount, total: requestCount + offerCount };
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
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;
    let animationFrameId: number;

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    const cardWidth = 280;
    const gap = 16;
    const totalWidth = (cardWidth + gap) * categories.length;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= totalWidth / 2) {
        scrollPosition = 0;
      }
      if (carousel) {
        carousel.scrollLeft = scrollPosition;
      }
    };

    const intervalId = setInterval(animate, 16);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-orange-50/50">
      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black border-b border-gray-700/50 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8" style={{ maxWidth: '1400px' }}>
          <div className="flex justify-between items-center h-14 sm:h-16 gap-4">
            <button 
              onClick={() => {
                setActiveTab('requests');
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="flex items-center space-x-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center ring-2 ring-white/30">
                <Icon name="MessageSquare" className="text-white" size={20} />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">Доска запросов</span>
            </button>

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
                  {dialogs.filter(d => d.unread > 0).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {dialogs.reduce((sum, d) => sum + d.unread, 0)}
                    </span>
                  )}
                </button>
              </div>
            )}

            <div className="h-6 w-px bg-white/30"></div>

            <div className="relative flex items-center bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg">
              <div 
                className={`absolute top-1 bottom-1 bg-white rounded-full shadow-md transition-all duration-300 ease-out ${
                  language === 'ru' ? 'left-1 w-[38px]' : 'left-[calc(50%)] w-[38px]'
                }`}
              />
              <button
                onClick={() => setLanguage('ru')}
                className={`relative z-10 w-[38px] py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                  language === 'ru' ? 'text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('ua')}
                className={`relative z-10 w-[38px] py-1 rounded-full text-xs font-bold transition-colors duration-300 ${
                  language === 'ua' ? 'text-gray-900' : 'text-white/70 hover:text-white'
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
                onClick={() => setIsProfileOpen(true)}
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
                className="bg-primary hover:bg-primary/90 text-white font-medium text-sm px-6 h-9"
                title="Создать объявление"
              >
                <Icon name="Sparkles" size={18} className="mr-1.5" />
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
                onClick={() => setIsProfileOpen(true)}
                className="flex flex-col items-center py-2 px-1 rounded-lg transition-colors text-gray-600"
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

      <div className="bg-gray-50 py-6 sm:py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Найди. Предложи. Обменяй.
          </h1>
          <p className="text-sm sm:text-base text-black max-w-2xl mx-auto font-medium">
            Доска объявлений нового поколения — где запросы встречаются с предложениями
          </p>
        </div>
        
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-3 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {[...categories.slice(0, 9), ...categories.slice(0, 9)].map((category, index) => {
              const categoryImages: Record<string, string> = {
                'Электроника': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/bbc49705-5890-4006-92ff-30a49ce12701.jpg',
                'Одежда': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/096cb481-d5f5-4c79-b61c-d9073e7570e8.jpg',
                'Услуги': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/f0501526-bc7a-40c0-a412-26d028dc667a.jpg',
                'Недвижимость': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/59b3e8ee-2b58-4b07-b924-7d1a7adc892f.jpg',
                'Транспорт': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/e35bceed-0e7e-432f-87d6-dec7712cce0b.jpg',
                'Мебель': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/7b11d7af-2698-4214-8d53-9db3b7f68313.jpg',
                'Детские товары': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/76eb21bc-38d7-40f8-bee6-46bfc6c50874.jpg',
                'Спорт': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/b7139cab-3b88-4e74-984e-45f3bdc9a4fe.jpg',
                'Красота': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/8cb774be-1f69-45ad-97e0-a7d52d76fa69.jpg',
                'Животные': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/49f76a76-5dde-4099-a4d8-ada024529525.jpg',
                'Хобби': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/1067ba74-289e-401f-a094-2fef71b0467d.jpg',
                'Книги': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/62256620-d3d3-47ae-ba0c-c1b5325b44fe.jpg',
                'Строительство': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/20c7994b-f37c-42d2-8f46-fbb7cbc0ee96.jpg',
                'Работа': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/dc541f89-4bfd-4192-95c2-d362958a78be.jpg',
                'Еда и напитки': 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/eabdaf20-db7d-47b1-9458-79351a65e50d.jpg'
              };
              const stats = getCategoryStats(category.name);
              return (
              <div
                key={`${category.name}-${index}`}
                className="flex-shrink-0 relative overflow-hidden rounded-2xl border border-indigo-100 shadow-lg transition-all duration-300"
                style={{ width: '340px', height: '200px' }}
              >
                <img 
                  src={categoryImages[category.name] || 'https://cdn.poehali.dev/projects/5930aa02-ebd9-4af3-86f3-42ce8f831926/files/d7e8b965-eec4-4ce9-af3d-59b386e6678c.jpg'} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                <div className="absolute inset-0 bg-indigo-900/20"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-xl backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl ${
                      category.name === 'Электроника' ? 'bg-blue-600' :
                      category.name === 'Одежда' ? 'bg-pink-600' :
                      category.name === 'Услуги' ? 'bg-orange-600' :
                      category.name === 'Недвижимость' ? 'bg-emerald-600' :
                      category.name === 'Транспорт' ? 'bg-purple-600' :
                      category.name === 'Мебель' ? 'bg-amber-600' :
                      category.name === 'Детские товары' ? 'bg-sky-500' :
                      category.name === 'Спорт' ? 'bg-green-600' :
                      category.name === 'Красота' ? 'bg-fuchsia-600' :
                      category.name === 'Животные' ? 'bg-yellow-600' :
                      category.name === 'Хобби' ? 'bg-indigo-600' :
                      category.name === 'Книги' ? 'bg-slate-600' :
                      category.name === 'Строительство' ? 'bg-yellow-700' :
                      category.name === 'Работа' ? 'bg-cyan-600' :
                      category.name === 'Еда и напитки' ? 'bg-rose-600' :
                      'bg-violet-600'
                    }`}>
                      <Icon name={category.icon as any} size={28} className="text-white" />
                    </div>
                  </div>
                  <div className="text-left space-y-2.5">
                    <h3 className={`font-bold text-lg drop-shadow-lg ${
                      category.name === 'Электроника' ? 'text-blue-100' :
                      category.name === 'Одежда' ? 'text-pink-100' :
                      category.name === 'Услуги' ? 'text-orange-100' :
                      category.name === 'Недвижимость' ? 'text-emerald-100' :
                      category.name === 'Транспорт' ? 'text-purple-100' :
                      category.name === 'Мебель' ? 'text-amber-100' :
                      category.name === 'Детские товары' ? 'text-sky-100' :
                      category.name === 'Спорт' ? 'text-green-100' :
                      category.name === 'Красота' ? 'text-fuchsia-100' :
                      category.name === 'Животные' ? 'text-yellow-100' :
                      category.name === 'Хобби' ? 'text-indigo-100' :
                      category.name === 'Книги' ? 'text-slate-100' :
                      category.name === 'Строительство' ? 'text-yellow-100' :
                      category.name === 'Работа' ? 'text-cyan-100' :
                      category.name === 'Еда и напитки' ? 'text-rose-100' :
                      'text-violet-100'
                    }`}>{category.name}</h3>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-2.5 py-2">
                        <div className="flex items-center justify-between gap-1">
                          <span className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                            <Icon name="Search" size={14} />
                            <span>Запросы</span>
                          </span>
                          <span className="text-white font-bold text-sm">{stats.requestCount}</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-2.5 py-2">
                        <div className="flex items-center justify-between gap-1">
                          <span className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                            <Icon name="Package" size={14} />
                            <span>Предложения</span>
                          </span>
                          <span className="text-white font-bold text-sm">{stats.offerCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
        </div>
      </div>
      


      <main className="container mx-auto px-3 sm:px-6 lg:px-8 pb-24 md:pb-8" style={{ maxWidth: '1400px' }}>
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0 relative">
            <div className="sticky top-20 space-y-4 relative z-10 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Тип</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeTab === 'requests' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="Search" size={16} className="inline mr-2" />
                    Запросы
                  </button>
                  <button
                    onClick={() => setActiveTab('offers')}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeTab === 'offers' 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="Package" size={16} className="inline mr-2" />
                    Предложения
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Сортировка</h3>
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
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left flex items-center justify-between ${
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
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left flex items-center justify-between ${
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
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
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

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Город</h3>
                <div className="relative">
                  <Icon name="MapPin" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                  <select
                    value={selectedCity || ''}
                    onChange={(e) => setSelectedCity(e.target.value || null)}
                    className="w-full appearance-none pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm bg-white cursor-pointer"
                  >
                    <option value="">Все города</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <Icon name="ChevronDown" size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4" id="categories-menu">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Категории</h3>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto scrollbar-thin">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      scrollToTop();
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      selectedCategory === null 
                        ? 'bg-gray-800 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon name="Grid3x3" size={14} className="inline mr-2" />
                    Все категории
                  </button>
                  {categories.map((category) => {
                    return (
                      <div 
                        key={category.name}
                        className="relative"
                      >
                        <button
                          onClick={(e) => {
                            const menuElement = document.getElementById('categories-menu');
                            if (menuElement) {
                              const menuRect = menuElement.getBoundingClientRect();
                              const viewportHeight = window.innerHeight;
                              setMenuPosition({
                                top: viewportHeight / 2 - 160,
                                left: menuRect.right + 8
                              });
                            }
                            if (hoveredCategory === category.name) {
                              setHoveredCategory(null);
                            } else {
                              setHoveredCategory(category.name);
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left flex items-center justify-between ${
                            selectedCategory === category.name 
                              ? `${getCategoryColor(category.name)} text-white shadow-md` 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span>
                            <Icon name={category.icon as any} size={14} className="inline mr-2" />
                            {category.name}
                          </span>
                          <Icon name="ChevronRight" size={14} className="opacity-50" />
                        </button>
                        
                        {hoveredCategory === category.name && category.subcategories && (
                          <>
                            <div 
                              className="fixed inset-0 z-[99998]"
                              onClick={() => setHoveredCategory(null)}
                            />
                            <div 
                              className="fixed w-64 bg-white rounded-xl shadow-2xl border-2 border-purple-200 p-4 z-[99999] animate-in slide-in-from-left-2 duration-200"
                              style={{ 
                                top: `${menuPosition.top}px`,
                                left: `${menuPosition.left}px`
                              }}
                            >
                              <h4 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                                <Icon name="Grid2x2" size={14} />
                                {category.name}
                              </h4>
                              <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin">
                                <button
                                  onClick={() => {
                                    setSelectedCategory(category.name);
                                    setSelectedSubcategory(null);
                                    setHoveredCategory(null);
                                    scrollToTop();
                                  }}
                                  className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                                    selectedCategory === category.name && !selectedSubcategory
                                      ? `${getCategoryColor(category.name)} text-white shadow-md`
                                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                                  }`}
                                >
                                  Все в категории
                                </button>
                                {category.subcategories.map((subcategory) => (
                                  <button
                                    key={subcategory}
                                    onClick={() => {
                                      setSelectedCategory(category.name);
                                      setSelectedSubcategory(subcategory);
                                      setHoveredCategory(null);
                                      scrollToTop();
                                    }}
                                    className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                                      selectedSubcategory === subcategory && selectedCategory === category.name
                                        ? `${getCategoryColor(category.name)} text-white shadow-md`
                                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                                    }`}
                                  >
                                    {subcategory}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSelectedCity(null);
                  setSortBy('date');
                  setSortDirection('desc');
                  scrollToTop();
                }}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
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
              className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(null);
                  scrollToTop();
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
                    scrollToTop();
                  }}
                  className="whitespace-nowrap font-medium text-sm"
                >
                  <Icon name={category.icon as any} size={14} className="mr-1.5" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div>
              {filteredRequests.map((request, index) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  index={index}
                  contentTopRef={contentTopRef}
                  favorites={favorites}
                  isAuthenticated={isAuthenticated}
                  onToggleFavorite={() => {
                    if (!isAuthenticated) {
                      setIsLoginOpen(true);
                    } else {
                      const itemKey = `request-${request.id}`;
                      if (favorites.includes(itemKey)) {
                        setFavorites(favorites.filter(id => id !== itemKey));
                      } else {
                        setFavorites([...favorites, itemKey]);
                      }
                    }
                  }}
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
            </div>
          </div>
        )}

        {activeTab === 'offers' && (
          <div 
            className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-left-4 duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:hidden">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(null);
                  scrollToTop();
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
                    scrollToTop();
                  }}
                  className="whitespace-nowrap font-medium text-sm"
                >
                  <Icon name={category.icon as any} size={14} className="mr-1.5" />
                  {category.name}
                </Button>
              ))}
            </div>

            <div>
              {filteredOffers.map((offer, index) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  index={index}
                  offersTopRef={offersTopRef}
                  favorites={favorites}
                  isAuthenticated={isAuthenticated}
                  onToggleFavorite={() => {
                    if (!isAuthenticated) {
                      setIsLoginOpen(true);
                    } else {
                      const itemKey = `offer-${offer.id}`;
                      if (favorites.includes(itemKey)) {
                        setFavorites(favorites.filter(id => id !== itemKey));
                      } else {
                        setFavorites([...favorites, itemKey]);
                      }
                    }
                  }}
                  onViewClick={() => {
                    setSelectedItem(offer);
                    setIsViewModalOpen(true);
                  }}
                  onContactClick={() => {
                    if (!isAuthenticated) {
                      setIsLoginOpen(true);
                    } else {
                      setIsChatOpen(true);
                    }
                  }}
                  onAuthorClick={() => {
                    if (mockUserProfiles[offer.author]) {
                      setSelectedUserProfile(mockUserProfiles[offer.author]);
                      setIsUserProfileOpen(true);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div 
            className="space-y-4 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
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
                {mockRequests.filter(req => favorites.includes(`request-${req.id}`)).map((request, index) => (
                  <Card 
                    key={request.id}
                    ref={index === 0 ? favoritesTopRef : null}
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
                            setFavorites(favorites.filter(id => id !== `request-${request.id}`));
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
                {mockOffers.filter(offer => favorites.includes(`offer-${offer.id}`)).map((offer, index) => (
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
                            setFavorites(favorites.filter(id => id !== `offer-${offer.id}`));
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
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500">
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
            <div className="sticky top-0 bg-gray-100 p-4 sm:p-6 rounded-t-2xl flex items-center justify-between z-10 border-b border-gray-200 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Создать объявление</h2>
              <button 
                onClick={() => setIsCreateFormOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Icon name="X" size={24} className="text-gray-700" />
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formType === 'request' ? 'Бюджет' : 'Цена'}
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder={formType === 'request' ? 'Например: до 120 000 ₽' : 'Например: 85 000 ₽'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Описание *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Подробно опишите что вы ищете или предлагаете..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 resize-none transition-all bg-gray-50"
                />
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
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
          <DialogHeader className="bg-gray-100 p-6 border-b border-gray-200 -m-6 mb-6 rounded-t-2xl shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="User" size={22} className="text-white" />
              </div>
              <DialogTitle className="text-xl font-bold text-center text-gray-900">Мой Профиль</DialogTitle>
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 bg-gradient-orange-pink">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-transparent text-white text-3xl font-bold">
                    {profileData.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <h2 className="text-3xl font-bold">Александр</h2>
              <p className="text-gray-600 mt-1">Пользователь с октября 2024</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                <Icon name="FileText" size={20} className="mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-gray-800">5</p>
                <p className="text-sm text-gray-600">Запросов</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl">
                <Icon name="MessageCircle" size={20} className="mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-sm text-gray-600">Откликов</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                <Icon name="Star" size={20} className="mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold text-gray-800">4.8</p>
                <p className="text-sm text-gray-600">Рейтинг</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsProfileEditOpen(true);
                }}
                variant="outline" 
                className="w-full justify-start font-medium"
              >
                <Icon name="Settings" size={18} className="mr-3" />
                Настройки профиля
              </Button>
              <Button variant="outline" className="w-full justify-start font-medium">
                <Icon name="Bell" size={18} className="mr-3" />
                Уведомления
              </Button>
              <Button 
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsSupportOpen(true);
                }}
                variant="outline" 
                className="w-full justify-start font-medium"
              >
                <Icon name="HelpCircle" size={18} className="mr-3" />
                Помощь
              </Button>
              <Button 
                onClick={() => {
                  setIsProfileOpen(false);
                  setIsAuthenticated(false);
                }}
                variant="outline" 
                className="w-full justify-start font-medium text-red-600 hover:text-red-700"
              >
                <Icon name="LogOut" size={18} className="mr-3" />
                Выйти
              </Button>
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
  );
};

export default Index;