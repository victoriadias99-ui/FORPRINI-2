/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import About from './About';
import Journal from './Journal';
import Assistant from './Assistant';
import Footer from './Footer';
import ProductDetail from './ProductDetail';
import JournalDetail from './JournalDetail';
import CartDrawer from './CartDrawer';
import Checkout from './Checkout';
import { ConfiguratorModal, ConfiguratorForm } from './Configurator';
import { Product, JournalArticle, ViewState, ConfigData } from './types';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we are not home, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const handleConfigComplete = (data: ConfigData) => {
    console.log('Configuración completada:', data);
    setView({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && (
        <Navbar 
            onNavClick={handleNavClick} 
            onOpenConfigurator={() => setIsConfigModalOpen(true)}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero onConfigurar={() => setIsConfigModalOpen(true)} />
            <ProductGrid onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
            }} />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />

            {/* Final CTA Section */}
            <section className="py-32 bg-[#EBE7DE] flex flex-col items-center justify-center text-center px-6 border-t border-[#D6D1C7]">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#A8A29E] mb-8">Tu espacio, tu diseño</span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#2C2A26] mb-12 max-w-3xl leading-tight">
                Crea un objeto que <span className="italic">resuene</span> contigo.
              </h2>
              <button 
                onClick={() => setIsConfigModalOpen(true)}
                className="group relative px-12 py-5 bg-[#2C2A26] text-[#F5F2EB] rounded-full text-sm font-semibold uppercase tracking-[0.2em] hover:bg-[#444] transition-all shadow-xl hover:shadow-2xl"
              >
                Configurar ahora
              </button>
            </section>

            {/* Integration Code Section */}
            <section className="py-20 bg-white border-t border-[#D6D1C7] px-6">
               <div className="max-w-4xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C2A26] mb-2">Código de Integración</h3>
                      <p className="text-xs text-[#A8A29E]">Copia este código para usar el botón en Systeme.io u otras plataformas.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const code = `<!-- Sección Final CTA FORPRINI para Systeme.io -->
<div class="forprini-final-cta">
  <span class="cta-label">Tu espacio, tu diseño</span>
  <h2 class="cta-title">Crea un objeto que <span class="italic">resuene</span> contigo.</h2>
  
  <a href="${window.location.origin}" class="forprini-btn-final">
    Configurar ahora
  </a>
</div>

<style>
  /* Importación de fuentes */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');

  .forprini-final-cta {
    text-align: center;
    padding: 80px 20px;
    background-color: #EBE7DE; /* Fondo crema de la sección final */
    font-family: 'Inter', sans-serif;
    border-top: 1px solid #D6D1C7;
  }

  .cta-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: #A8A29E;
    margin-bottom: 30px;
  }

  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    color: #2C2A26;
    margin-bottom: 50px;
    line-height: 1.2;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-title .italic {
    font-style: italic;
  }

  .forprini-btn-final {
    display: inline-block;
    background-color: #2C2A26;
    color: #F5F2EB !important;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    padding: 20px 50px;
    border-radius: 50px;
    text-decoration: none !important;
    transition: all 0.4s ease;
    box-shadow: 0 10px 25px rgba(44, 42, 38, 0.2);
    cursor: pointer;
  }

  .forprini-btn-final:hover {
    background-color: #444444;
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(44, 42, 38, 0.3);
  }

  /* Adaptación para móviles */
  @media (max-width: 768px) {
    .cta-title {
      font-size: 32px;
    }
    .forprini-btn-final {
      width: 80%;
      padding: 18px 20px;
    }
  }
</style>`;
                        navigator.clipboard.writeText(code);
                        alert('Código copiado al portapapeles');
                      }}
                      className="px-6 py-2 border border-[#2C2A26] text-[10px] uppercase tracking-widest hover:bg-[#2C2A26] hover:text-white transition-all"
                    >
                      Copiar Código
                    </button>
                  </div>
                  <div className="bg-[#F5F2EB] p-6 rounded border border-[#D6D1C7] overflow-hidden">
                    <pre className="text-[10px] text-[#5D5A53] leading-relaxed overflow-x-auto whitespace-pre-wrap max-h-[300px]">
{`<!-- Sección Final CTA FORPRINI para Systeme.io -->
<div class="forprini-final-cta">
  <span class="cta-label">Tu espacio, tu diseño</span>
  <h2 class="cta-title">Crea un objeto que <span class="italic">resuene</span> contigo.</h2>
  
  <a href="${window.location.origin}" class="forprini-btn-final">
    Configurar ahora
  </a>
</div>

<style>
  /* Estilos optimizados... */
</style>`}
                    </pre>
                  </div>
               </div>
            </section>
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
            />
        )}

        {view.type === 'configurator' && (
          <ConfiguratorForm 
            product={view.product as Product} 
            onBack={() => setView({ type: 'home' })}
            onComplete={handleConfigComplete}
          />
        )}
      </main>

      {view.type !== 'checkout' && <Footer onLinkClick={handleNavClick} />}
      
      <Assistant />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />

      <ConfiguratorModal 
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSelectProduct={(p) => {
          setIsConfigModalOpen(false);
          setView({ type: 'configurator', step: 1, data: { productId: p.id }, product: p } as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
