const IMAGE_FALLBACK =
  'https://via.placeholder.com/320x188?text=Sem+Imagem';

export function toCartItem(product, quantity = 1) {
  return {
    id: product.id,
    title: product.title ?? 'Sem título',
    price: Number(product.price) || 0,
    quantity: Math.max(1, quantity),
    thumbnail: product.thumbnail || IMAGE_FALLBACK,
  };
}
