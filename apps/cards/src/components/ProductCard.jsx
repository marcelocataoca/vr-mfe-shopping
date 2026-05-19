import { useCartStore } from '@repo/cart-store';

function ProductCard({ product }) {
  // fallback caso não venha imagem
  const image =
    product?.thumbnail ||
    "https://via.placeholder.com/320x188?text=Sem+Imagem";

  // formatando preço em Real
  const formattedPrice = new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(product.price);

  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="w-full max-w-[396px] min-w-[280px] h-[410px] bg-white border border-gray-200 rounded-[16px] shadow-md flex flex-col mx-auto px-[20px]">
      <div className="flex justify-center pt-5"> 
        <img
          src={image}
          alt={product.title}
          className="w-full max-w-[320px] h-[188px] object-contain rounded-xl"
        />      
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-[18px] font-bold leading-[22px] text-center line-clamp-1">
          {product.title}
        </h2>

        <p className="text-sm text-gray-600 text-center mt-3 line-clamp-2 px-2">
          {product.description}
        </p>

        {/* FOOTER */}
        <div className=" mt-auto flex items-end justify-between pb-[10px] pt-5 ">
          <span className="text-2xl font-bold">
            {formattedPrice}
          </span>

          <button className="w-[109px] h-[50px] rounded-[22px] bg-[#02D72F] text-white font-semibold transition hover:opacity-90"
            onClick={() => addItem(product)}>
            COMPRAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;