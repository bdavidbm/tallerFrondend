//import
import React,{useEffect, useState} from "react";
import axios from 'axios';
import Card from "./Card";


//cuerpo componente
const MascotasComponent=()=>{
    const url = "http://localhost:8000/mascotas";
    const [mascotas, setMascotas]= useState([]);

    useEffect(()=>{
        getMascotas();
    },[]);

    const getMascotas = async()=>{
        const respuesta = await axios.get(`${url}/buscar`);
        console.log(respuesta.data)
        setMascotas(respuesta.data);
    };

    return(
        <div className="container d-flex justify-content-center align-items-center h-100 p-3">
            <div className="row">
                {
                    mascotas.map(mascota =>(
                        <div className="col-md-4 p-3" key={mascota.id}>
                            <Card titulo={mascota.nombre} edad={mascota.edad} imagen={mascota.imagen} id={mascota.id}/>
                        </div>
                    ))
                }
                
            </div>
        </div>
    );
};

//export
export default MascotasComponent