import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { LanguageType, TabType } from '@/types';

interface MarketplaceHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  setIsNewRequestDialogOpen: (open: boolean) => void;
  setIsNewOfferDialogOpen: (open: boolean) => void;
}

export default function MarketplaceHeader({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  setIsNewRequestDialogOpen,
  setIsNewOfferDialogOpen,
}: MarketplaceHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
            <Icon name="Search" className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              СпросиРынок
            </h1>
            <p className="text-xs text-muted-foreground">Найди что ищешь</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 rounded-lg bg-muted p-1">
            <Button
              variant={activeTab === 'requests' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('requests')}
              className="gap-2"
            >
              <Icon name="ShoppingCart" className="h-4 w-4" />
              <span>Запросы</span>
            </Button>
            <Button
              variant={activeTab === 'offers' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('offers')}
              className="gap-2"
            >
              <Icon name="Package" className="h-4 w-4" />
              <span>Предложения</span>
            </Button>
          </div>

          <div className="flex sm:hidden items-center gap-1 rounded-lg bg-muted p-1">
            <Button
              variant={activeTab === 'requests' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('requests')}
            >
              <Icon name="ShoppingCart" className="h-4 w-4" />
            </Button>
            <Button
              variant={activeTab === 'offers' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('offers')}
            >
              <Icon name="Package" className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'RU' ? 'EN' : 'RU')}
            className="hidden md:flex gap-2"
          >
            <Icon name="Globe" className="h-4 w-4" />
            {language}
          </Button>

          <Button
            size="sm"
            onClick={() =>
              activeTab === 'requests'
                ? setIsNewRequestDialogOpen(true)
                : setIsNewOfferDialogOpen(true)
            }
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Icon name="Plus" className="h-4 w-4" />
            <span className="hidden sm:inline">
              {activeTab === 'requests' ? 'Создать запрос' : 'Создать предложение'}
            </span>
            <span className="sm:hidden">Создать</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
