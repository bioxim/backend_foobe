import React from 'react';

function FormCantidadTarjeta (props) {

    const { tarjeta, eliminarTarjetaLibro } = props;

	return(
		<div className="col-12">
            <li className="text-center list-unstyled">
                <p className="nombre">full name: {tarjeta.nombre} || empresa: {tarjeta.empresa} || email: {tarjeta.email}</p>
                <div className="row my-3">
                    <button 
                            type="button" 
                            className="btn btn-danger btn-block"
                            onClick={() => eliminarTarjetaLibro(tarjeta._id)}
                    >
                        <i  
                            className="fas fa-minus-circle"
                        ></i>
                            Eliminar Tarjeta
                    </button>
                </div>
            </li>
        </div>
	)
}

export default FormCantidadTarjeta;