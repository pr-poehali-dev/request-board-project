import Icon from '@/components/ui/icon';

interface MobileNavProps {
  isAuthenticated: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileNav({ isAuthenticated, activeTab, setActiveTab }: MobileNavProps) {
  return (
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
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
            activeTab === 'requests'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon name="FileText" size={20} />
          <span className="text-[10px] font-medium mt-1">Запросы</span>
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
            activeTab === 'offers'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon name="ShoppingBag" size={20} />
          <span className="text-[10px] font-medium mt-1">Предложения</span>
        </button>

        {isAuthenticated && (
          <>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
                activeTab === 'favorites'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon name="Heart" size={20} />
              <span className="text-[10px] font-medium mt-1">Избранное</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon name="User" size={20} />
              <span className="text-[10px] font-medium mt-1">Профиль</span>
            </button>
          </>
        )}

        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ${
            activeTab === 'search'
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon name="Search" size={20} />
          <span className="text-[10px] font-medium mt-1">Поиск</span>
        </button>
      </div>
    </div>
  );
}
