import { getCartTotalPrice } from '../cartStore';

describe('getCartTotalPrice', () => {
  it('retorna 0 para lista vazia', () => {
    expect(getCartTotalPrice([])).toBe(0);
  });

  it('soma price * quantity de cada item', () => {
    const items = [
      { id: 1, price: 10, quantity: 2 },
      { id: 2, price: 5.5, quantity: 3 },
    ];

    expect(getCartTotalPrice(items)).toBe(36.5);
  });
});
