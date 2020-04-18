import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../../config/axios';

import { CRMContext } from '../../../context/CRMContext';

function EditarContenido (props) {
	//console.log(props.match);
	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const[contenido, datosContenido] = useState({
		tagline: '',
		taglineEsp: ''
	});

	// useEffect, cuando el componente carga
	useEffect( () => {

			const consultarAPI = async () => {
				const contenidoConsulta = await clienteAxios.get(`/contenidos/${id}`);
				//colocar en el state los datos
				datosContenido(contenidoConsulta.data);
			}
			
			consultarAPI();
	}, [id, guardarAuth]);

	// leer los datos del formulario
	const actualizarState = e => {
		//Almacenar lo que el usuario escribe en el state
		//console.log([e.target.name] + ":"+ e.target.value);
		datosContenido({
			// obtener una copia del state actual
			...contenido,
			[e.target.name] : e.target.value
		})

		//console.log(contenido);
	}

	// Envía una petición por Axios para actualizar la sección
	const actualizarContenido = e => {
		e.preventDefault();

		// enviar petición por axios
		clienteAxios.put(`/contenidos/${contenido._id}`, contenido)
			.then(res => {
				//console.log(res);
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Esta sección ya está registrado'
					})
				} else {
					//console.log(res.data);
					Swal.fire(
					  'Correcto!',
					  'Se actualizó correctamente',
					  'success'
					)
				}

				// redireccionar
				props.history.push('/contenidos');
			})
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
						Modificar el Tagline
					</h5>
				</div>
				<div className="card-body">
					<form
						onSubmit={actualizarContenido}
					>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label className="font-weight-bold">
										Edite breve descripción para incorporar en el home (en inglés) 
									</label>
									<input 
										name="tagline"
										type="text" 
										className="form-control" 
										onChange={actualizarState}
		                    			value={contenido.tagline}
									/>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label className="font-weight-bold">
										Edite breve descripción para incorporar en el home ESPAÑOL
									</label>
									<input 
										name="taglineEsp"
										type="text" 
										className="form-control" 
										onChange={actualizarState}
		                    			value={contenido.taglineEsp}
									/>
								</div>
							</div>
							
							<div className="col-md-4">
								<div className="form-group pt-3">
									<input 
										className="btn btn-secondary"
										type="submit"
										value="Guardar Cambios"
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
export default withRouter(EditarContenido);