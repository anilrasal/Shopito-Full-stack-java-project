export default function mapProductToUi(p = {}) {
  if (!p) {
    //p is product from backend
    console.warn("Missing product", p);
    return null; // or skip this item entirely
  }
  return {
    id: p.id,
    name: p.name,
    rating: 4.5, // default until you wire up real ratings
    price: p.price,
    description: p.description,
    category: p.category,
    quantity: 0, // cart count starts at 0
    stock: p.availableStock, // rename inventory → stock
    image: [
      { original: p.imageUrl, thumbnail: p.imageUrl },
      { original: p.imageUrl, thumbnail: p.imageUrl },
      { original: p.imageUrl, thumbnail: p.imageUrl },
    ],
  };
}
