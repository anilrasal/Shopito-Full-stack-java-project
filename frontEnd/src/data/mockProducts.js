import wirelessMouse from "../assets/images/products/wireless_mouse.jpg";
import keyboard from "../assets/images/products/keyboard.jpg";
import shirt from "../assets/images/products/tshirt.jpg";
import monitor from "../assets/images/products/monitor.jpg";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Mouse",
    rating: 4,
    price: 799,
    description: "Some of description",
    category: "Electronics",
    quantity: 0,
    stock: 4,
    image: [
      {
        original: wirelessMouse,
        thumbnail: wirelessMouse,
      },
      {
        original: wirelessMouse,
        thumbnail: wirelessMouse,
      },
      {
        original: wirelessMouse,
        thumbnail: wirelessMouse,
      },
    ],
  },
  {
    id: 2,
    name: "Keyboard",
    price: 1499,
    description: "Some of description",
    rating: 4.5,
    category: "Electronics",
    quantity: 0,
    stock: 4,
    image: [
      {
        original: keyboard,
        thumbnail: keyboard,
      },
      {
        original: keyboard,
        thumbnail: keyboard,
      },
      {
        original: keyboard,
        thumbnail: keyboard,
      },
    ],
  },
  {
    id: 3,
    name: "Monitor",
    price: 7999,
    description: "Some of description",
    rating: 3,
    category: "Electronics",
    quantity: 0,
    stock: 4,
    image: [
      {
        original: monitor,
        thumbnail: monitor,
      },
      {
        original: monitor,
        thumbnail: monitor,
      },
      {
        original: monitor,
        thumbnail: monitor,
      },
    ],
  },
  {
    id: 4,
    name: "Shirt",
    price: 299,
    description: "Some of description",
    rating: 3.5,
    category: "Fashion",
    quantity: 0,
    stock: 4,
    image: [
      {
        original: shirt,
        thumbnail: shirt,
      },
      {
        original: shirt,
        thumbnail: shirt,
      },
      {
        original: shirt,
        thumbnail: shirt,
      },
    ],
  },
];

export default mockProducts;
