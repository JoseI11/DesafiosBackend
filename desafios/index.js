import ProductManager from './desafios.js';
const manager = new ProductManager();
const operacionesProductos = async () => {

    let product1 = await manager.addProduct("PR01", "Mouse Inalambrico Logitech", "Negro con led roja", 200, "mouse.jpg", 50)
    console.log(product1)
    let product2 = await manager.addProduct("PR02", "Teclado Inalambrico Logitech", "Blanco", 100, "teclado.jpg", 25)
    console.log(product2)

    let segundaConsulta = await manager.getProducts();
    console.log(segundaConsulta);
    let productAct = await manager.updateProduct(2, "Mouse");
    console.log(productAct);
    let deleteproduct1 = await manager.deleteProducts(3);
    console.log(deleteproduct1)

}
operacionesProductos();