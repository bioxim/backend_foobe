import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

function NuevoCliente ({history}) {

	//cliente: state, guardarCliente: función para guardar el state
	const[cliente, guardarCliente] = useState({
		nombre: '',
		email: '',
		password: '',
		tagline: '',
		nacimiento: '',
		actividad: '',
		empresa: '',
		website: '',
		direccion: '',
		pais: '',
		facebook: '',
		linkedin: '',
		twitter: '',
		instagram: ''
	});

	const [archivo, guardarArchivo] = useState('');

	// leer los datos del formulario
	const actualizarState = e => {
		guardarCliente({
			// obtener una copia del state actual
			...cliente,
			[e.target.name] : e.target.value
		})
	}

	const agregarCliente = e => {
		e.preventDefault();
		
		const formData = new FormData();
        formData.append('nombre', cliente.nombre);
        formData.append('email', cliente.email);
        formData.append('password', cliente.password);
        formData.append('tagline', cliente.tagline);
        formData.append('nacimiento', cliente.nacimiento);
        formData.append('actividad', cliente.actividad);
        formData.append('linkedin', cliente.linkedin);
        formData.append('facebook', cliente.facebook);
        formData.append('twitter', cliente.twitter);
        formData.append('instagram', cliente.instagram);
        formData.append('empresa', cliente.empresa);
        formData.append('website', cliente.website);
        formData.append('direccion', cliente.direccion);
        formData.append('pais', cliente.pais);
        formData.append('imagen', archivo);

		clienteAxios.post('/crear-cuenta', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
			.then(res => {
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

	const leerArchivo = e => {
            console.log(e.target.files);
            guardarArchivo(e.target.files[0]);
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
									<label>Imagen</label>
									<input  type="file"  
				                            name="imagen"
				                            onChange={leerArchivo} 
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