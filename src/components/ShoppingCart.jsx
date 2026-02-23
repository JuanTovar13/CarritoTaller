import { useState } from "react";
import "./ShoppingCart.css"

const data = [
  { "id": 1, "nombre": "Laptop", "categoria": "Electrónica", "precio": 1500 },
  { "id": 2, "nombre": "Camiseta", "categoria": "Ropa", "precio": 20 },
  { "id": 3, "nombre": "Cafetera", "categoria": "Electrodomésticos", "precio": 80 },
  { "id": 4, "nombre": "Zapatos deportivos", "categoria": "Calzado", "precio": 60 },
  { "id": 5, "nombre": "Libro", "categoria": "Libros", "precio": 15 },
  { "id": 6, "nombre": "Auriculares", "categoria": "Electrónica", "precio": 100 },
  { "id": 7, "nombre": "Mochila", "categoria": "Accesorios", "precio": 35 },
  { "id": 8, "nombre": "Silla de oficina", "categoria": "Muebles", "precio": 120 },
  { "id": 9, "nombre": "Reloj", "categoria": "Accesorios", "precio": 50 },
  { "id": 10, "nombre": "Botella de agua", "categoria": "Deportes", "precio": 10 }
]

export const ShoppingCart = () => {
    const [producto]= useState(data)
    const [carrito, setCarrito] = useState([])
    
    const toggleCarrito = (id) => {
        if (carrito.includes(id)){
            setCarrito(carrito.filter(itemId => itemId !== id))
        } else {
            setCarrito([...carrito, id])
        }
    } 
    const[count, setCount] = useState({})
    
    const incrementar = (id) => {
        setCount(p => ({
            ...p,
            [id]: (p[id]||0)+1
        }))
    }
    const decrementar = (id) => {
        setCount(p => ({
            ...p, 
            [id]: Math.max((p[id]||0)-1,0)
        }))
    }
    

    // Calcular el total del carrito
    const total = carrito.reduce((acc, id) => {
        const prod = producto.find(p => p.id === id);
        const unidades = count[id] || 0;
        return acc + (prod ? prod.precio * unidades : 0);
    }, 0);

    return(
        <div className="reto9">
            <div className="lista-carrito">
            {producto.map(p =>{
                const agregado = carrito.includes(p.id)
            return(
            <div className={agregado ? "agregado" : "agregar"} key={p.id}>
                        <h3>{p.nombre}</h3>
                        <p>{p.categoria}</p>
                        <p>Precio: ${p.precio}</p>
                        <button onClick={() => toggleCarrito(p.id)}>
                            {agregado ? "Eliminar" : "Agregar"}
                        </button>
                        <div className="cuenta">
                        <button onClick={()=> incrementar(p.id)}>+</button>
                        <p>Unidades: {count[p.id]||0} </p>
                        <button onClick={()=> decrementar(p.id)}>-</button>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="total-carrito">
                <h2>Total: ${total}</h2>
            </div>
        </div>
    )
}

