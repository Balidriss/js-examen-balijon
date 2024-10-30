import Display from '../Display.js';

init();

async function init() {
  const hotProductContainer = document.getElementById('hot-product-container');
  const productsContainer = document.getElementById('products-container');
  const cartContainer = document.getElementById('cart-container');
  const detailProductContainer = document.getElementById(
    'detail-product-section'
  );
  const orderContainer = document.getElementById('recap-order-section');
  const historicContainer = document.getElementById('orders-section');
  const pastOrderContainer = document.getElementById('past-order-container');

  const searchForm = document.getElementById('search-form');

  //// index

  //Look for the container, if it exist display corresponding vue.
  Display.renderFrontPageContainer(hotProductContainer);
  Display.renderProductsPageContainer(productsContainer);
  Display.renderCartPageContainer(cartContainer);
  Display.renderProductDetailPageContainer(detailProductContainer);
  Display.renderOrderValidationPageContainer(orderContainer);
  Display.renderHistoricPageContainer(historicContainer);
  Display.renderOrderDetailPageContainer(pastOrderContainer);
  Display.renderSearch(searchForm,productsContainer);


  

}
