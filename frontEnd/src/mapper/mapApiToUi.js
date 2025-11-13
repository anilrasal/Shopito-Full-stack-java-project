/**export default function mapApiToUi(productFromApi) {
  return productFromApi.map((p) => ({
    id: p.id,
    name: p.name,
    rating: 4.5, // default until you wire up real ratings
    price: p.price,
    description: p.description,
    category: p.category,
    quantity: 0, // cart count starts at 0
    stock: p.inventory, // rename inventory → stock
    image: [{ original: p.imageUrl, thumbnail: p.imageUrl }],
  }));
}
  **/
export default function mapApiToUi(apiResponse) {
  const content = Array.isArray(apiResponse.content) ? apiResponse.content : [];

  const mappedItems = content.map((p) => ({
    id: p.id,
    name: p.name,
    rating: 4.5, // default until you wire up real ratings
    price: p.price,
    description: p.description,
    category: p.category,
    quantity: 0, // cart count starts at 0
    stock: p.inventory, // rename inventory → stock
    image: [
      { original: p.imageUrl, thumbnail: p.imageUrl },
      { original: p.imageUrl, thumbnail: p.imageUrl },
      { original: p.imageUrl, thumbnail: p.imageUrl },
    ],
  }));
  return {
    items: mappedItems,
    page: apiResponse.number,
    totalPages: apiResponse.totalPages,
    totalElements: apiResponse.totalElements,
    size: apiResponse.size,
  };
}
