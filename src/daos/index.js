let products;
let carritos;
let persistencia = "mongo";

switch(persistencia){
    case "fileSystem":
        const {default:ProductsFileSystem} = await import('./productos/productsFileSystem.js')
        const {default:CarritosFileSystem} = await import('./carritos/carritosFileSystem.js')
        products = new ProductsFileSystem();
        carritos = new CarritosFileSystem();
        break;

    case "mongo":
        const {default:ProductsMongo} = await import ('./productos/productsMongo.js')
        const {default:CarritosMongo} = await import ('./carritos/carritosMongo.js')
        products = new ProductsMongo();
        carritos = new CarritosMongo();
        break;

    case "fb":
        const {default:ProductsFB} = await import ('./productos/productosFirebase.js')
        const {default:CarritosFB} = await import ('./carritos/carritosFirebase.js')
        products = new ProductsFB();
        carritos = new CarritosFB();
        break;
    default:
    }

export {products,carritos}