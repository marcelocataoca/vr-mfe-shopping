import { render, screen } from '@testing-library/react';
import { useCartStore } from '@repo/cart-store';
import App from './App';

const mockProduct = {
  id: 1,
  title: 'Mouse',
  price: 49.9,
  thumbnail: 'https://example.com/mouse.jpg',
};

function resetStore() {
  useCartStore.setState({ isOpen: false, items: [] });
}

describe('Header App', () => {
  beforeEach(() => {
    resetStore();
  });

  it('não exibe badge com carrinho vazio', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: 'Abrir carrinho de compras' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('exibe badge com total após addItem na store', () => {
    useCartStore.getState().addItem(mockProduct);

    render(<App />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('aria-label do carrinho reflete a quantidade de itens', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct);
    addItem(mockProduct);

    render(<App />);

    expect(
      screen.getByRole('button', { name: 'Abrir carrinho, 2 itens' }),
    ).toBeInTheDocument();
  });
});
