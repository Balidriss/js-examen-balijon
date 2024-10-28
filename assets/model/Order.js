export default class Order {
  static orders = Order.loadLocalStorage();

  constructor(name, items) {
    this.name = name;
    this.date = new Date().toLocaleString();
    this.items = items;
  }

  addToHistory() {
    Order.orders.push(this);
    localStorage.setItem('orders', JSON.stringify(Order.orders));
  }

  static loadLocalStorage() {
    return JSON.parse(localStorage.getItem('orders')) || [];
  }
}
