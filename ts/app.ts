import express, {Application, Request, Response} from 'express';
import fs from 'fs';

const app:Application = express();

//Interface Producto y array de productos
interface Producto{
    name:String
    price:Number
}
const productos:Producto[] = [{name: 'Escuadra', price: 200}, {name: 'Calculadora', price:1000}, {name: 'Regla', price: 50}]

//Counters para consigna 3
let counterPto1 = 0;
let counterPto2 = 0;

//Crear el objeto items para devolver en /items
let cantProductos = 0;

productos.forEach(producto => {
    cantProductos += 1;
})

let items = {
    items: productos,
    cantidad: cantProductos
}


//Consigna 1
app.get('/items', (req:Request, res:Response)=> {
    counterPto1 += 1;
    res.json(items);
})

//Consigna 2
const leerProductosTxt = async() => {
    try {
        const data = await fs.promises.readFile(`./productos.txt`, 'utf-8');
        const prod = await JSON.parse(data);
        let random = Math.floor(Math.random() * (prod.length - 1) + 1)
        return prod[random];
    } catch (error){
        console.log(error);
        return {};
    }
}

app.get('/item-random', async(req:Request, res:Response)=> {
    counterPto2 += 1;
    let myObj = await leerProductosTxt();
    res.json({item: myObj});
})

//Consigna 3
app.get('/visitas', (req, res)=> {
    res.json({
        visitas: {
            items: counterPto1,
            item: counterPto2
        }
    });
})

app.listen(8080, () => {
    console.log('Server listening - http://localhost:8080')
})