import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Category } from '@/types';

interface SidebarProps {
  categories: Category[];
  cities: string[];
  selectedCategory: string | null;
  selectedCity: string | null;
  sortBy: string;
  onCategorySelect: (category: string | null) => void;
  onCitySelect: (city: string | null) => void;
  onSortChange: (sort: 'date' | 'popular' | 'price') => void;
  getCategoryCount: (categoryName: string) => number;
}

export default function Sidebar({
  categories,
  cities,
  selectedCategory,
  selectedCity,
  sortBy,
  onCategorySelect,
  onCitySelect,
  onSortChange,
  getCategoryCount,
}: SidebarProps) {
  return (
    <div className="hidden md:block md:w-72 lg:w-80 flex-shrink-0">
      <div className="sticky top-20 space-y-4">
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={18} />
              Фильтры
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Сортировка</label>
              <div className="space-y-2">
                <Button
                  variant={sortBy === 'date' ? 'default' : 'outline'}
                  onClick={() => onSortChange('date')}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  <Icon name="Clock" size={14} className="mr-2" />
                  По дате
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  onClick={() => onSortChange('popular')}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  <Icon name="TrendingUp" size={14} className="mr-2" />
                  По популярности
                </Button>
                <Button
                  variant={sortBy === 'price' ? 'default' : 'outline'}
                  onClick={() => onSortChange('price')}
                  className="w-full justify-start text-sm"
                  size="sm"
                >
                  <Icon name="DollarSign" size={14} className="mr-2" />
                  По цене
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Город</label>
                {selectedCity && (
                  <button
                    onClick={() => onCitySelect(null)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Сбросить
                  </button>
                )}
              </div>
              <select
                value={selectedCity || ''}
                onChange={(e) => onCitySelect(e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="">Все города</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Icon name="Grid3x3" size={18} />
                Категории
              </CardTitle>
              {selectedCategory && (
                <button
                  onClick={() => onCategorySelect(null)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Сбросить
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <Button
                variant={selectedCategory === null ? 'default' : 'ghost'}
                onClick={() => onCategorySelect(null)}
                className="w-full justify-start text-sm font-medium h-9"
              >
                <Icon name="LayoutGrid" size={16} className="mr-2" />
                Все категории
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'ghost'}
                  onClick={() => onCategorySelect(category.name)}
                  className="w-full justify-start text-sm font-medium h-9"
                >
                  <Icon name={category.icon as any} size={16} className="mr-2" />
                  <span className="flex-1 text-left">{category.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {getCategoryCount(category.name)}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
