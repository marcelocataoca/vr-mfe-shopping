import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCartStore, getTotalQuantity } from '@repo/cart-store';
import CartModal from './CartModal';

const cartItem = {
  id: 1,
  title: 'Teclado Mecânico',
  price: 199.9,
  quantity: 1,
  thumbnail: 'https://example.com/teclado.jpg',
};

function resetStore() {
  useCartStore.setState({ isOpen: false, items: [] });
}

describe('CartModal', () => {
  beforeEach(() => {
    resetStore();
  });

  it('não renderiza conteúdo quando isOpen é false', () => {
    render(<CartModal />);

    expect(screen.queryByRole('heading', { name: 'Compras' })).not.toBeInTheDocument();
  });

  it('mostra título Compras e itens quando aberto', () => {
    useCartStore.setState({ isOpen: true, items: [cartItem] });

    render(<CartModal />);

    expect(screen.getByRole('heading', { name: 'Compras' })).toBeInTheDocument();
    expect(screen.getByText('Teclado Mecânico')).toBeInTheDocument();
  });

  it('overlay, botão Fechar e Cancelar fecham o carrinho', async () => {
    const user = userEvent.setup();

    useCartStore.setState({ isOpen: true, items: [] });
    const { rerender } = render(<CartModal />);

    await user.click(screen.getByRole('button', { name: 'Fechar carrinho' }));
    expect(useCartStore.getState().isOpen).toBe(false);

    act(() => {
      useCartStore.setState({ isOpen: true });
    });
    rerender(<CartModal />);
    await user.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(useCartStore.getState().isOpen).toBe(false);

    act(() => {
      useCartStore.setState({ isOpen: true });
    });
    rerender(<CartModal />);
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(useCartStore.getState().isOpen).toBe(false);
  });

  it('exibe no topo o total de itens igual a getTotalQuantity', () => {
    const items = [
      { ...cartItem, id: 1, quantity: 2 },
      { ...cartItem, id: 2, title: 'Mouse', quantity: 3 },
    ];
    const totalQuantity = getTotalQuantity(items);

    useCartStore.setState({ isOpen: true, items });

    render(<CartModal />);

    expect(screen.getByText(String(totalQuantity))).toBeInTheDocument();
    expect(totalQuantity).toBe(5);
  });
});
