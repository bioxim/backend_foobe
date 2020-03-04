import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

import 'moment/locale/es';

const NuevoPerfil = (props) => {

	const [perfil, guardarPerfil] = useState({
		nombre: '',
		apellido: '',
		email: '',
		taglineProfile: '',
		profile: '',
		telefono: '',
		nacimiento: '',
		empresa: '',
		direccion: '',
		ciudad: '',
		estado: '',
		pais: '',
		facebook: '',
		linkedin: '',
		twitter: '',
		instagram: '',
		youtube: '',
		sliderhome: ''
	});

	const [archivo, guardarArchivo] = useState('');

	const [ paises, guardarPaises ] = useState([]);

	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {

			const paisesConsulta = await clienteAxios.get('https://restcountries.eu/rest/v2/all');

			guardarPaises(paisesConsulta.data);

		}
		consultarAPI();
	}, [paises]);

    const agregarPerfil = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nombre', perfil.nombre);
        formData.append('apellido', perfil.apellido);
        formData.append('email', perfil.email);
        formData.append('taglineProfile', perfil.taglineProfile);
        formData.append('profile', perfil.profile);
        formData.append('telefono', perfil.telefono);
        formData.append('nacimiento', perfil.nacimiento);
        formData.append('empresa', perfil.empresa);
        formData.append('direccion', perfil.direccion);
        formData.append('ciudad', perfil.ciudad);
        formData.append('estado', perfil.estado);
        formData.append('pais', perfil.pais);
        formData.append('facebook', perfil.facebook);
        formData.append('linkedin', perfil.linkedin);
        formData.append('twitter', perfil.twitter);
        formData.append('instagram', perfil.instagram);
        formData.append('youtube', perfil.youtube);
        formData.append('sliderhome', perfil.sliderhome);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.post('/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            //console.log(res);
            //lanzar alerta
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/clientes-perfiles');

        } catch(error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }

    }

    // leer los datos del formulario
        const leerInformacionPerfil = e => {
            guardarPerfil({
                //obtener una copia del state y agregar el nuevo
                ...perfil,
                [e.target.name]: e.target.value
            })
        }

        const leerArchivo = e => {
            console.log(e.target.files);
            guardarArchivo(e.target.files[0]);
        }

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Agregar Nuevo Perfil
					</h5>
					<h6 className="card-subtitle text-muted">Cargar perfil para habilitar el nuevo miembro.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarPerfil}
					>
			
						<p className="card-subtitle text-primary text-uppercase">Datos Personales
						</p>

						<div className="form-row">
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Nombre
									</label>
									<input 
										name="nombre" 
										placeholder="nombres" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Apellido
									</label>
									<input 
										name="apellido" 
										placeholder="apellidos" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Correo Electrónico
									</label>
									<input 
										name="email" 
										placeholder="email" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<div className="form-group">
									<label>
										Slider
									</label>
									<select 
											name="sliderhome" 
											className="custom-select"
											onChange={leerInformacionPerfil}
									>
											<option selected disabled>-- Slider --</option>
											<option value="0">Inactivo</option>
											<option value="1">Activo</option>
									</select>
								</div>
								</div>
							</div>		
						</div>
						<div className="form-row">
							<div className="col-md-2">
								<div className="form-group">
									<label>Nacmiento</label>
									<input 
										name="nacimiento" 
										type="date" 
										className="form-control" 
										onChange={leerInformacionPerfil}
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
									<div className="form-group">
									<label>
										Tagline
									</label>
									<input 
										name="taglineProfile" 
										placeholder="Tagline que define al cliente" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
									/>
								</div>
								</div>
							</div>
												
						</div>
						
						<input 
								className="btn btn-primary my-3" 
								value="Agregar Perfil" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)

}

export default withRouter(NuevoPerfil);