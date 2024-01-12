import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import withReactContent from "sweetalert2-react-content"
import Swal from 'sweetalert2';

function Detalle() {
    const url = "http://localhost:8000/mascotas";
    const url2 = "http://localhost:8000/adopcion";
    const [mascota, setMascota] = useState({});
    const [adopcion, setAdopcion] = useState({});
    const [adop, setAdop] = useState('');
    const [adopButton, setAdopButton] = useState('');
    const { id } = useParams();

    useEffect(() => {
        getAdopcion();
    }, [id]);

    useEffect(() => {
        getMascota();
    }, [id]);

    const getAdopcion = async () => {
        try {
            const respuesta = await axios.get(`${url2}/buscar/${id}`);
            console.log(respuesta.data);
            setAdopcion(respuesta.data);
            if (respuesta.data.id_estado_adopcion === 1){
                setAdop('En adopcion');
                setAdopButton('Adoptar')
            }else if (respuesta.data.id_estado_adopcion === 2){
                setAdop( 'En proceso de adopcion')
                setAdopButton('Terminar adopcion')
            }else  if (respuesta.data.id_estado_adopcion === 3){
                setAdop( 'Adoptado')
                setAdopButton('Adoptado')
            }else{
                setAdop( 'Sin estado')
            }
        } catch (error) {
            console.error("Error al obtener la mascota:", error);
        }
        
       
    };

    const adoptar=()=>{
        const MySwal = withReactContent(Swal);
        let parametros;
        let metodo;
        if(adopcion.id_estado_adopcion===1){
            parametros={
                urlExt: `${url2}/actualizar/${id}`,
                id_mascota:id,
                id_estado_adopcion: 2
            };
            metodo="PUT";
            enviarSolicitud(metodo, parametros);
        }else if(adopcion.id_estado_adopcion===2){
            parametros={
                urlExt: `${url2}/actualizar/${id}`,
                id_mascota:id,
                id_estado_adopcion: 3
            };
            metodo="PUT";
            enviarSolicitud(metodo, parametros);
        }else {
            MySwal.fire({
                title:`Adopcion`,
                text: 'Mascota ya adoptada',
                confirmButtonText:'Aceptar',
            })
        }
        
    }

    const enviarSolicitud = async (metodo, parametros)=>{
        await axios({method: metodo, url:parametros.urlExt, data: parametros })
        .then((respuesta)=>{
            getMascota();
            getAdopcion();
        })
        .catch((error)=>{
        })
    }

    const getMascota = async () => {
        try {
            const respuesta = await axios.get(`${url}/buscar/${id}`);
            console.log(respuesta.data);
            setMascota(respuesta.data);
        } catch (error) {
            console.error("Error al obtener la mascota:", error);
        }
    };

    return (
        <div className='p-3'>
            <div className='card-deck d-flex align-items-center justify-content-center'>
                <div className='card text-center bg-dark'>
                    <img
                        src={mascota.imagen}
                        className='img-fluid card-img-top'
                        style={{ objectFit: 'contain', height: '300px', width: '1000px' }}
                        alt='Descripción de la imagen'
                    />
                    <div className='card-body text-light'>
                        <h4 className='card-title text-primary'>{mascota.nombre}</h4>
                        <p className='card-text text-light'>Edad: {mascota.edad}</p>
                        <p className='card-text text-light'>Raza: {mascota.raza}</p>
                        <p className='card-text text-light'>{mascota.descripcion}</p>
                        <p  className='card-text text-light'>Estado adopcion: {adop}</p>
                        <div className='mb-3'>
                            <a href={`/`} className='btn btn-outline-secondary mr-2'>
                                Regresar
                            </a>
                            <button
                                onClick={()=>adoptar()}
                                className="btn btn-outline-secondary mr-2"
                            >
                                {adopButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detalle