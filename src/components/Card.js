import React from 'react'

function Card({titulo, edad, imagen, id}) {
  return (
    <div className='card-deck'>
        <div className='card text-center bg-dark'>
            <img src={imagen}   className='img-fluid card-img-top' style={{ objectFit: 'cover', height: '200px', width: '100%' }}></img>
            <div className='card-body text-light'>
                <h4 className='card-title'>{titulo}</h4>
                <p className='card-text text-secondary'>Edad: {edad}</p>
                <a href={`/detalle/${id}`} className='btn btn-outline-secondary '>detalle</a>
            </div>
        </div>
    </div>
    
  )
}

export default Card