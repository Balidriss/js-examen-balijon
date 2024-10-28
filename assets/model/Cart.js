export default class Cart {
  static cart = Cart.loadLocalStorage();

  constructor() {
    this.items = Cart.loadLocalStorage();
    this.total = updateTotalPrice();
  }

  static addToCart(camera) {
    Cart.cart.push(camera);
    localStorage.setItem('cart', JSON.stringify(this));
  }

  static removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this));
  }
  updateTotalPrice() {
    this.total = 0;
    this.items.forEach((item) => {
      this.total += item.prix;
    });
    return total;
  }

  static loadLocalStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
}
