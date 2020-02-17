import React from 'react';

function FormCantidadLibroF (props) {

    const { libropdf, eliminarLibroF } = props;

    //console.log(props);

	return(
		<div className="col-12">
            <li className="text-center list-unstyled">
                <p className="nombre">nombre: {libropdf.nombre} || contactos: {libropdf.contactos}</p>
                <div className="row my-3">
                    <button 
                            type="button" 
                            className="btn btn-danger btn-block"
                            onClick={() => eliminarLibroF(libropdf._id)}
                    >
                        <i  
                            className="fas fa-minus-circle"
                        ></i>
                            Eliminar PDF
                    </button>
                </div>
            </li>
        </div>
	)
}

export default FormCantidadLibroF;