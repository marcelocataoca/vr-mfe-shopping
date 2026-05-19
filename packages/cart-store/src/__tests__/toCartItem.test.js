import { toCartItem } from '../toCartItem';

const IMAGE_FALLBACK =
  'https://via.placeholder.com/320x188?text=Sem+Imagem';

const baseProduct = {
  id: 1,
  title: 'Notebook',
  price: 2999.99,
  thumbnail: 'https://example.com/notebook.jpg',
};

describe('toCartItem', () => {
  it('mapeia os campos do produto', () => {
    expect(toCartItem(baseProduct)).toEqual({
      id: 1,
      title: 'Notebook',
      price: 2999.99,
      quantity: 1,
      thumbnail: 'https://example.com/notebook.jpg',
    });
  });

  it('usa fallback de imagem quando não há thumbnail', () => {
    const product = { ...baseProduct, thumbnail: undefined };

    expect(toCartItem(product).thumbnail).toBe(IMAGE_FALLBACK);
  });

  it('usa fallback de título quando não há title', () => {
    const product = { id: 2, price: 50 };

    expect(toCartItem(product).title).toBe('Sem título');
  });

  it('garante quantity mínimo 1', () => {
    expect(toCartItem(baseProduct, 0).quantity).toBe(1);
    expect(toCartItem(baseProduct, -3).quantity).toBe(1);
  });
});
