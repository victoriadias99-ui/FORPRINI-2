import React, { useState } from 'react';
import { Product, ConfigData } from '../types';
import { PRODUCTS } from '../constants';

interface ConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ConfiguratorModal: React.FC<ConfiguratorProps> = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  // Mock 7 products as requested (using existing ones + some dummies if needed)
  const displayProducts = [...PRODUCTS, {
    id: 'p7',
    name: 'FORPRINI Aura',
    tagline: 'Pure essence.',
    description: 'A minimalist speaker with stone finish.',
    price: 299,
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=1000',
    features: ['Stone finish', 'Bluetooth 5.2']
  }].slice(0, 7);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F5F2EB] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-[#D6D1C7] flex justify-between items-center">
          <h2 className="text-2xl font-serif text-[#2C2A26]">Empiece por elegir el producto</h2>
          <button onClick={onClose} className="text-[#A8A29E] hover:text-[#2C2A26]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => onSelectProduct(p as Product)}
                className="group cursor-pointer bg-white border border-[#D6D1C7] hover:border-[#2C2A26] transition-all p-4"
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <h3 className="font-serif text-lg text-[#2C2A26]">{p.name}</h3>
                <p className="text-xs text-[#A8A29E] uppercase tracking-widest mt-1">{p.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConfiguratorFormProps {
  product: Product;
  onBack: () => void;
  onComplete: (data: ConfigData) => void;
}

export const ConfiguratorForm: React.FC<ConfiguratorFormProps> = ({ product, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ConfigData>({
    productId: product.id,
    complementos: []
  });

  const handleNext = () => setStep(prev => prev + 1);

  const updateData = (key: keyof ConfigData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleComplemento = (comp: string) => {
    const current = data.complementos || [];
    if (current.includes(comp)) {
      updateData('complementos', current.filter(c => c !== comp));
    } else {
      updateData('complementos', [...current, comp]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 animate-fade-in-up">
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] mb-12 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Volver a productos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover grayscale" />
          <div className="mt-8">
            <h2 className="text-3xl font-serif text-[#2C2A26] mb-2">{product.name}</h2>
            <p className="text-[#5D5A53] font-light leading-relaxed">{product.description}</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Step 1: Formato */}
          <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Paso 1: Formato</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Estándar', 'Premium', 'Compacto', 'Extendido'].map(f => (
                <button 
                  key={f}
                  onClick={() => { updateData('formato', f); if(step === 1) handleNext(); }}
                  className={`px-6 py-4 border text-sm transition-all ${data.formato === f ? 'bg-[#2C2A26] text-white border-[#2C2A26]' : 'bg-white border-[#D6D1C7] text-[#2C2A26] hover:border-[#2C2A26]'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Material */}
          {data.formato && (
            <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Paso 2: Material</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Arenisca', 'Aluminio', 'Madera Orgánica', 'Cerámica'].map(m => (
                  <button 
                    key={m}
                    onClick={() => { updateData('material', m); if(step === 2) handleNext(); }}
                    className={`px-6 py-4 border text-sm transition-all ${data.material === m ? 'bg-[#2C2A26] text-white border-[#2C2A26]' : 'bg-white border-[#D6D1C7] text-[#2C2A26] hover:border-[#2C2A26]'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Acabado */}
          {data.material && (
            <div className={`transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Paso 3: Acabado</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Mate', 'Pulido', 'Texturizado', 'Natural'].map(a => (
                  <button 
                    key={a}
                    onClick={() => { updateData('acabado', a); if(step === 3) handleNext(); }}
                    className={`px-6 py-4 border text-sm transition-all ${data.acabado === a ? 'bg-[#2C2A26] text-white border-[#2C2A26]' : 'bg-white border-[#D6D1C7] text-[#2C2A26] hover:border-[#2C2A26]'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Complementos */}
          {data.acabado && (
            <div className={`transition-all duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Paso 4: Complementos</h3>
              <div className="grid grid-cols-1 gap-3">
                {['Funda de viaje', 'Cable trenzado', 'Soporte de mesa', 'Kit de limpieza'].map(c => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={data.complementos?.includes(c)}
                      onChange={() => toggleComplemento(c)}
                      className="w-5 h-5 accent-[#2C2A26]"
                    />
                    <span className="text-[#2C2A26] text-sm group-hover:opacity-70 transition-opacity">{c}</span>
                  </label>
                ))}
              </div>
              {step === 4 && (
                <button 
                  onClick={handleNext}
                  className="mt-6 text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:text-[#A8A29E]"
                >
                  Continuar
                </button>
              )}
            </div>
          )}

          {/* Step 5: Fecha y cantidad */}
          {data.complementos && data.complementos.length >= 0 && step >= 5 && (
            <div className={`transition-all duration-500 ${step >= 5 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Paso 5: Fecha y cantidad</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#5D5A53]">Fecha de entrega deseada</label>
                  <input 
                    type="date" 
                    onChange={(e) => updateData('fecha', e.target.value)}
                    className="bg-white border border-[#D6D1C7] p-3 outline-none focus:border-[#2C2A26] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#5D5A53]">Cantidad</label>
                  <input 
                    type="number" 
                    min="1"
                    defaultValue="1"
                    onChange={(e) => updateData('cantidad', parseInt(e.target.value))}
                    className="bg-white border border-[#D6D1C7] p-3 outline-none focus:border-[#2C2A26] transition-colors"
                  />
                </div>
              </div>

              <button 
                onClick={() => onComplete(data)}
                className="w-full mt-12 bg-[#2C2A26] text-white py-4 uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#444] transition-all"
              >
                Enviar cotización
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
