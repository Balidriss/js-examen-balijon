export default class Catalog{

    static SEARCH_DEFAULT = '';
    static SEARCH_DATE_ASC = '_1a_';
    static SEARCH_DATE_DESC = '_1b_';
    static SEARCH_ABC_ASC = '_2a_';
    static SEARCH_ABC_DESC = '_2b_';
    static SEARCH_PRICE_ASC = '_3a_';
    static SEARCH_PRICE_DESC = '_4b_';


    constructor(products)
    {
        this.products = products;
    }
    
    display(search)
    {
        switch (search) {
            case '_1a_':
                console.log(SEARCH_DATE_ASC);
                break;
        
            default:
                break;
        }

        return document.createElement('div');
    }
}