import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCartStore } from '@repo/cart-store';
import Header from '../../../header/src/App';
import ProductCard from '../../../cards/src/components/ProductCard';
import CartModal from '../components/CartModal';

const mockProduct = {
  id: 42,
  title: 'Headset Bluetooth',
  description: 'Fone com cancelamento de ruído',
  price: 299.9,
  thumbnail: 'https://example.com/headset.jpg',
};

function resetStore() {
  useCartStore.setState({ isOpen: false, items: [] });
}

function renderCartFlow() {
  return render(
    <>
      <Header />
      <ProductCard product={mockProduct} />
      <CartModal />
    </>,
  );
}

describe('fluxo do carrinho (host)', () => {
  beforeEach(() => {
    resetStore();
  });

  it('ao clicar em COMPRAR o badge no Header mostra 1', async () => {
    const user = userEvent.setup();
    renderCartFlow();

    await user.click(screen.getByRole('button', { name: /comprar/i }));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Abrir carrinho, 1 itens' }),
    ).toBeInTheDocument();
  });

  it('ao clicar na sacola o modal exibe o nome do produto', async () => {
    const user = userEvent.setup();
    renderCartFlow();

    await user.click(screen.getByRole('button', { name: /comprar/i }));
    await user.click(
      screen.getByRole('button', { name: 'Abrir carrinho, 1 itens' }),
    );

    expect(screen.getByRole('heading', { name: 'Compras' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('list')).getByText('Headset Bluetooth'),
    ).toBeInTheDocument();
  });

  it('ao adicionar o mesmo produto 2x o badge mostra 2', async () => {
    const user = userEvent.setup();
    renderCartFlow();

    const buyButton = screen.getByRole('button', { name: /comprar/i });
    await user.click(buyButton);
    await user.click(buyButton);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Abrir carrinho, 2 itens' }),
    ).toBeInTheDocument();
  });

  it('ao fechar o modal ele some e os itens permanecem no carrinho', async () => {
    const user = userEvent.setup();
    renderCartFlow();

    await user.click(screen.getByRole('button', { name: /comprar/i }));
    await user.click(
      screen.getByRole('button', { name: 'Abrir carrinho, 1 itens' }),
    );

    expect(screen.getByRole('heading', { name: 'Compras' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.queryByRole('heading', { name: 'Compras' })).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Abrir carrinho, 1 itens' }),
    ).toBeInTheDocument();
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].title).toBe('Headset Bluetooth');
  });
});
