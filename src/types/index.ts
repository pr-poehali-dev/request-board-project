export interface Request {
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

export interface Offer {
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

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  author: string;
}

export interface ChatDialog {
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

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface UserProfile {
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

export interface Category {
  name: string;
  icon: string;
  color: string;
  popular: boolean;
  subcategories?: string[];
}

export type TabType = 'requests' | 'offers';
export type LanguageType = 'RU' | 'EN';
export type SortByType = 'date' | 'responses' | 'rating' | 'budget' | 'views' | 'price';
export type SortDirectionType = 'asc' | 'desc';