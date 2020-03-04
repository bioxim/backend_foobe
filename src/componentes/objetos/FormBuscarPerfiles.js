import React from 'react';

function FormBuscarPerfiles(props) {

	return(
		<form
			onSubmit={props.buscarPerfiles}
		>
                <div className="col-12">                                
                                <div className="form-row">
                                    <div className="col-md-8">
                                        <label>Perfil:</label>
                                        <input 
                                        	type="text" 
                                        	placeholder="inserte el email completo para encontrar coincidencias de perfil" 
                                        	name="perfiles" 
                                            className="form-control mb-3"
                                        	onChange={props.leerDatosBusqueda}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                        	type="submit"
                                        	className="btn btn-primary btn-block"
                                        	value="Buscar"
                                        />
                                    </div>
                                </div>
                </div>
        </form>
	)
}

export default FormBuscarPerfiles;