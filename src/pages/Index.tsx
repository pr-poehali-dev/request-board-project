import { useState } from 'react';
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
}

const categories = [
  { name: 'Электроника', icon: 'Smartphone', color: 'bg-gradient-orange-cyan' },
  { name: 'Одежда', icon: 'ShoppingBag', color: 'bg-gradient-cyan-yellow' },
  { name: 'Услуги', icon: 'Wrench', color: 'bg-gradient-orange-yellow' },
  { name: 'Недвижимость', icon: 'Home', color: 'bg-gradient-orange-cyan' },
  { name: 'Транспорт', icon: 'Car', color: 'bg-gradient-cyan-yellow' },
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
    description: 'Нужен iPhone 15 Pro в хорошем состоянии, желательно с гарантией'
  },
  {
    id: 2,
    title: 'Требуется мастер по ремонту',
    category: 'Услуги',
    budget: 'договорная',
    author: 'Мария',
    rating: 4.9,
    responses: 8,
    description: 'Ремонт квартиры, необходим опытный специалист'
  },
  {
    id: 3,
    title: 'Куплю MacBook Air M2',
    category: 'Электроника',
    budget: 'до 90 000 ₽',
    author: 'Дмитрий',
    rating: 4.7,
    responses: 15,
    description: 'Интересует MacBook Air на M2, новый или б/у в отличном состоянии'
  },
  {
    id: 4,
    title: 'Ищу репетитора английского',
    category: 'Услуги',
    budget: '1500 ₽/час',
    author: 'Елена',
    rating: 5.0,
    responses: 23,
    description: 'Нужен репетитор для подготовки к IELTS, уровень Intermediate'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('requests');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-cyan-50 to-yellow-50">
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-orange-cyan flex items-center justify-center">
                <Icon name="MessageSquare" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-800">Запросы</span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              <Button 
                variant={activeTab === 'requests' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('requests')}
                className="font-medium"
              >
                <Icon name="List" size={18} className="mr-2" />
                Запросы
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
                variant={activeTab === 'my-requests' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('my-requests')}
                className="font-medium"
              >
                <Icon name="FileText" size={18} className="mr-2" />
                Мои запросы
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

            <Button className="bg-gradient-orange-cyan text-white hover:opacity-90 font-semibold shadow-lg">
              <Icon name="Plus" size={18} className="mr-2" />
              Создать запрос
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
            <Icon name="List" size={20} />
            <span className="text-xs mt-1">Запросы</span>
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
            onClick={() => setActiveTab('my-requests')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
              activeTab === 'my-requests' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
          >
            <Icon name="FileText" size={20} />
            <span className="text-xs mt-1">Мои</span>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        {activeTab === 'requests' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                Найди то, что ищешь
              </h1>
              <p className="text-lg text-gray-600">
                Создай запрос и получи предложения от тысяч продавцов
              </p>
            </div>

            <div className="grid gap-4">
              {mockRequests.map((request, index) => (
                <Card 
                  key={request.id} 
                  className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-gradient-orange-cyan text-white border-0">
                            {request.category}
                          </Badge>
                          <Badge variant="outline" className="font-semibold text-gray-700">
                            {request.budget}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl mb-2">{request.title}</CardTitle>
                        <CardDescription className="text-base">
                          {request.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-10 h-10 bg-gradient-cyan-yellow">
                            <AvatarFallback className="bg-transparent text-white font-semibold">
                              {request.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{request.author}</p>
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{request.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 text-gray-600">
                          <Icon name="MessageCircle" size={18} />
                          <span className="text-sm font-medium">{request.responses}</span>
                        </div>
                      </div>

                      <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold">
                        Откликнуться
                        <Icon name="Send" size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Категории</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category, index) => (
                <Card 
                  key={category.name}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center`}>
                        <Icon name={category.icon as any} size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                        <p className="text-sm text-gray-600">Активных запросов: {Math.floor(Math.random() * 50 + 10)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'my-requests' && (
          <div className="space-y-6 animate-fade-in text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-orange-cyan rounded-full flex items-center justify-center">
              <Icon name="FileText" size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Мои запросы</h2>
            <p className="text-gray-600 text-lg">Здесь будут отображаться ваши запросы</p>
            <Button className="bg-gradient-orange-cyan text-white hover:opacity-90 font-semibold shadow-lg">
              <Icon name="Plus" size={18} className="mr-2" />
              Создать первый запрос
            </Button>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-gradient-orange-cyan">
                  <AvatarFallback className="bg-transparent text-white text-3xl font-bold">
                    А
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl">Александр</CardTitle>
                <CardDescription className="text-base">Пользователь с октября 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                    <Icon name="FileText" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-gray-800">5</p>
                    <p className="text-sm text-gray-600">Запросов</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-xl">
                    <Icon name="MessageCircle" size={24} className="mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold text-gray-800">12</p>
                    <p className="text-sm text-gray-600">Откликов</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl">
                    <Icon name="Star" size={24} className="mx-auto mb-2 text-accent" />
                    <p className="text-2xl font-bold text-gray-800">4.8</p>
                    <p className="text-sm text-gray-600">Рейтинг</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-base font-medium">
                    <Icon name="Settings" size={20} className="mr-3" />
                    Настройки профиля
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-base font-medium">
                    <Icon name="Bell" size={20} className="mr-3" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-base font-medium">
                    <Icon name="HelpCircle" size={20} className="mr-3" />
                    Помощь
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
