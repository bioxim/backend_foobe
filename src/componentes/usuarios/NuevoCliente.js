import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

function NuevoCliente ({history}) {

	//cliente: state, guardarCliente: función para guardar el state
	const[cliente, guardarCliente] = useState({
		nombre: '',
		email: '',
		password: ''
	});

	// leer los datos del formulario
	const actualizarState = e => {
		guardarCliente({
			// obtener una copia del state actual
			...cliente,
			[e.target.name] : e.target.value
		})

		//console.log(cliente);
	}

	// Añade en la REST API un cliente nuevo
	const agregarCliente = e => {
		e.preventDefault();
		// enviar petición
		clienteAxios.post('/crear-cuenta', cliente)
			.then(res => {
				//console.log(res);
				//cuando en la res vemos errores de mongo
				//validar si hay errores de mongo(hay muchos pero veo el del mail repetido)
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						icon: 'error',
						title: 'Hubo un error',
						text: 'Este cliente ya está registrado'
					})
				} else {
					//console.log(res.data);
					Swal.fire(
					  'Se agregó el cliente!',
					  res.data.mensaje,
					  'success'
					)
				}

				// Redireccionar
				history.push('/crear-cuenta');
			});
	}
	
	// validar el formulario
	const validarCliente = () => {
		// Destructuring
		const { nombre, email, password } = cliente;

		// Revisar que las propiedades del state tengan contenido
		let valido = !nombre.length || !email.length || !password.length

		// Return true o false
		return valido;
	}

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="mb-0 card-title font-weight-bold">
						Nuevo Usuario/Administrador
					</h5>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarCliente}
					>
						<div className="form-row">
							<div className="col-md-6">
								<div className="form-group">
									<label className="font-weight-bold">
										Nombre 
									</label>
									<input 
										name="nombre"
										type="text" 
										className="form-control"
										onChange={actualizarState} 
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label className="font-weight-bold">
										Email 
									</label>
									<input 
										name="email"
										type="email" 
										className="form-control"
										onChange={actualizarState} 
									/>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label className="font-weight-bold">
										Password 
									</label>
									<input 
										name="password"
										type="password" 
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
										value="Alta Nuevo Usuario"
										disabled={ validarCliente() }
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
export default withRouter(NuevoCliente);