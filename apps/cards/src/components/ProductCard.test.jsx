import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

const mockAddItem = jest.fn();

jest.mock('@repo/cart-store', () => ({
  useCartStore: (selector) => selector({ addItem: mockAddItem }),
}));

const baseProduct = {
  id: 1,
  title: 'Notebook Gamer',
  description: 'Notebook com 16GB de RAM e SSD 512GB',
  price: 4999.99,
  thumbnail: 'https://example.com/notebook.jpg',
};

function renderProductCard(product = baseProduct) {
  return render(<ProductCard product={product} />);
}

describe('ProductCard', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
  });

  it('exibe o título do produto', () => {
    renderProductCard();
    expect(screen.getByRole('heading', { name: baseProduct.title })).toBeInTheDocument();
  });

  it('exibe a descrição do produto', () => {
    renderProductCard();
    expect(screen.getByText(baseProduct.description)).toBeInTheDocument();
  });

  it('exibe o preço formatado em Real', () => {
    renderProductCard();
    expect(screen.getByText('R$ 4.999,99')).toBeInTheDocument();
  });

  it('exibe a imagem com a URL do produto', () => {
    renderProductCard();
    const image = screen.getByRole('img', { name: baseProduct.title });
    expect(image).toHaveAttribute('src', baseProduct.thumbnail);
  });

  it('usa imagem placeholder quando o produto não tem thumbnail', () => {
    const productWithoutThumbnail = { ...baseProduct, thumbnail: undefined };
    renderProductCard(productWithoutThumbnail);
    const image = screen.getByRole('img', { name: baseProduct.title });
    expect(image).toHaveAttribute(
      'src',
      'https://via.placeholder.com/320x188?text=Sem+Imagem',
    );
  });

  it('exibe o botão COMPRAR', () => {
    renderProductCard();
    expect(screen.getByRole('button', { name: /comprar/i })).toBeInTheDocument();
  });

  it('chama addItem com o produto ao clicar em COMPRAR', async () => {
    const user = userEvent.setup();
    renderProductCard();

    await user.click(screen.getByRole('button', { name: /comprar/i }));

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(baseProduct);
  });

  it('atualiza o título quando a prop product muda', () => {
    const { rerender } = render(<ProductCard product={baseProduct} />);
    expect(screen.getByRole('heading', { name: baseProduct.title })).toBeInTheDocument();

    const updatedProduct = { ...baseProduct, title: 'Mouse sem fio' };
    rerender(<ProductCard product={updatedProduct} />);

    expect(screen.getByRole('heading', { name: 'Mouse sem fio' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: baseProduct.title })).not.toBeInTheDocument();
  });

  it('atualiza o preço exibido quando a prop product muda', () => {
    const { rerender } = render(<ProductCard product={baseProduct} />);
    expect(screen.getByText('R$ 4.999,99')).toBeInTheDocument();

    rerender(<ProductCard product={{ ...baseProduct, price: 89.9 }} />);

    expect(screen.getByText('R$ 89,90')).toBeInTheDocument();
  });

  it('atualiza a descrição quando a prop product muda', () => {
    const { rerender } = render(<ProductCard product={baseProduct} />);

    rerender(
      <ProductCard
        product={{ ...baseProduct, description: 'Teclado mecânico RGB' }}
      />,
    );

    expect(screen.getByText('Teclado mecânico RGB')).toBeInTheDocument();
    expect(screen.queryByText(baseProduct.description)).not.toBeInTheDocument();
  });
});
