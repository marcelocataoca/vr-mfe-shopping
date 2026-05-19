import { useState } from 'react';
import { useCartStore, getTotalQuantity, getCartTotalPrice } from '@repo/cart-store';

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function RemoveItemConfirm({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 border-0 cursor-default"
        aria-label="Fechar confirmação"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-item-title"
        className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
      >
        <p id="remove-item-title" className="text-center text-base text-black">
          Gostaria de remover esse item?
        </p>
        <footer className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            className="rounded-full bg-[#02D72F] px-5 py-2 text-sm font-semibold text-white border-0 cursor-pointer"
            onClick={onConfirm}
          >
            Remover
          </button>
          <button
            type="button"
            className="border-0 bg-transparent cursor-pointer text-sm font-medium"
            aria-label="Cancelar remoção"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
}

function CartModal() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);
  const totalQuantity = getTotalQuantity(items);
  const cartTotal = getCartTotalPrice(items);

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
          <div className="w-full h-px bg-gray-300 mt-2" />
        </div>

        <ul className="flex flex-col gap-3 mt-[25px] px-10 overflow-y-auto flex-1">
          {items.map((item) => (
            <li
              key={item.id}
              className="relative flex items-center justify-between w-full border border-[#02D72F] rounded-lg pl-3 pr-7 py-2 pt-4 gap-3"
            >
              <button
                type="button"
                className="absolute top-1.5 right-1.5 border-0 bg-transparent cursor-pointer p-0 text-gray-600 hover:text-black"
                aria-label={`Remover ${item.title}`}
                onClick={() => setItemIdToRemove(item.id)}
              >
                <TrashIcon />
              </button>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-12 h-12 object-contain shrink-0"
              />
              <span className="flex-1 text-left ml-5 text-sm font-medium truncate">
                {item.title}
              </span>
              <span className="shrink-0 text-sm mr-2">
                <span className="text-600 text-md">{item.quantity} X </span>
                <span className="font-bold">{formatPrice(item.price)}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* divider */}
        <div className='px-10 mt-2'>
          <div className="w-full h-px bg-gray-300 mt-2" />
        </div>

        <div className="flex items-center justify-between px-10 py-6">
          <button
            type="button"
            className="rounded-full bg-[#02D72F] text-white text-lg font-semibold px-6 py-3 border-0"
          >
            Concluir compras
          </button>
          <div className="flex items-center gap-[25px]">
            <span className="font-bold text-xl text-600">
              TOTAL: {formatPrice(cartTotal)}
            </span>
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

      {itemIdToRemove !== null && (
        <RemoveItemConfirm
          onCancel={() => setItemIdToRemove(null)}
          onConfirm={() => {
            removeItem(itemIdToRemove);
            setItemIdToRemove(null);
          }}
        />
      )}
    </div>
  );
}

export default CartModal;
