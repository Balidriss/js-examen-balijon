export default class Camera {
  constructor(id, nom_produit, descriptif, caracteristiques, prix, image) {
    this.nom_produit = nom_produit;
    this.descriptif = descriptif;
    this.caracteristiques = caracteristiques;
    this.prix = prix;
    this.image = image;
    this.id = id;
  }
}
