import { useEffect, useState } from "react";
import { api } from "../services/api";

function ListaProductos() {
  const [productos, setProductos] = useState([]);

    useEffect(() => {
        api.get('/productoss')
            .then((respuesta) => {console.log(respuesta); setProductos(respuesta.resultado);})
            .catch((error))
    }, []);

    return(
        <div>
            <ul>
                
            </ul>
        </div>
    );

}