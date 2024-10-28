export default class Order {
  constructor(name, items) {
    this.name = name;
    this.date = new Date().toLocaleString();
    this.items = items;
  }
}
