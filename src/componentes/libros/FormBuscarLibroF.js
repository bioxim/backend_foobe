import React from 'react';

function FormBuscarLibroF(props) {
	return(
		<form
			onSubmit={props.buscarLibrof}
		>
                <legend>Busca el pdf para este libro de ferias</legend>

                <div className="form-row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>PDFs:</label>
                                    <input 
                                    	type="text" 
                                    	placeholder="Nombrel pdf" 
                                    	name="librosf" 
                                        className="form-control mb-3"
                                    	onChange={props.leerDatosBusqueda2}
                                    />
                                
                                <input
                                	type="submit"
                                	className="btn btn-primary btn-block"
                                	value="Buscar PDF"
                                />
                            </div>
                        </div>
                </div>
        </form>
	)
}

export default FormBuscarLibroF;