import { getTotalQuantity } from '../cartStore';

describe('getTotalQuantity', () => {
  it('retorna 0 para lista vazia', () => {
    expect(getTotalQuantity([])).toBe(0);
  });

  it('soma a quantity de vários itens', () => {
    const items = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 1 },
    ];

    expect(getTotalQuantity(items)).toBe(6);
  });
});
