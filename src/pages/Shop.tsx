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
      className="group flex flex-col items-center gap-4 p-6 transition-all duration-200 hover:scale-110 active:scale-95 relative"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-magenta-500 to-yellow-400 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative text-7xl filter drop-shadow-2xl transform group-hover:rotate-6 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <span className="retro-pixel text-cyan-300 text-[10px] tracking-widest uppercase retro-glow group-hover:text-magenta-400 transition-colors">
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
      className="group relative bg-gradient-to-br from-purple-900/80 via-black to-blue-900/80 rounded-none p-6 border-4 border-cyan-400 hover:border-magenta-400 transition-all duration-300 hover:scale-105 active:scale-95 retro-border overflow-hidden"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)] pointer-events-none"></div>
      
      {product.isDrop && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 text-black retro-pixel text-[8px] px-3 py-1 border-2 border-black animate-pulse shadow-lg">
          ★DROP★
        </div>
      )}
      
      <div className="relative text-7xl mb-4 filter drop-shadow-2xl group-hover:scale-125 transition-transform duration-500">
        {product.image}
      </div>
      
      <h3 className="text-yellow-300 font-bold text-lg mb-2 retro-glow">{product.name}</h3>
      <p className="text-lime-400 font-bold text-2xl mb-3 retro-glow retro-pixel text-[12px]">{product.price}</p>
      
      <div className={`inline-block px-4 py-2 border-2 retro-pixel text-[8px] ${
        product.status === 'available' 
          ? 'bg-lime-500 text-black border-lime-300 shadow-[0_0_20px_rgba(0,255,0,0.5)]' 
          : 'bg-red-500 text-black border-red-300 shadow-[0_0_20px_rgba(255,0,0,0.5)]'
      }`}>
        {product.status === 'available' ? '✓ ON' : '✗ OFF'}
      </div>
    </button>
  );

  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden retro-scanline retro-crt">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]"></div>
        </div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-magenta-500 to-transparent rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-yellow-500 to-transparent rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center space-y-12 p-8">
            <div className="space-y-6">
              <div className="retro-pixel text-cyan-400 text-[10px] tracking-widest uppercase retro-glow animate-pulse">
                &lt;&lt; MEMORY CARD (PS2)/1 &gt;&gt;
              </div>
              
              <div className="relative inline-block">
                <h1 className="retro-pixel text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 retro-glow animate-pulse">
                  BRAND
                </h1>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 blur-2xl opacity-50"></div>
              </div>
              
              <div className="retro-pixel text-lime-400 text-[12px] tracking-widest retro-glow">
                ◀◀◀ EXCLUSIVE STORE ▶▶▶
              </div>
            </div>
            
            <button
              onClick={() => setScreen('menu')}
              className="group relative inline-block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative retro-pixel text-[14px] bg-black text-yellow-300 px-12 py-6 border-4 border-cyan-400 hover:border-magenta-400 retro-glow hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                <span className="animate-[blink_1s_infinite]">▶</span> PRESS START
              </div>
            </button>

            <div className="flex items-center justify-center gap-6 retro-pixel text-[8px] text-cyan-300/60">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-current rounded-full"></span>
                <span>ENTER</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-current rounded-full"></span>
                <span>BACK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-current"></span>
                <span>OPTIONS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden retro-scanline retro-crt">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,255,0.03)_2px,rgba(255,0,255,0.03)_4px)]"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-magenta-500 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-right mb-12 space-y-2 border-4 border-yellow-400 bg-black/80 p-4 inline-block ml-auto">
            <div className="retro-pixel text-lime-400 text-[8px] tracking-wider retro-glow">YOUR SYSTEM</div>
            <div className="retro-pixel text-cyan-400 text-[14px] tracking-wide retro-glow">CONFIG</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto mb-20">
            <MenuItem icon="👕" label="SHOP" onClick={() => setScreen('catalog')} />
            <MenuItem icon="💎" label="DROPS" onClick={() => setScreen('drops')} />
            <MenuItem icon="📦" label="ORDERS" onClick={() => alert('Coming soon')} />
            <MenuItem icon="⚙️" label="CONFIG" onClick={() => alert('Coming soon')} />
          </div>

          <div className="text-center space-y-6">
            <div className="retro-pixel text-magenta-400 text-[16px] tracking-widest retro-glow animate-pulse">
              ≡ BRAND STORE ≡
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-magenta-500 shadow-[0_0_20px_rgba(0,255,255,0.8)] animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-white/20 border-2 border-cyan-400"></div>
            </div>
          </div>

          <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center">
            <button 
              onClick={() => setScreen('start')} 
              className="retro-pixel text-[10px] text-cyan-300 hover:text-magenta-400 transition-colors flex items-center gap-3 bg-black/80 px-6 py-3 border-2 border-cyan-400 hover:border-magenta-400 retro-glow"
            >
              <Icon name="X" size={16} />
              <span>BACK</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden retro-scanline retro-crt">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-lime-500 to-transparent rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <button
            onClick={() => setScreen(selectedProduct.isDrop ? 'drops' : 'catalog')}
            className="mb-8 retro-pixel text-[10px] text-cyan-300 hover:text-yellow-300 transition-colors flex items-center gap-3 bg-black/80 px-4 py-2 border-2 border-cyan-400 hover:border-yellow-400"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>&lt;&lt; BACK</span>
          </button>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/50 via-black to-blue-900/50 border-4 border-cyan-400 p-8 relative overflow-hidden retro-border">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,255,255,0.05)_10px,rgba(0,255,255,0.05)_20px)] pointer-events-none"></div>
            
            {selectedProduct.isDrop && (
              <div className="text-center mb-8 relative">
                <div className="inline-block bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 text-black retro-pixel text-[12px] px-8 py-3 border-4 border-black animate-pulse shadow-[0_0_30px_rgba(255,0,0,0.8)]">
                  🔥 LIMITED DROP 🔥
                </div>
              </div>
            )}

            <div className="text-center relative">
              <div className="text-9xl mb-8 filter drop-shadow-2xl inline-block transform hover:scale-110 transition-transform duration-500">
                {selectedProduct.image}
              </div>
              
              <h2 className="retro-pixel text-3xl text-yellow-300 mb-6 retro-glow">{selectedProduct.name}</h2>
              <p className="retro-pixel text-5xl text-lime-400 mb-8 retro-glow animate-pulse">{selectedProduct.price}</p>
              
              <div className={`inline-block px-8 py-3 border-4 retro-pixel text-[12px] mb-8 ${
                selectedProduct.status === 'available' 
                  ? 'bg-lime-500 text-black border-lime-300 shadow-[0_0_30px_rgba(0,255,0,0.8)]' 
                  : 'bg-red-500 text-black border-red-300 shadow-[0_0_30px_rgba(255,0,0,0.8)]'
              }`}>
                {selectedProduct.status === 'available' ? '✓✓ IN STOCK ✓✓' : '✗✗ SOLD OUT ✗✗'}
              </div>
            </div>

            {selectedProduct.status === 'available' ? (
              <button
                onClick={() => alert('Telegram Payments integration')}
                className="w-full group relative mt-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-500 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                <div className="relative retro-pixel text-[14px] bg-black text-lime-400 border-4 border-lime-400 hover:border-magenta-400 py-6 group-hover:scale-105 transition-all duration-300 retro-glow shadow-[0_0_40px_rgba(0,255,0,0.6)]">
                  🛒 &gt;&gt; ORDER NOW &lt;&lt; 🛒
                </div>
              </button>
            ) : (
              <div className="w-full mt-6 retro-pixel text-[14px] bg-black/50 text-red-400 border-4 border-red-500 py-6 text-center">
                ✗ NOT AVAILABLE ✗
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentProducts = screen === 'drops' ? drops : products;
  const title = screen === 'drops' ? '💎 DROPS' : '👕 CATALOG';

  return (
    <div className="min-h-screen bg-black relative overflow-hidden retro-scanline retro-crt">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <button
          onClick={() => setScreen('menu')}
          className="mb-8 retro-pixel text-[10px] text-cyan-300 hover:text-yellow-300 transition-colors flex items-center gap-3 bg-black/80 px-4 py-2 border-2 border-cyan-400 hover:border-yellow-400"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>&lt;&lt; MENU</span>
        </button>

        <div className="text-center mb-12 relative inline-block left-1/2 -translate-x-1/2">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 blur-2xl opacity-50"></div>
          <h2 className="relative retro-pixel text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 retro-glow py-4 px-8 border-4 border-cyan-400 bg-black">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div className="text-center retro-pixel text-[12px] text-red-400 mt-12 retro-glow animate-pulse">
            ✗ NO DROPS AVAILABLE ✗
          </div>
        )}
      </div>
    </div>
  );
}
