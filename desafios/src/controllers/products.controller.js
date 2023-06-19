import { productService } from "../dao/services/product.service.js";
export async function getAll(req, res) {
    try {
        const productsAll = await productService.getAllproducts()
        return res.send({ status: "Success", payload: productsAll })
    } catch (error) {
        req.logger.error(`Cannot get the products with mongoose ${error}`);

        return res.status(500).send({
            status: "error",
            error: "Failed to get products",
        });
    }
}
export async function getProducts(req, res) {
    try {
        const { limit = 10, page = 1, category = null, available = null, sort = null } = req.query
        let consulta = await productService.getProductsfilterPage(page, limit, category, available, sort);

        return res.send({ status: "Success", payload: consulta });

    } catch (error) {
        req.logger.error(`Cannot get the products filtered with mongoose ${error}`);

        return res.status(500).send({
            status: "error",
            error: "Failed to make the filter of products",
        });
    }
}
export async function getProductsbyId(req, res) {
    try {
        let { pid } = req.params
        const consultaId = await productService.getProductsbyitsId(pid);
        if (!consultaId) {
            req.logger.error(`The product does not exist`);
            return res
                .status(400)
                .send({ status: "error", error: "The product does not exists" });

        }
        return res.send({ status: "success", payload: consultaId });
    } catch (error) {
        req.logger.error(`Cannot get products with mongoose ${error}`);

        return res.status(500).send({
            status: "error",
            error: "Failed to get products",
        });
    }
}
export async function addProducts(req, res) {
    try {
        let product = req.body;

        const filesToUpdate = req.files
        product.thumbnails = [];
        // if (req.files) thumbnails = req.files;

        // if (!req.files) {
        //   return res.status(400).send({
        //     status: "error",
        //     error: `Thumbnails could not be saved`,
        //   });
        // }
        if (filesToUpdate) {

            filesToUpdate.forEach(files => {
                const imgUrlUpdate = `http://localhost:8080/images/${files.filename}`;
                product.thumbnails.push(imgUrlUpdate)
            });
        }
        const createProduct = await productService.createProduct(product);
        if (!createProduct || typeof createProduct === "string") {
            return res
                .status(400)
                .send({ status: "error", error: createProduct });
        }

        return res.send({ status: "success", payload: createProduct });
    } catch (error) {
        req.logger.error(`Cannot add products with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to add products",
        });
    }


}
export async function updateProducts(req, res) {
    try {
 

        const product = req.body;
        const { pid } = req.params;



        const result = await productService.updateProduct(product, pid);
        if (!product) {
            return res.send({ status: "error", error: "Incomplete values" });
        }

        return res.send({ status: "product successfully updated", payload: result });
    } catch (error) {
        req.logger.error(`Cannot update products with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to update products",
        });
    }
}
export async function deleteProducts(res, req) {
    try {
        const { pid } = req.params;

        let result = await productService.deleteProduct(pid);
        if (!result) {
            return res.status(404).send({
                status: "error",
                error: "Could not delete this product. No products founded with this ID in the database",
            });
        }
        res.send({ status: "Product successfully eliminated", payload: result });



    } catch (error) {
        req.logger.error(`Cannot delete products with mongoose ${error}`);
        return res.status(500).send({
            status: "error",
            error: "Failed to delete products",
        });
    }
}