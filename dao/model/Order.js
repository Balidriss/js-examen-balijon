export default class Order {
  static currentOrder = Order.loadCurrentOrderLocalStorage();
  static orders = Order.loadOrdersLocalStorage();
  static counter = Order.loadCounterLocalStorage();

  constructor(name,totalPrice, items) {
    this.name = name;
    this.date = new Date().toLocaleString();
    this.items = items;
    this.totalPrice = totalPrice;
    this.id = Order.counter++;
  }

  addToHistory() {
    Order.orders.push(this);
    localStorage.setItem('orders', JSON.stringify(Order.orders));
  }

  static addNewOrder(cart) {
    Order.currentOrder = cart.items;
  }

  static loadCurrentOrderLocalStorage() {
    return JSON.parse(localStorage.getItem('order')) || [];
  }
  static loadOrdersLocalStorage() {
    return JSON.parse(localStorage.getItem('orders')) || [];
  }

  static loadCounterLocalStorage()
  {
    return JSON.parse(localStorage.getItem('counter')) || [];
  }
}
