import { useCartStore } from '../cartStore';

const mockProduct = {
  id: 10,
  title: 'Mouse Gamer',
  price: 89.9,
  thumbnail: 'https://example.com/mouse.jpg',
};

function resetStore() {
  useCartStore.setState({ isOpen: false, items: [] });
}

describe('useCartStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('inicia com items vazio e isOpen false', () => {
    const { items, isOpen } = useCartStore.getState();

    expect(items).toEqual([]);
    expect(isOpen).toBe(false);
  });

  it('addItem adiciona uma nova linha', () => {
    useCartStore.getState().addItem(mockProduct);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: mockProduct.id,
      title: mockProduct.title,
      price: mockProduct.price,
      quantity: 1,
    });
  });

  it('addItem no mesmo id incrementa a quantity', () => {
    const { addItem } = useCartStore.getState();

    addItem(mockProduct);
    addItem(mockProduct);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('openCart define isOpen como true', () => {
    useCartStore.getState().openCart();

    expect(useCartStore.getState().isOpen).toBe(true);
  });

  it('closeCart define isOpen como false', () => {
    useCartStore.setState({ isOpen: true });

    useCartStore.getState().closeCart();

    expect(useCartStore.getState().isOpen).toBe(false);
  });

  it('removeItem remove a linha pelo id', () => {
    useCartStore.getState().addItem(mockProduct);
    useCartStore.getState().addItem({ ...mockProduct, id: 11, title: 'Teclado' });

    useCartStore.getState().removeItem(mockProduct.id);

    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(11);
  });
});
