import React from 'react';

function FormBuscarTarjetas(props) {

	return(
		<form
			onSubmit={props.buscarTarjetas}
		>
                <div className="col-12">                                
                                <div className="form-row">
                                    <div className="col-md-8">
                                        <input 
                                        	type="text" 
                                        	placeholder="inserte el email completo para encontrar coincidencias" 
                                        	name="tarjetas" 
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

export default FormBuscarTarjetas;