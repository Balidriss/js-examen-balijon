export default class Cart {
  constructor() {
    this.items = this.loadLocalStorage();
    this.total = this.calculateTotalPrice();
  }

  addToCart(camera) {
    const existingItemIndex = this.items.findIndex(
      (item) => item.id === camera.id
    );

    if (existingItemIndex === -1) {
      this.items.push(camera);
      this.saveToLocalStorage();
    } else {
      alert(camera.nom_produit + ' est déja dans le panier');
    }
  }

  removeFromCart(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  calculateTotalPrice() {
    const total = this.items.reduce(
      (sum, item) => sum + parseFloat(item.prix),
      0
    );
    return total.toFixed(2);
  }

  loadLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  getItemCount() {
    return this.items.length;
  }

  static display() {}
}
