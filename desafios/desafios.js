import fs from "fs";
export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./files/Productos.json";
    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            console.log(result);
            return result;
        } else {
            return [];
        }
    }
    addProduct = async (code, title, description, price, thumbnail, stock) => {

        if (!code || !title || !description || !price || !thumbnail || !stock) {
            console.log("All the fields must be completed")
            return;
        }

        this.products.forEach(element => {
            if (element.code === code) {
                console.log(`The field code ${code} is repeated`);
                return;
            }
        });

        const product = {
            code: code,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            stock: stock,
            id: this.products.length + 1
        }


        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
        return this.products
    }

    getProductById = async (id) => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);

            let indexValue = result.find((event) => event.id === id);
            if (!indexValue) {
                console.log("Not found");
                return;
            } else {
             
                return indexValue;
            }
        }

    }
    deleteProducts = async (id) => {
        if (fs.existsSync(this.path)) {
            let productFounded = this.products.find((product) => product.id === id)
            if (productFounded) {
                try {
                    const valor = this.products.filter((event) => event.id != id);
                 
                    this.products = valor;
              
                    await fs.promises.writeFile(this.path, JSON.stringify(valor, null, "\t"))
                    return "Product sucessfully updated";
               
                } catch (error) {
                    console.log(error);
                }

            } else {
                return `The product to delete with the id: ${id} does not exist in the list`
            }

        }

    }
    updateProduct = async (id, code, title, description, price, thumbnail, stock) => {
        let productExists=this.products.find((product)=>product.id ===id)
        if(productExists){
            try {
                const productoAmodificar = this.products.filter((product) => product.id === id);
      
                const prod = {
                
                    code: code ?? productoAmodificar[0].code,
                    title: title ?? productoAmodificar[0].title,
                    description: description ?? productoAmodificar[0].description,
                    price: price ?? productoAmodificar[0].price,
                    thumbnail: thumbnail ?? productoAmodificar[0].thumbnail,
                    stock: stock ?? productoAmodificar[0].stock,
                    id: id
                }
               
                this.products[id - 1] = prod;
        
                //console.log(this.products)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"));
                return "Product eliminated from the list";
            } catch (error) {
                console.log(error)
            }
           
        }else{
            return `The product to update with the id ${id} does not exist in the list`;
        }

     
    }
}




