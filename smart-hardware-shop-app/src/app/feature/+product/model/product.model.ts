export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  defaultImage: String;
  images: String[];
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
      this.name = product.name || '';
      this.description = product.description || '';
      this.price = product.price || 0;
      this.discount = product!.discount || 0;
      this.defaultImage = product!.defaultImage || '';
      this.images = product!.images || [];
      this.quantity = product?.quantity || 0;
    }

  }
}
