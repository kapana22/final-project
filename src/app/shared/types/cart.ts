export interface Cart {
  _id: string;
  userId: string;
  createdAt: string;
  total: {
    price: {
      current: number;
      beforeDiscount: number;
    };
    quantity: number;
    products: number;
  };
  products: CartProduct[];
}

export interface CartProduct {
  details: import("c:/Users/LukaKapanadze(200478/Desktop/ShopingWeb1-main/src/app/shared/types/product").ProductDetails;
  quantity: number;
  pricePerQuantity: number;
  beforeDiscountPrice: number;
  productId: string;
}
