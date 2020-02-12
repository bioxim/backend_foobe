import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';
import { withRouter } from 'react-router-dom';

function FormNuevoContenido ({history}) {

	const[contenido, guardarContenido] = useState({
		tagline: ''
	});

	// leer los datos del formulario
	const actualizarState = e => {
		guardarContenido({
			...contenido,
			[e.target.name] : e.target.value
		})

		console.log(contenido);
	}

	// Añade en la REST API un contenido nuevo
	const agregarContenido = e => {
		e.preventDefault();
		// enviar petición
		clienteAxios.post('/contenidos', contenido)
			.then(res => {
				console.log(res);
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Esta sección ya está registrada'
					})
				} else {
					//console.log(res.data);
					Swal.fire(
					  'Se agregó la sección de la web!',
					  res.data.mensaje,
					  'success'
					)

					
				}

				// redireccionar
            	history.push('/contenidos');
			});


	}
	
	// validar el formulario
	const validarContenido = () => {
		// Destructuring
		const { tagline } = contenido;

		// Revisar que las propiedades del state tengan contenido
		let valido = !tagline.length;

		// Return true o false
		return valido;
	}

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="mb-0 card-title font-weight-bold">
						Cargar Sección Nueva
					</h5>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarContenido}
					>
						<div className="form-row">
							<div className="col-md-8">
								<div className="form-group">
									<label className="font-weight-bold">
										Breve descripción para incorporar en el home (en inglés) 
									</label>
									<input 
										name="tagline"
										type="text" 
										className="form-control"
										onChange={actualizarState} 
									/>
								</div>
							</div>
						
							<div className="col-md-4">
								<div className="form-group">
									<input 
										className="btn btn-secondary mt-4"
										type="submit"
										value="Agregar Sección"
										disabled={ validarContenido() }
									/>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
		</div>	
	)
}

export default withRouter(FormNuevoContenido);