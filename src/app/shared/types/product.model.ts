export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    releaseDate: string; // Assuming release date is a string for simplicity
    brand: string;
    stockQuantity: number;
    details: string;
    reviews: Review[];
    searchTerm: string;

  }
  
  export interface Review {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
    comment: string;
  }
  