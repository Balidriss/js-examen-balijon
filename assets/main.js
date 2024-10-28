import Order from './model/Order.js';
import Cart from './model/Cart.js';
import Camera from './model/Camera.js';


    init()
    


async function init()
{
    const products = await fetchProducts();
    const hotProductContainer = document.getElementById('hot-product-container');
    if(hotProductContainer)
    {
        products.forEach( cameraJson => {
            const camera = new Camera (cameraJson.nom_produit, cameraJson.desciptif,cameraJson.caracteristiques,cameraJson.prix,cameraJson.image);
            const cameraCard =  camera.createPreviewCardElement();
            hotProductContainer.appendChild(cameraCard);
        })
    }
    const productsContainer = document.getElementById('products-container');
    if(productsContainer)
    {

    }
    const cartContainer = document.getElementById('cart-container')
    if(cartContainer)
    {

    }


}

async function fetchProducts() {
    try {
        const response = await fetch('../produits.json'); 
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des données, verifier si produits.json est bien dans la racine du projet et main.js dans le dossier /assets');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Erreur:', error);
        return []; 
    }
}