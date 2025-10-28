// For: https://jsonplaceholder.typicode.com/users
export interface Lead {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

// For: https://fakestoreapi.com/products
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}