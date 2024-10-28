export default class Catalog {
  static SEARCH_DEFAULT = '';
  static SEARCH_DATE_ASC = '_1a_';
  static SEARCH_DATE_DESC = '_1b_';
  static SEARCH_ABC_ASC = '_2a_';
  static SEARCH_ABC_DESC = '_2b_';
  static SEARCH_PRICE_ASC = '_3a_';
  static SEARCH_PRICE_DESC = '_4b_';
  static SEARCH_RESOLUTION_ASC = '_5a_';
  static SEARCH_RESOLUTION_DESC = '_6b_';

  constructor(products) {
    this.products = products;
  }

  //sort product based of search inputs
  sort(search) {
    let sortedProducts = [...this.products];
    switch (search) {
      case Catalog.SEARCH_DATE_ASC:
        // No date, but use the order of the json
        return sortedProducts;
      case Catalog.SEARCH_DATE_DESC:
        return sortedProducts.reverse();
      case Catalog.SEARCH_ABC_ASC:
        return sortedProducts.sort((a, b) =>
          a.nom_produit.localeCompare(b.nom_produit)
        );
      case Catalog.SEARCH_ABC_DESC:
        return sortedProducts.sort((a, b) =>
          b.nom_produit.localeCompare(a.nom_produit)
        );
      case Catalog.SEARCH_PRICE_ASC:
        return sortedProducts.sort(
          (a, b) => parseFloat(a.prix) - parseFloat(b.prix)
        );
      case Catalog.SEARCH_PRICE_DESC:
        return sortedProducts.sort(
          (a, b) => parseFloat(b.prix) - parseFloat(a.prix)
        );
      case Catalog.SEARCH_RESOLUTION_ASC:
        return sortedProducts.sort(
          (a, b) =>
            parseInt(a.caracteristiques.résolution) -
            parseInt(b.caracteristiques.résolution)
        );
      case Catalog.SEARCH_RESOLUTION_DESC:
        return sortedProducts.sort(
          (a, b) =>
            parseInt(b.caracteristiques.résolution) -
            parseInt(a.caracteristiques.résolution)
        );
      default:
        return sortedProducts;
    }
  }

  // filter products based on a search term : name or description
  searchByTerm(term) {
    let sortedProducts = [...this.products];
    return sortedProducts.filter(
      (product) =>
        product.nom_produit.toLowerCase().includes(term.toLowerCase()) ||
        product.descriptif.toLowerCase().includes(term.toLowerCase())
    );
  }

  // 5(default) latest product for the front page
  getLastNProducts(n = 5) {
    let sortedProducts = [...this.products];
    return sortedProducts.slice(-n);
  }
}
