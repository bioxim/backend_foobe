import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

import { CRMContext } from '../../context/CRMContext';

function EditarTarjeta (props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const [tarjeta, datosTarjeta] = useState({
		nombre: '',
		empresa: '',
		email: '',
		telefono: '',
		url: '',
		pais: ''
	});

	const [ paises, guardarPaises ] = useState([]);

	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {

			const paisesConsulta = await clienteAxios.get('https://restcountries.eu/rest/v2/all');

			guardarPaises(paisesConsulta.data);

		}
		consultarAPI();
	}, [paises]);

	// useEffect, cuando el componente carga
	useEffect( () => {

			const consultarAPI = async () => {
				const tarjetaConsulta = await clienteAxios.get(`/tarjetas/${id}`);
				//colocar en el state los datos
				datosTarjeta(tarjetaConsulta.data);
			}

			consultarAPI();
	}, [id, guardarAuth]);

	// leer los datos del formulario
	const actualizarState = e => {

		datosTarjeta({
			// obtener una copia del state actual
			...tarjeta,
			[e.target.name] : e.target.value
		})

		//console.log(tarjeta);
	}

	// Envía una petición por Axios para actualizar la sección
	const actualizarTarjeta = e => {
		e.preventDefault();

		// enviar petición por axios
		clienteAxios.put(`/tarjetas/${tarjeta._id}`, tarjeta)
			.then(res => {
				//console.log(res);
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Esta tarjeta ya está registrado'
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
				props.history.push('/tarjetas');
			})
	}

	// validar el formulario
	const validarTarjeta = () => {
		// Destructuring
		const { nombre, empresa, email, telefono, url } = tarjeta;

		// Revisar que las propiedades del state tengan log
		let valido = !nombre.length || !empresa.length || !email.length || !telefono.length || !url.length;

		// Return true o false
		return valido;
	}

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Modificar Tarjeta
					</h5>
					<h6 className="card-subtitle text-muted">Modificar la tarjeta seleccionada.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={actualizarTarjeta}
					>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre
									</label>
									<input 
										name="nombre" 
										placeholder="Nombre que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={actualizarState}
		                    			value={tarjeta.nombre}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Empresa
									</label>
									<input 
										name="empresa" 
										placeholder="Empresa que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={actualizarState}
		                    			value={tarjeta.empresa}
									/>
								</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Email
									</label>
									<input 
										name="email" 
										placeholder="Email que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={actualizarState}
		                    			value={tarjeta.email}
									/>
								</div>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Teléfono
									</label>
									<input 
										name="telefono" 
										placeholder="Telefono que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={actualizarState}
		                    			value={tarjeta.telefono}
									/>
								</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Website
									</label>
									<input 
										name="url" 
										placeholder="Url que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={actualizarState}
		                    			value={tarjeta.url}
									/>
								</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>
										País
									</label>
									<select 
											name="pais" 
											className="custom-select"
											onChange={actualizarState}
									>
										<option value="" selected disabled>-- Elige un país --</option>
										{paises.map(pais =>(
											<option value={pais.name}>{pais.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Guardar Cambios" 
								type="submit"
								disabled={ validarTarjeta() }
						/>
					</form>
				</div>
			</div>
		</div>
	)

}
export default withRouter(EditarTarjeta);