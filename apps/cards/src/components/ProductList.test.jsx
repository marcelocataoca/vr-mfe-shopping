import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';

const mockProducts = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `Produto ${index + 1}`,
  description: `Descrição ${index + 1}`,
  price: 10 * (index + 1),
  thumbnail: `https://example.com/produto-${index + 1}.jpg`,
}));

function mockFetchSuccess() {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ products: mockProducts }),
    }),
  );
}

function mockFetchError() {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
    }),
  );
}

describe('ProductList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('exibe loading e depois a lista de produtos', async () => {
    mockFetchSuccess();
    render(<ProductList />);

    expect(screen.getByText(/carregando produtos/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Produto 1' })).toBeInTheDocument();
    });

    expect(screen.queryByText(/carregando produtos/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /comprar/i })).toHaveLength(6);
  });

  it('exibe mensagem de erro quando a API falha', async () => {
    mockFetchError();
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Erro ao buscar produtos')).toBeInTheDocument();
    });
  });
});
