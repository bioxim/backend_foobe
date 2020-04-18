import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';
import { withRouter } from 'react-router-dom';

import 'moment/locale/es';

function NuevoChangelog ({history}) {

	const[log, guardarChangelog] = useState({
		fecha: '',
		changelog: '',
		changelogEsp: ''
	});

	// leer los datos del formulario
	const actualizarState = e => {
		guardarChangelog({
			...log,
			[e.target.name] : e.target.value
		})
	}

	// Añade en la REST API un contenido nuevo
	const agregarChangelog = e => {
		e.preventDefault();

		clienteAxios.post('/changelog', log)
			.then(res => {
				console.log(res);
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Este log ya está registrado'
					})
				} else {
					//console.log(res.data);
					Swal.fire(
					  'Se agregó el nuevo log de la web!',
					  res.data.mensaje,
					  'success'
					)

					
				}

				// redireccionar
            	history.push('/changelog');
			});


	}
	
	// validar el formulario
	const validarChangelog = () => {
		// Destructuring
		const { fecha, changelog } = log;

		// Revisar que las propiedades del state tengan contenido
		let valido = !fecha.length || !changelog.length;

		// Return true o false
		return valido;
	}

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="mb-0 card-title font-weight-bold">
						Cargar Nuevo log
					</h5>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarChangelog}
					>
						<div className="form-row">
							<div className="col-md-3">
								<div className="form-group">
									<label className="font-weight-bold">
										Texto del log
									</label>
									<input 
										name="changelog"
										type="text" 
										className="form-control"
										onChange={actualizarState} 
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label className="font-weight-bold">
										Texto del log (español)
									</label>
									<input 
										name="changelogEsp"
										type="text" 
										className="form-control"
										onChange={actualizarState} 
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
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<input 
										className="btn btn-secondary mt-4"
										type="submit"
										value="Agregar Log"
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

export default withRouter(NuevoChangelog);