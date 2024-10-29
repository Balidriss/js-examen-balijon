import Cart from './dao/model/Cart.js';
import Order from './dao/model/Order.js';
import Catalog from './dao/Catalog.js';

export default class Display {
  constructor(products, container) {
    this.products = products;
    this.container = container;
  }

  static async renderFrontPageContainer(container) {
    if (container) {
      const catalog = new Catalog();
      await catalog.initializeCatalog();
      const display = new Display(catalog.getLastNProducts(5), container);
      display.render('minimum');
    }
  }

  static async renderProductsPageContainer(
    container,
    search = Catalog.SEARCH_DEFAULT
  ) {
    if (container) {
      const catalog = new Catalog();
      await catalog.initializeCatalog();
      const display = new Display(catalog.sort(search), container);
      display.render('preview');
    }
  }
  static async renderProductDetailPageContainer(container) {
    if (container) {
      const catalog = new Catalog();
      await catalog.initializeCatalog();
      const display = new Display(
        [catalog.find(new URLSearchParams(window.location.search).get('id'))],
        container
      );
      display.render('detailed');
    }
  }
  static async renderCartPageContainer(container) {
    if (container) {
      const cart = new Cart();
      const display = new Display(cart.items, container);
      display.render('cart');

      if (cart.getItemCount() > 0) {
        const buttonCheckIn = document.createElement('button');
        buttonCheckIn.textContent = 'Commander !';
        buttonCheckIn.addEventListener('click', () => {
          window.location.href = 'order.html';
        });
        container.appendChild(buttonCheckIn);
        document.getElementById('quantity').textContent = cart.getItemCount();
        document.getElementById(
          'total-price'
        ).textContent = `${cart.calculateTotalPrice()} €`;
      }
    }
  }
  static async renderOrderValidationPageContainer(container) {
    if (container) {
      const cart = new Cart();
      const display = new Display(cart.items, container);
      display.render('preview');

      if (cart.getItemCount() > 0) {
        const form = document.createElement('form');
        const buttonCheckIn = document.createElement('input');
        const labelInput = document.createElement('label');
        const inputName  = document.createElement('input');
        inputName.type='text';
        inputName.name='name';
        labelInput.for ='name';
        labelInput.textContent = "Nommer votre commande";
        form.appendChild(labelInput);
        form.appendChild(inputName);
        buttonCheckIn.type = 'submit';
        buttonCheckIn.value = 'Valider !';
        buttonCheckIn.addEventListener('click', () => {
          const order = new Order(inputName.value, cart.items)
          order.addToHistory();
          alert(`Votre commande : ${order.name} est enregistré ! Merci`)
          cart.clearCart();
          window.location.href = 'index.html';
        });

        form.appendChild(buttonCheckIn);
        container.appendChild(form);

        document.getElementById('quantity').textContent = cart.getItemCount();
        document.getElementById(
          'total-price'
        ).textContent = `${cart.calculateTotalPrice()} €`;
      }
    }
  }
  static async renderHistoricPageContainer(container) {
    if (container) {
      
      const display = new Display(Order.orders, container);
      display.render('historic');
    }
  }

  render(type = 'preview') {
    this.container.innerHTML = '';
    this.products.forEach((item) => {
      let card;
      switch (type) {
        case 'minimum':
          card = this.createMinimumViewCard(item);
          break;
        case 'preview':
          card = this.createPreviewCard(item);
          break;
        case 'detailed':
          card = this.createDetailedCard(item);
          break;
        case 'cart':
          card = this.createCartCard(item);
          break;
          case 'historic':
          card = this.createOrderCard(item)
        default:
          console.error("Type d'affichage inconnue : " + type);
          return;
      }
      this.appendToContainer(card);
    });
  }

  appendToContainer(card) {
    if (this.container) {
      this.container.appendChild(card);
    }
  }

  createBaseCard() {
    const card = document.createElement('article');
    card.className = 'product-card';
    return card;
  }

  createMinimumViewCard(item) {
    const card = this.createBaseCard();
    this.addImg(card, item);
    this.addTitle(card, item.nom_produit, 'h3');
    this.addLinkToDetail(card, item.id, 'product');
    return card;
  }

  createPreviewCard(item) {
    const card = this.createBaseCard();
    this.addImg(card, item);
    this.addTitle(card, item.nom_produit, 'h3');
    this.addPrice(card, item.prix);
    this.addLinkToDetail(card, item.id, 'product');
    return card;
  }

  createDetailedCard(item) {
    const card = this.createBaseCard();
    this.addImg(card, item);
    this.addTitle(card, item.nom_produit, 'h2');
    this.addPrice(card, item.prix);
    this.addDecription(card, item.description);
    this.addCharacteristics(card, item.caracteristiques);
    this.addButtonAddToCart(card, item, item.nom_produit);
    return card;
  }

  createCartCard(item) {
    const card = this.createBaseCard();
    this.addImg(card, item);
    this.addTitle(card, item.nom_produit, 'h3');
    this.addPrice(card, item.prix);
    this.addButtonRemoveFromCart(card, item.id, item.nom_produit);
    return card;
  }

  createOrderCard(item)
  {
    const card = this.createBaseCard();
    this.addTitle(card,item.name);
    this.addPrice(card,item.prix);
    this.addDate(card,item.date);
    this.addLinkToDetail(card, item.id, 'order');
    return card;
  }

  addImg(container, item) {
    const img = document.createElement('img');
    img.src = `/assets/${item.image}`;
    img.alt = item.nom_produit;
    container.appendChild(img);
  }

  addTitle(container, content, hTitle) {
    const title = document.createElement(hTitle);
    title.textContent = content;
    container.appendChild(title);
  }

  addPrice(container, price) {
    const priceElement = document.createElement('p');
    priceElement.className = 'price';
    priceElement.textContent = `${price} €`;
    container.appendChild(priceElement);
  }

  addDecription(container, content) {
    const description = document.createElement('p');
    description.textContent = content;
    container.appendChild(description);
  }

  addLinkToDetail(container, id , model) {
    container.classList.add('linked');
    container.addEventListener('click', () => {
      window.location.href = `${model}/detail.html?id=${id}`;
    });
  }

  addDate(container , date)
  {
    const dateElement = document.createElement('p');
    dateElement.textContent = date;
    container.appendChild(dateElement);
  }

  addButtonAddToCart(container, item, name) {
    const button = document.createElement('button');
    button.textContent = 'Ajouter au panier';
    button.addEventListener('click', () => {
      const cart = new Cart();
      cart.addToCart(item);
      alert(`${name} a été ajouté au panier!`);
      window.location.href = '../products.html';
    });
    container.appendChild(button);
  }

  addButtonRemoveFromCart(container, id, name) {
    const button = document.createElement('button');
    button.textContent = 'Enlever du panier';
    console.log("test");
    button.addEventListener('click', () => {
      const cart = new Cart();
      cart.removeFromCart(id);
      alert(`${name} a été retiré du panier!`);
      window.location.href = 'cart.html';
    });
    container.appendChild(button);
  }

  addCharacteristics(container, characteristiques) {
    const characteristicsList = document.createElement('ul');
    for (const [key, value] of Object.entries(characteristiques)) {
      const characteristicItem = document.createElement('li');
      characteristicItem.innerHTML = `<strong>${
        key.charAt(0).toUpperCase() + key.slice(1)
      }:</strong> ${value}`;
      characteristicsList.appendChild(characteristicItem);
    }
    container.appendChild(characteristicsList);
  }
}
