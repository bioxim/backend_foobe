import React from 'react';

function FormCantidadPerfil (props) {

    const { perfil, eliminarPerfilObjeto } = props;

	return(
		<div className="col-12">
            <li className="text-center list-unstyled">
                <p className="nombre">full name: {perfil.nombre} {perfil.apellido} || email: {perfil.email}</p>
                <div className="row my-3">
                    <button 
                            type="button" 
                            className="btn btn-danger btn-block"
                            onClick={() => eliminarPerfilObjeto(perfil._id)}
                    >
                        <i  
                            className="fas fa-minus-circle"
                        ></i>
                            Eliminar Perfil
                    </button>
                </div>
            </li>
        </div>
	)
}

export default FormCantidadPerfil;