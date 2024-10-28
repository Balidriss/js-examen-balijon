import Order from './model/Order.js';
import Cart from './model/Cart.js';
import Camera from './model/Camera.js';
import Catalog from './model/Catalog.js';

init();

async function init() {
  const products = await fetchProducts();
  const hotProductContainer = document.getElementById('hot-product-container');
  let catalog = new Catalog(products);
  if (hotProductContainer) {
    displayCamera(catalog.getLastNProducts(5), hotProductContainer);
  }
  const productsContainer = document.getElementById('products-container');
  if (productsContainer) {
    displayCamera(catalog.sort(Catalog.SEARCH_DATE_ASC), productsContainer);
  }
  const cartContainer = document.getElementById('cart-container');
  if (cartContainer) {
  }
}

async function fetchProducts() {
  try {
    const response = await fetch('../produits.json');
    if (!response.ok) {
      throw new Error(
        'Erreur lors du chargement des données, verifier si produits.json est bien dans la racine du projet et main.js dans le dossier /assets'
      );
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}
// ! replace the elements in the container !
function displayCamera(arrayCameras, container, typeOfDisplay = 'preview') {
  container.innerHTML = '';
  let cameraCard = document.createElement('p');
  cameraCard.textContent =
    "Désolé nous n'avons pas pu trouver d'article avec ces critères";

  arrayCameras.forEach((cameraJson) => {
    const camera = new Camera(
      cameraJson.nom_produit,
      cameraJson.desciptif,
      cameraJson.caracteristiques,
      cameraJson.prix,
      cameraJson.image
    );
    if (typeOfDisplay === 'preview') {
      cameraCard = camera.createPreviewCardElement();
    } else if (typeOfDisplay === 'detailed') {
      const cameraCard = camera.createDetailedCardElement();
    } else {
      console.error('wrong type of display from displayCamera');
    }
    container.appendChild(cameraCard);
  });
}
