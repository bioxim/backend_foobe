import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../../config/axios';

import { CRMContext } from '../../../context/CRMContext';

import 'moment/locale/es';

function EditarChangelog (props) {
	//console.log(props.match);
	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}


	const [log, datosLogs] = useState({
		fecha: '',
		changelog: ''
	});

	

	// useEffect, cuando el componente carga
	useEffect( () => {

		if(auth.token !== '') {
			// Query a la API
			const consultarAPI = async () => {
				const changelogConsulta = await clienteAxios.get(`/changelog/${id}`, {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				});
				//colocar en el state los datos
				datosLogs(changelogConsulta.data);
			}

			consultarAPI();
		} else {
			props.history.push('/login');
		}

	}, [id]);

	// leer los datos del formulario
	const actualizarState = e => {
		//Almacenar lo que el usuario escribe en el state
		//console.log([e.target.name] + ":"+ e.target.value);
		datosLogs({
			// obtener una copia del state actual
			...log,
			[e.target.name] : e.target.value
		})

		//console.log(log);
	}

	// Envía una petición por Axios para actualizar la sección
	const actualizarChangelog = e => {
		e.preventDefault();

		// enviar petición por axios
		clienteAxios.put(`/changelog/${log._id}`, log)
			.then(res => {
				//console.log(res);
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Este changelog ya está registrado'
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
				props.history.push('/changelog');
			})
	}

	// validar el formulario
	const validarChangelog = () => {
		// Destructuring
		const { fecha, changelog } = log;

		// Revisar que las propiedades del state tengan log
		let valido = !fecha.length || !changelog.length;

		// Return true o false
		return valido;
	}

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="mb-0 card-title font-weight-bold">
						Modificar el Changelog
					</h5>
				</div>
				<div className="card-body">
					<form
						onSubmit={actualizarChangelog}
					>
						<div className="form-row">
							<div className="col-md-6">
								<div className="form-group">
									<label className="font-weight-bold">
										Edite el log
									</label>
									<input 
										name="changelog"
										type="text" 
										className="form-control" 
										onChange={actualizarState}
		                    			value={log.changelog}
									/>
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label>Fecha</label>
									<input 
										name="fecha" 
										placeholder="Fecha de log" 
										type="date" 
										className="form-control" 
										onChange={actualizarState}
										value={log.fecha}
									/>
								</div>
							</div> 
							<div className="col-md-4">
								<div className="form-group pt-3">
									<input 
										className="btn btn-secondary"
										type="submit"
										value="Guardar Cambios"
										disabled={ validarChangelog() }
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
export default withRouter(EditarChangelog);