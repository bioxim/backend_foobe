import React from 'react';

function FormBuscarCliente(props) {

	return(
		<form
			onSubmit={props.buscarCliente}
		>
                <div className="col-12">                                
                                <div className="form-row">
                                    <div className="col-md-8">
                                        <input 
                                        	type="text" 
                                        	placeholder="email de cliente" 
                                        	name="clientes" 
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

export default FormBuscarCliente;