export default function mapCartApiToUi(cartItems = []) {
  return cartItems.map((cartItem) => {
    const p = cartItem.productDTO;

    if (!p) {
      console.warn("Missing productDTO in cart item:", cartItem);
      return null; // or skip this item entirely
    }
    return {
      id: p.id,
      name: p.name,
      rating: 4.5, // default until you wire up real ratings
      price: p.price,
      description: p.description,
      category: p.category,
      quantity: cartItem.quantity, // cart count starts at 0
      stock: p.availableStock, // rename inventory → stock
      image: [
        { original: p.imageUrl, thumbnail: p.imageUrl },
        { original: p.imageUrl, thumbnail: p.imageUrl },
        { original: p.imageUrl, thumbnail: p.imageUrl },
      ],
    };
  });
}
