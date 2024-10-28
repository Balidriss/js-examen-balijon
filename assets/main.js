import Order from './model/Order.js';
import Cart from './model/Cart.js';
import Camera from './model/Camera.js';
import Catalog from './model/Catalog.js';

init();

async function init() {
  const products = await fetchProducts();
  setIndex(products);

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
    displayCamera(cart.items, cartContainer);
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
  let cameraCard;
  cameraCard = document.createElement('p');
  cameraCard.textContent =
    "Désolé, nous n'avons pas pu trouver d'article avec ces critères";
  container.appendChild(cameraCard);

  arrayCameras.forEach((cameraJson) => {
    const camera = new Camera(
      cameraJson.id,
      cameraJson.nom_produit,
      cameraJson.descriptif,
      cameraJson.caracteristiques,
      cameraJson.prix,
      cameraJson.image
    );

    switch (typeOfDisplay) {
      case 'preview':
        cameraCard = camera.createPreviewCardElement();
        break;
      case 'detailed':
        cameraCard = camera.createDetailedCardElement();
        break;
      case 'cart':
        cameraCard = camera.createPreviewInCartElement();
        break;
      default:
        console.error("Erreur: Type d'affichage incorrect pour displayCamera");
        return;
    }

    container.appendChild(cameraCard);
  });
}

function setIndex(array) {
  array.forEach((item, index) => {
    item.id = index;
  });
  return array;
}
