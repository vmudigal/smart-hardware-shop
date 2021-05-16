export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  defaultImage: string;
  images: string[];
  quantity: number;
  constructor(product?: Product) {
    if (!product) {
      this.id = 0;
      this.name = '';
      this.description = '';
      this.price = 0;
      this.discount = 0;
      this.defaultImage = '';
      this.images = [];
      this.quantity = 0;
    } else {
      this.id = product.id;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.discount = product.discount;
      this.defaultImage = product!.defaultImage;
      this.images = product.images;
      this.quantity = product.quantity;
    }

  }
}
