import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Request, Offer, TabType, LanguageType, SortByType, SortDirectionType } from '@/types';
import { mockRequests, mockOffers } from '@/constants/mockData';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import RequestsList from '@/components/marketplace/RequestsList';
import OffersList from '@/components/marketplace/OffersList';

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [language, setLanguage] = useState<LanguageType>('RU');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [sortBy, setSortBy] = useState<SortByType>('date');
  const [sortDirection, setSortDirection] = useState<SortDirectionType>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
  const [isNewOfferDialogOpen, setIsNewOfferDialogOpen] = useState(false);

  const [newRequestData, setNewRequestData] = useState({
    title: '',
    category: '',
    budget: '',
    description: '',
    city: '',
  });

  const [newOfferData, setNewOfferData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
    city: '',
  });

  const filteredRequests = useMemo(() => {
    let filtered = [...mockRequests];

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    if (selectedCity) {
      filtered = filtered.filter((r) => r.city === selectedCity);
    }

    filtered.sort((a, b) => {
      let aVal: any = a.date || new Date().toISOString();
      let bVal: any = b.date || new Date().toISOString();

      if (sortBy === 'responses') {
        aVal = a.responses;
        bVal = b.responses;
      } else if (sortBy === 'rating') {
        aVal = a.rating;
        bVal = b.rating;
      } else if (sortBy === 'budget') {
        aVal = parseInt(a.budget.replace(/\D/g, '')) || 0;
        bVal = parseInt(b.budget.replace(/\D/g, '')) || 0;
      }

      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedCity, sortBy, sortDirection]);

  const filteredOffers = useMemo(() => {
    let filtered = [...mockOffers];

    if (searchQuery) {
      filtered = filtered.filter(
        (o) =>
          o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((o) => o.category === selectedCategory);
    }

    if (selectedCity) {
      filtered = filtered.filter((o) => o.city === selectedCity);
    }

    filtered.sort((a, b) => {
      let aVal: any = a.date || new Date().toISOString();
      let bVal: any = b.date || new Date().toISOString();

      if (sortBy === 'views') {
        aVal = a.views;
        bVal = b.views;
      } else if (sortBy === 'rating') {
        aVal = a.rating;
        bVal = b.rating;
      } else if (sortBy === 'price') {
        aVal = parseInt(a.price.replace(/\D/g, '')) || 0;
        bVal = parseInt(b.price.replace(/\D/g, '')) || 0;
      }

      return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedCity, sortBy, sortDirection]);

  const handleCreateRequest = () => {
    console.log('Creating request:', newRequestData);
    setIsNewRequestDialogOpen(false);
    setNewRequestData({
      title: '',
      category: '',
      budget: '',
      description: '',
      city: '',
    });
  };

  const handleCreateOffer = () => {
    console.log('Creating offer:', newOfferData);
    setIsNewOfferDialogOpen(false);
    setNewOfferData({
      title: '',
      category: '',
      price: '',
      description: '',
      city: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        setIsNewRequestDialogOpen={setIsNewRequestDialogOpen}
        setIsNewOfferDialogOpen={setIsNewOfferDialogOpen}
      />

      <MarketplaceFilters
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        minBudget={minBudget}
        setMinBudget={setMinBudget}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <main className="container py-8">
        {activeTab === 'requests' ? (
          <RequestsList requests={filteredRequests} />
        ) : (
          <OffersList offers={filteredOffers} />
        )}
      </main>

      <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать новый запрос</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название</label>
              <Input
                placeholder="Что вы ищете?"
                value={newRequestData.title}
                onChange={(e) => setNewRequestData({ ...newRequestData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Описание</label>
              <Textarea
                placeholder="Подробное описание запроса"
                value={newRequestData.description}
                onChange={(e) => setNewRequestData({ ...newRequestData, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Категория</label>
                <Input
                  placeholder="Категория"
                  value={newRequestData.category}
                  onChange={(e) => setNewRequestData({ ...newRequestData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Бюджет</label>
                <Input
                  placeholder="до 50 000 ₽"
                  value={newRequestData.budget}
                  onChange={(e) => setNewRequestData({ ...newRequestData, budget: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Город</label>
              <Input
                placeholder="Город"
                value={newRequestData.city}
                onChange={(e) => setNewRequestData({ ...newRequestData, city: e.target.value })}
              />
            </div>
            <Button onClick={handleCreateRequest} className="w-full">
              Создать запрос
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewOfferDialogOpen} onOpenChange={setIsNewOfferDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать новое предложение</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Название</label>
              <Input
                placeholder="Что вы предлагаете?"
                value={newOfferData.title}
                onChange={(e) => setNewOfferData({ ...newOfferData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Описание</label>
              <Textarea
                placeholder="Подробное описание предложения"
                value={newOfferData.description}
                onChange={(e) => setNewOfferData({ ...newOfferData, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Категория</label>
                <Input
                  placeholder="Категория"
                  value={newOfferData.category}
                  onChange={(e) => setNewOfferData({ ...newOfferData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Цена</label>
                <Input
                  placeholder="50 000 ₽"
                  value={newOfferData.price}
                  onChange={(e) => setNewOfferData({ ...newOfferData, price: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Город</label>
              <Input
                placeholder="Город"
                value={newOfferData.city}
                onChange={(e) => setNewOfferData({ ...newOfferData, city: e.target.value })}
              />
            </div>
            <Button onClick={handleCreateOffer} className="w-full">
              Создать предложение
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
