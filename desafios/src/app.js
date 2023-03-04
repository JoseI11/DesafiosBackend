import ProductManager from './ProductManager.js';
import express from "express";
const manager = new ProductManager();
const productServer = express();
const operacionesProductos = async () => {
    try {





        productServer.get("/products", async (req, res) => {

            const consulta = await manager.getProducts();
            let limite = req.query.limit

            if (Number.parseInt(limite) === 5) {
                console.log("a")
                const resultado = consulta.slice(0, Number.parseInt(limite));
                res.send(resultado);
            } else {

                res.send(consulta);
            }


        });

        productServer.get("/products/:pid", async (req, res) => {
            let id = req.params.pid
            console.log(id)
            const consultaId = await manager.getProductById(Number.parseInt(id));
            if (!consultaId) {
                console.log("ej");
                return res.send({ error: "El producto con ese id no se encuentra en el archivo" });
            } else {

                res.send(consultaId);
            }
        });

        productServer.listen(8080, () => {
            console.log("Servidor arriba en el puerto 8080");
        });

        // let product1 = await manager.addProduct("PR01", "Mouse Inalambrico Logitech", "Negro con led roja", 200, "mouse.jpg", 50)
        // console.log(product1);
        // let product2 = await manager.addProduct("PR02", "Teclado Inalambrico Logitech", "Blanco", 100, "teclado.jpg", 25)
        // console.log(product2)
        // let product3 = await manager.addProduct("PR03", "Teclado Inalambrico Kingston", "Blanco", 100, "teclado.jpg", 25)
        // console.log(product3)

        // console.log(productoId);
        // let productAct = await manager.updateProduct(1, "Mouse");
        //  console.log(productAct);
        // let deleteproduct1 = await manager.deleteProducts(1);
        // console.log(deleteproduct1)
    } catch (error) {
        console.log(error);
    }


}
operacionesProductos();
