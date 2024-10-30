export default class Catalog {
  static SEARCH_DEFAULT = '---';
  static SEARCH_DATE_ASC = 'Les moins recents';
  static SEARCH_DATE_DESC = 'Les plus récents';
  static SEARCH_ABC_ASC = 'Alphabétique';
  static SEARCH_ABC_DESC = 'Anti-Alphabétique';
  static SEARCH_PRICE_ASC = 'Les moins chères';
  static SEARCH_PRICE_DESC = 'Les plus chères';
  static SEARCH_RESOLUTION_ASC = 'Résolution croissante';
  static SEARCH_RESOLUTION_DESC = 'Résolution décroissante';

  static searchs = [
    Catalog.SEARCH_DEFAULT,
    Catalog.SEARCH_DATE_ASC,
    Catalog.SEARCH_DATE_DESC,
    Catalog.SEARCH_ABC_ASC,
    Catalog.SEARCH_ABC_DESC,
    Catalog.SEARCH_PRICE_ASC,
    Catalog.SEARCH_PRICE_DESC,
    Catalog.SEARCH_RESOLUTION_ASC,
    Catalog.SEARCH_RESOLUTION_DESC,
  ];
  constructor() {
    this.products = [];
  }

  async initializeCatalog() {
    this.products = await Catalog.getProducts();
  }

  sort(search, term = null) {
    let sortedProducts = term
      ? [...this.searchByTerm(term)]
      : [...this.products];

    switch (search) {
      case Catalog.SEARCH_DATE_ASC:
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

  // Filter products by search term in name or description
  searchByTerm(term) {
    return this.products.filter(
      (product) =>
        product.nom_produit.toLowerCase().includes(term.toLowerCase()) ||
        product.descriptif.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Retrieve the latest `n` products for the front page
  getLastNProducts(n = 5) {
    return this.products.slice(-n).reverse();
  }

  // Fetch products from the JSON file
  static async getProducts() {
    try {
      // Determine the fetch path based on the current directory (I HATE THIS)
      const path =
        window.location.pathname.includes('/product/') ||
        window.location.pathname.includes('/order/')
          ? '../produits.json'
          : './produits.json';

      const response = await fetch(path);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }

      const products = await response.json();
      return Catalog.setIndex(products);
    } catch (error) {
      console.error('Erreur:', error);
      return [];
    }
  }

  // Assign an ID
  static setIndex(products) {
    return products.map((product, index) => ({ id: index, ...product }));
  }

  find(id) {
    return this.products.find((item) => item.id == id);
  }
}
