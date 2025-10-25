import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

import { Notification, ChatDialog } from '@/types';

interface ProfileData {
  name: string;
}

interface HeaderProps {
  isAuthenticated: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (category: string | null) => void;
  favorites: string[];
  setIsProfileModalOpen: (open: boolean) => void;
  notifications: Notification[];
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  dialogs: ChatDialog[];
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  language: 'ru' | 'ua';
  setLanguage: (language: 'ru' | 'ua') => void;
  setIsLoginOpen: (open: boolean) => void;
  avatarPreview: string;
  profileData: ProfileData;
  setIsCreateFormOpen: (open: boolean) => void;
}

const totalUnread = (dialogs: ChatDialog[]) => dialogs.reduce((sum, d) => sum + d.unread, 0);

export default function Header({
  isAuthenticated,
  searchQuery,
  setSearchQuery,
  setActiveTab,
  setSelectedCategory,
  favorites,
  notifications,
  isNotificationsOpen,
  setIsNotificationsOpen,
  dialogs,
  isChatOpen,
  setIsChatOpen,
  language,
  setLanguage,
  setIsLoginOpen,
  avatarPreview,
  profileData,
  setIsCreateFormOpen,
  setIsProfileModalOpen,
}: HeaderProps) {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
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
                {totalUnread(dialogs) > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white text-[10px] flex items-center justify-center font-semibold shadow-lg">
                    {totalUnread(dialogs)}
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
              onClick={() => setIsProfileModalOpen(true)}
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
              className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-blue-600 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 px-6 h-11 rounded-2xl hover:scale-105 border border-white/40 overflow-hidden group backdrop-blur-sm"
              title="Создать объявление"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-white/10"></div>
              <Icon name="Sparkles" size={20} className="mr-2 relative z-10" />
              <span className="relative z-10 tracking-wide">Создать</span>
            </Button>
          )}
          </div>
        </div>

      </div>
    </nav>
  );
}