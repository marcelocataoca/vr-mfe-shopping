import { useCartStore, getTotalQuantity } from '@repo/cart-store';

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function CartModal() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const totalQuantity = getTotalQuantity(items);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-16 bottom-[0] left-0 right-0 z-50 flex">
      <button
        type="button"
        className="w-[60%] h-full bg-black/50 border-0 cursor-default"
        aria-label="Fechar carrinho"
        onClick={() => closeCart()}
      />

      <div className="w-[40%] h-full bg-white flex flex-col">
        <div className="flex items-start justify-between px-10">
          <h1 className="font-bold text-2xl text-black mt-[25px]">Compras</h1>
          <div className="flex items-center gap-5 mt-[25px]">
            <span className="font-bold text-2xl text-black self-end">{totalQuantity}</span>
            <button
              type="button"
              className="text-sm leading-none border-0 bg-transparent cursor-pointer p-0 self-start"
              aria-label="Fechar"
              onClick={() => closeCart()}
            >
              X
            </button>
          </div>
        </div>
        {/* divider */}
        <div className='px-10 mt-2'>
          <div class="w-full h-px px-10 bg-gray-300 mt-2"></div>
        </div>

        <ul className="flex flex-col gap-3 mt-[25px] px-10 overflow-y-auto flex-1">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between max-h-[75px] w-full border border-[#02D72F] rounded-lg px-3 py-2 gap-3"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-12 h-12 object-contain shrink-0"
              />
              <span className="flex-1 text-left ml-5 text-sm font-medium truncate">
                {item.title}
              </span>
              <span className="shrink-0 font-bold text-sm">
                {formatPrice(item.price)}
              </span>
            </li>
          ))}
        </ul>
        
        {/* divider */}
        <div className='px-10 mt-2'>
          <div class="w-full h-px px-10 bg-gray-300 mt-2"></div>
        </div>  

        <div className="flex items-center justify-between px-10 py-6">
          <button
            type="button"
            className="rounded-full bg-[#02D72F] text-white text-lg font-semibold px-6 py-3 border-0"
          >
            Concluir compras
          </button>
          <button
            type="button"
            className="border-0 bg-transparent cursor-pointer font-medium"
            onClick={() => closeCart()}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
