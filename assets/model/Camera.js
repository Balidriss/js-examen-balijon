export default class Camera {
  constructor(nom_produit, descriptif, caracteristiques, prix, image) {
    this.nom_produit = nom_produit;
    this.descriptif = descriptif;
    this.caracteristiques = caracteristiques;
    this.prix = prix;
    this.image = image;
  }

  createPreviewCardElement() {
    const card = document.createElement('article');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = this.image;
    img.alt = this.nom_produit;
    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = this.nom_produit;
    card.appendChild(title);

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = this.prix;
    card.appendChild(price);

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.addEventListener('click', () => Cart.addToCart(this));
    card.appendChild(button);

    return card;
  }
  createDetailedCardElement() {
    //TODO
  }
}
