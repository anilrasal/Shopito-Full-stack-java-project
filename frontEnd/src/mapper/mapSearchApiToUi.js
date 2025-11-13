import React from "react";

export default function mapSearchApiToUi(apiResponse) {
  const content = apiResponse && Array.isArray(apiResponse) ? apiResponse : [];

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
  return mappedItems;
}
