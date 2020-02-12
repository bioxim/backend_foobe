import React from 'react';

function FormBuscarTarjeta(props) {
	return(
		<form
			onSubmit={props.buscarTarjeta}
		>
                <legend>Busca una tarjeta y agrega una cantidad</legend>

                <div className="form-row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Tarjetas:</label>
                                    <input 
                                    	type="text" 
                                    	placeholder="Nombre de la tarjeta" 
                                    	name="tarjetas" 
                                        className="form-control mb-3"
                                    	onChange={props.leerDatosBusqueda}
                                    />
                                
                                <input
                                	type="submit"
                                	className="btn btn-primary btn-block"
                                	value="Buscar Tarjeta Personal"
                                />
                            </div>
                        </div>
                </div>
        </form>
	)
}

export default FormBuscarTarjeta;