import Cart from './dao/model/Cart.js';
import Order from './dao/model/Order.js';
import Catalog from './dao/Catalog.js';

export default class Display {
  constructor(products, container) {
    this.products = products;
    this.container = container;
  }

  //method to display the new products on the frontpage
  static async renderFrontPageContainer(container) {
    if (container) {
      const catalog = new Catalog();
      await catalog.initializeCatalog();
      const display = new Display(catalog.getLastNProducts(5), container);
      display.render('minimum');
      container.querySelectorAll('.product-card').forEach(e => e.classList.add('hot'));
    }
  }

  //method to display the products on "catalogue"
  static async renderProductsPageContainer(
    container,
    search = Catalog.SEARCH_DEFAULT,
    term = null
  ) {
    if (container) {
      container.innerHTML = '';
      const catalog = new Catalog();
      await catalog.initializeCatalog();
      const display = new Display(catalog.sort(search, term), container);
      display.render('preview');

    }
  }
  //method to display the detail in product/detail.html
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
  //method to display the cart
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
        container.parentNode.insertBefore(buttonCheckIn,container.nextSibling);
        document.getElementById('quantity').textContent = cart.getItemCount();
        document.getElementById(
          'total-price'
        ).textContent = `${cart.calculateTotalPrice()} €`;
      }
    }
  }
  //method to display the page to confirm the order
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
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const order = new Order(inputName.value,cart.calculateTotalPrice(), cart.items)
          order.addToHistory();
          alert(`Votre commande : ${order.name} est enregistré ! Merci`)
          cart.clearCart();
          window.location.href = 'orders.html';
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

  //method to display the orders made
  static async renderHistoricPageContainer(container) {
    if (container) {
      
      const display = new Display(Order.orders, container);
      display.render('historic');
    }
  }

  //method to check the order in detail
  static async renderOrderDetailPageContainer(container) {
    if (container) {
      const order = Order.find(new URLSearchParams(window.location.search).get('id'));
      const display = new Display(order.items, container);
      display.render('detailorder');

        document.getElementById('quantity').textContent = order.items.length;
        document.getElementById(
          'total-price'
        ).textContent = `${order.totalPrice} €`;
      }
    }

    
  
 //choose the way each element will be built
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
          card = this.createOrderCard(item);
          break;
          case 'detailorder':
          card = this.createOrderDetail(item);
          break;
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
    card.className = 'product-card container';
    return card;
  }

  createOrderCardContainer()
  {
    const card = document.createElement('article');
    card.className = 'order-card';
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
  createOrderDetail(item)
  {
    const card = this.createBaseCard();
    this.addImg(card, item);
    this.addTitle(card, item.nom_produit, 'h3');
    this.addLinkFromOrderDetail(card,item.id);
    return card;
  }

  createDetailedCard(item) {
    const card = this.createBaseCard();
    this.addImg(card, item, true);
    this.addTitle(card, item.nom_produit, 'h2');
    this.addPrice(card, item.prix);
    this.addDecription(card, item.descriptif);
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
    const card = this.createOrderCardContainer();
    this.addTitle(card,item.name,'h2');
    this.addPrice(card,item.totalPrice);
    this.addDate(card,item.date);
    this.addLinkToDetail(card, item.id, 'order');
    return card;
  }

  addImg(container, item, previewImg = false , hot = false) {
    const img = document.createElement('img');
    img.src = `/assets/${item.image}`;
    img.alt = item.nom_produit;
    img.classList.add("hot");
if(previewImg){
    const aElement = document.createElement('a');
    aElement.href = `/assets/${item.image}`;
    aElement.appendChild(img);
    container.appendChild(aElement);}
    else{
      container.appendChild(img);
    }
  }

  addTitle(container, content, hTitle) {
    const title = document.createElement(hTitle);
    title.textContent = content;
    container.appendChild(title);
  }

  addPrice(container, price) {
    const priceElement = document.createElement('p');
    priceElement.className = 'price';
    priceElement.textContent = `${price}`;
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
  addLinkFromOrderDetail(container, id) {
    container.classList.add('linked');
    container.addEventListener('click', () => {
      window.location.href = `../product/detail.html?id=${id}`;
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

  //method that dynamicaly change the result of the search.
  static renderSearch(form,productsContainer)
  {
    if(form && productsContainer)
    {
      const selectElement = document.querySelector('select');
      const inputTermElement = document.getElementById('term-input');
      console.log(Catalog.searchs);
          Catalog.searchs.forEach(criteria => {
            
            const optionElement = document.createElement('option');
            
            optionElement.textContent = criteria;
            selectElement.appendChild(optionElement); 
            });
            form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(selectElement.options[selectElement.selectedIndex ].value);
            if(!inputTermElement.value)
            {
              Display.renderProductsPageContainer(productsContainer,
                selectElement.options[selectElement.selectedIndex ].value)
            }else{
              Display.renderProductsPageContainer(productsContainer,
                selectElement.options[selectElement.selectedIndex ].value, inputTermElement.value)
            } 
            });
        }
    }

}
