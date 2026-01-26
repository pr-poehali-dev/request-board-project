import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Screen = 'start' | 'menu' | 'catalog' | 'drops' | 'product';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  status: 'available' | 'sold';
  isDrop?: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Hoodie Black', price: '4 990₽', image: '🖤', status: 'available' },
  { id: 2, name: 'T-Shirt White', price: '2 490₽', image: '🤍', status: 'available' },
  { id: 3, name: 'Cap Limited', price: '1 990₽', image: '🧢', status: 'sold', isDrop: true },
  { id: 4, name: 'Sneakers Pro', price: '8 990₽', image: '👟', status: 'available', isDrop: true },
  { id: 5, name: 'Jacket Winter', price: '12 990₽', image: '🧥', status: 'available' },
  { id: 6, name: 'Bag Street', price: '3 490₽', image: '🎒', status: 'available' },
];

export default function Shop() {
  const [screen, setScreen] = useState<Screen>('start');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const drops = products.filter(p => p.isDrop);

  const MenuItem = ({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 p-6 transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <div className="text-7xl drop-shadow-2xl filter brightness-110 group-hover:brightness-125 transition-all duration-300 transform group-hover:-translate-y-2">
        {icon}
      </div>
      <span className="text-white/90 text-sm font-medium tracking-wider uppercase drop-shadow-lg">
        {label}
      </span>
    </button>
  );

  const ProductCard = ({ product }: { product: Product }) => (
    <button
      onClick={() => {
        setSelectedProduct(product);
        setScreen('product');
      }}
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95"
    >
      {product.isDrop && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          DROP
        </div>
      )}
      <div className="text-6xl mb-4 filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">
        {product.image}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-emerald-400 font-bold text-xl mb-3">{product.price}</p>
      <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${
        product.status === 'available' 
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
          : 'bg-red-500/20 text-red-400 border border-red-500/50'
      }`}>
        {product.status === 'available' ? 'В наличии' : 'Поздно'}
      </div>
    </button>
  );

  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center z-10 space-y-12">
          <div className="space-y-4">
            <div className="text-white/40 text-sm font-mono tracking-widest uppercase">
              Memory Card (PS2)/1
            </div>
            <h1 className="text-7xl md:text-8xl font-bold text-white drop-shadow-2xl tracking-tight">
              BRAND
            </h1>
            <div className="text-white/60 text-lg font-mono tracking-wider">
              ◀ Exclusive Store ▶
            </div>
          </div>
          
          <button
            onClick={() => setScreen('menu')}
            className="group relative px-12 py-4 text-white font-bold text-xl tracking-wider uppercase transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 px-12 py-4 rounded-lg border border-white/20">
              <span className="animate-pulse">▶ Press Start</span>
            </div>
          </button>

          <div className="flex items-center justify-center gap-4 text-white/40 text-sm font-mono">
            <Icon name="Circle" size={16} />
            <span>Enter</span>
            <Icon name="Circle" size={16} className="ml-6" />
            <span>Back</span>
            <Icon name="Triangle" size={16} className="ml-6" />
            <span>Options</span>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-right mb-8 space-y-1">
            <div className="text-emerald-400 text-sm font-mono tracking-wider">Your System</div>
            <div className="text-white text-2xl font-bold tracking-wide">Configuration</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
            <MenuItem icon="👕" label="Магазин" onClick={() => setScreen('catalog')} />
            <MenuItem icon="💎" label="Дропы" onClick={() => setScreen('drops')} />
            <MenuItem icon="📦" label="Заказы" onClick={() => alert('Coming soon')} />
            <MenuItem icon="⚙️" label="Настройки" onClick={() => alert('Coming soon')} />
          </div>

          <div className="text-center space-y-4">
            <div className="text-white/60 text-lg font-mono tracking-widest">BRAND STORE</div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 rounded-full bg-white/60"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
          </div>

          <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-8 text-white/60 text-sm font-mono">
            <button onClick={() => setScreen('start')} className="flex items-center gap-2 hover:text-white transition-colors">
              <Icon name="X" size={20} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <button
            onClick={() => setScreen(selectedProduct.isDrop ? 'drops' : 'catalog')}
            className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="font-mono">Назад</span>
          </button>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-3xl p-8 border border-white/10">
            {selectedProduct.isDrop && (
              <div className="text-center mb-6">
                <span className="inline-block bg-red-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg animate-pulse">
                  🔥 LIMITED DROP
                </span>
              </div>
            )}

            <div className="text-center mb-8">
              <div className="text-9xl mb-6 filter drop-shadow-2xl">
                {selectedProduct.image}
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{selectedProduct.name}</h2>
              <p className="text-5xl font-bold text-emerald-400 mb-6">{selectedProduct.price}</p>
              
              <div className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${
                selectedProduct.status === 'available' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}>
                {selectedProduct.status === 'available' ? '✓ В наличии' : '✗ Поздно'}
              </div>
            </div>

            {selectedProduct.status === 'available' ? (
              <button
                onClick={() => alert('Telegram Payments integration')}
                className="w-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold text-xl py-5 rounded-xl border border-white/20 group-hover:scale-105 transition-transform duration-300">
                  🛒 Оформить заказ
                </div>
              </button>
            ) : (
              <div className="w-full bg-gray-700/50 text-gray-400 font-bold text-xl py-5 rounded-xl text-center border border-gray-600/50">
                Товар недоступен
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentProducts = screen === 'drops' ? drops : products;
  const title = screen === 'drops' ? '💎 Limited Drops' : '👕 Каталог';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => setScreen('menu')}
          className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          <span className="font-mono">Меню</span>
        </button>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-2xl">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div className="text-center text-white/40 text-lg font-mono mt-12">
            Пока нет дропов
          </div>
        )}
      </div>
    </div>
  );
}
