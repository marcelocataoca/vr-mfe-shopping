import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products"
        );

        // valida erro HTTP
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }

        const data = await response.json();

        // pega apenas 6 produtos
        const limitedProducts = data.products.slice(0, 6);

        setProducts(limitedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // loading
  if (loading) {
    return (
      <p className="text-center text-lg">
        Carregando produtos...
      </p>
    );
  }

  // erro
  if (error) {
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-[1390px] mx-auto px-[25px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;