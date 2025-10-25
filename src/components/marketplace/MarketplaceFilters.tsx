import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { TabType, SortByType, SortDirectionType } from '@/types';
import { CITIES, CATEGORIES } from '@/constants/data';

interface MarketplaceFiltersProps {
  activeTab: TabType;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  minBudget: string;
  setMinBudget: (budget: string) => void;
  maxBudget: string;
  setMaxBudget: (budget: string) => void;
  sortBy: SortByType;
  setSortBy: (sortBy: SortByType) => void;
  sortDirection: SortDirectionType;
  setSortDirection: (direction: SortDirectionType) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

export default function MarketplaceFilters({
  activeTab,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  showFilters,
  setShowFilters,
}: MarketplaceFiltersProps) {
  const categories = CATEGORIES;
  const cities = CITIES;
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categoryRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedCity(null);
    setMinBudget('');
    setMaxBudget('');
    setSearchQuery('');
    setSelectedSubcategory(null);
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedCity,
    minBudget,
    maxBudget,
    searchQuery,
  ].filter(Boolean).length;

  const getSortLabel = () => {
    const labels: Record<SortByType, string> = {
      date: 'Дате',
      responses: 'Откликам',
      rating: 'Рейтингу',
      budget: 'Бюджету',
    };
    return labels[sortBy];
  };

  return (
    <div className="sticky top-16 z-40 border-b bg-background">
      <div className="container py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="relative" ref={categoryRef}>
              <Button
                variant={selectedCategory ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="gap-2 whitespace-nowrap"
              >
                <Icon name="Grid3x3" className="h-4 w-4" />
                {selectedCategory || 'Категория'}
                <Icon name="ChevronDown" className="h-3 w-3" />
              </Button>

              {showCategoryDropdown && (
                <div className="absolute top-full mt-2 w-80 rounded-lg border bg-background shadow-lg z-50">
                  <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedSubcategory(null);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full justify-start"
                    >
                      Все категории
                    </Button>
                    {categories.map((cat) => (
                      <div key={cat.name}>
                        <Button
                          variant={selectedCategory === cat.name ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setSelectedSubcategory(null);
                          }}
                          className="w-full justify-start gap-2"
                        >
                          <Icon name={cat.icon as any} className="h-4 w-4" />
                          {cat.name}
                        </Button>
                        {selectedCategory === cat.name && cat.subcategories && (
                          <div className="ml-6 mt-1 space-y-1">
                            {cat.subcategories.map((sub) => (
                              <Button
                                key={sub}
                                variant={selectedSubcategory === sub ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => {
                                  setSelectedSubcategory(sub);
                                  setShowCategoryDropdown(false);
                                }}
                                className="w-full justify-start text-xs"
                              >
                                {sub}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={cityRef}>
              <Button
                variant={selectedCity ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="gap-2 whitespace-nowrap"
              >
                <Icon name="MapPin" className="h-4 w-4" />
                {selectedCity || 'Город'}
                <Icon name="ChevronDown" className="h-3 w-3" />
              </Button>

              {showCityDropdown && (
                <div className="absolute top-full mt-2 w-64 rounded-lg border bg-background shadow-lg z-50">
                  <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCity(null);
                        setShowCityDropdown(false);
                      }}
                      className="w-full justify-start"
                    >
                      Все города
                    </Button>
                    {cities.map((city) => (
                      <Button
                        key={city}
                        variant={selectedCity === city ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityDropdown(false);
                        }}
                        className="w-full justify-start"
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 whitespace-nowrap"
            >
              <Icon name="SlidersHorizontal" className="h-4 w-4" />
              Фильтры
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>

            <div className="relative ml-auto" ref={sortRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="gap-2 whitespace-nowrap"
              >
                <Icon name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="h-4 w-4" />
                По {getSortLabel()}
                <Icon name="ChevronDown" className="h-3 w-3" />
              </Button>

              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-background shadow-lg z-50">
                  <div className="p-2 space-y-1">
                    {(['date', 'responses', 'rating', 'budget'] as SortByType[]).map((option) => (
                      <Button
                        key={option}
                        variant={sortBy === option ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                        className="w-full justify-start"
                      >
                        {option === 'date' && 'По дате'}
                        {option === 'responses' && 'По откликам'}
                        {option === 'rating' && 'По рейтингу'}
                        {option === 'budget' && 'По бюджету'}
                      </Button>
                    ))}
                    <div className="my-2 h-px bg-border" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                        setShowSortDropdown(false);
                      }}
                      className="w-full justify-start gap-2"
                    >
                      <Icon name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="h-4 w-4" />
                      {sortDirection === 'asc' ? 'По возрастанию' : 'По убыванию'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="p-4 rounded-lg border bg-muted/50 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Расширенные фильтры</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                  <Icon name="X" className="h-4 w-4" />
                  Очистить
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Поиск</label>
                  <div className="relative">
                    <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={activeTab === 'requests' ? 'Поиск запросов...' : 'Поиск предложений...'}
                      className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Бюджет</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                      placeholder="От"
                      className="w-full px-3 py-2 rounded-md border bg-background"
                    />
                    <input
                      type="text"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                      placeholder="До"
                      className="w-full px-3 py-2 rounded-md border bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
