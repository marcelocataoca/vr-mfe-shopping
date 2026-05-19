import './index.css'
import bag from './assets/images/bag.png'
import logo from './assets/images/logo.png'
import { useCartStore, getTotalQuantity } from '@repo/cart-store'

function App() {

  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const totalQuantity = getTotalQuantity(items);

  return (
      <header className="w-full h-16 bg-[#02D72F]">
      
      {/* Container centralizado */}
      <div className="
        h-full
        max-w-[1280px]
        mx-auto
        px-[25px]
        flex
        items-center
        justify-between
      ">
        
        {/* Logo */}       
         <a href="/" className="flex items-center shrink-0" aria-label="Início">
          <img
            src={logo}
            alt="VR Benefícios"
            className="w-8 h-8 object-contain rounded-md"
          />
        </a>

        {/* Carrinho */}
        <button
          type="button"
          className="p-0 border-0 bg-transparent cursor-pointer flex items-center justify-center"
          aria-label={
            totalQuantity > 0
              ? `Abrir carrinho, ${totalQuantity} itens`
              : 'Abrir carrinho de compras'
          }
          onClick={() => openCart()}
        >
          <span className="relative inline-block">
            <img
              src={bag}
              alt=""
              className="w-[50px] h-[35px] object-contain"
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-white text-[#02D72F] text-xs font-bold flex items-center justify-center px-1">
                {totalQuantity}
              </span>
            )}
          </span>
        </button>
      </div>
    </header>
  )
}

export default App