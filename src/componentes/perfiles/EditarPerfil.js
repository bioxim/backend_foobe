import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

import 'moment/locale/es';

function EditarPerfil(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const [perfil, datosPerfil] = useState({
		nombre: '',
		apellido: '',
		email: '',
		taglineProfile: '',
		profile: '',
		telefono: '',
		empresa: '',
		direccion: '',
		ciudad: '',
		estado: '',
		pais: '',
		facebook: '',
		linkedin: '',
		twitter: '',
		instagram: '',
		youtube: ''
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

	useEffect( () => {

			const consultarAPI = async () => {
				const perfilConsulta = await clienteAxios.get(`/profile/${id}`);
				//colocar en el state los datos
				datosPerfil(perfilConsulta.data);
			}

			consultarAPI();
			
	}, [id, guardarAuth]);

	const editarPerfil = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', perfil.nombre);
        formData.append('apellido', perfil.apellido);
        formData.append('email', perfil.email);
        formData.append('taglineProfile', perfil.taglineProfile);
        formData.append('profile', perfil.profile);
        formData.append('telefono', perfil.telefono);
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

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/profile/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/clientes-perfiles');

        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    // leer los datos del formulario
    const leerInformacionPerfil = e => {
        datosPerfil({
            // obtener una copia del state y agregar el nuevo
            ...perfil,
            [e.target.name] : e.target.value
        })
    }

    // extraer los valores del state
    const { nombre, imagen, apellido, email, taglineProfile, profile, telefono, empresa, direccion, ciudad, estado, pais, facebook, linkedin, twitter, instagram, youtube, sliderhome } = perfil;

    if(!perfil) return <Spinner />

    return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Modificar Perfil
					</h5>
					<h6 className="card-subtitle text-muted">Modificar o actualizar los nuevos datos de este perfil en particular, si no cumplen con las políticas de foobe.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={editarPerfil}
					>

						<div className="form-row mb-3">	

							<div className="col-md-6">
								<div className="form-group">
									<label>
										Nombres del cliente
									</label>
									<input 
										name="nombre" 
										placeholder="Nombres" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={nombre}
									/>
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label>
										Apellidos del cliente
									</label>
									<input 
										name="apellido" 
										placeholder="Apellidos" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={apellido}
									/>
								</div>
							</div>
						
						</div>

						<div className="form-row mb-3">	

							<div className="col-md-6">
								<div className="form-group">
									<label>
										Email del cliente
									</label>
									<input 
										name="email" 
										placeholder="Email" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={email}
									/>
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label>
										Tagline
									</label>
									<input 
										name="taglineProfile" 
										placeholder="Línea de definición del perfil del cliente" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={taglineProfile}
									/>
								</div>
							</div>
						
						</div>

						<div className="form-row mb-3">	

							<div className="col-md-4">
								<div className="form-group">
									<label>
										Teléfono
									</label>
									<input 
										name="telefono" 
										placeholder="Teléfono" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={telefono}
									/>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									{ imagen ? (
					                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt="imagen" width="150" className="img-fluid rounded-circle pb-3" />
					                ) : null }
					            </div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>Slider</label>
									<input 
										name="sliderhome"  
										type="text" 
										className="form-control"
                        				defaultValue={sliderhome}
									/>
								</div>
							</div>
						
						</div>

						<div className="form-row mb-3">	

							<div className="col-md-4">
								<div className="form-group">
									<label>
										Perfil seleccionado
									</label>
									<input 
										name="profile" 
										placeholder="El perfil no se modifica a menos que haya hackeo" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={profile}
									/>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>
										Empresa
									</label>
									<input 
										name="empresa" 
										placeholder="Nombre de la empresa en que trabaja" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={empresa}
									/>
								</div>
							</div>

							<div className="col-md-4">
								<div className="form-group">
									<label>
										Facebook
									</label>
									<input 
										name="facebook" 
										placeholder="Editar perfil de redes sociales" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={facebook}
									/>
								</div>
							</div>
						
						</div>

						<div className="form-row mb-3">	

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Dirección
									</label>
									<input 
										name="direccion" 
										placeholder="Dirección" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={direccion}
									/>
								</div>
							</div>

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Ciudad
									</label>
									<input 
										name="ciudad" 
										placeholder="Ciudad" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={ciudad}
									/>
								</div>
							</div>

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Estado/Provincia
									</label>
									<input 
										name="estado" 
										placeholder="Estado/Provincia" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={estado}
									/>
								</div>
							</div>

							<div className="col-md-3">
								<div className="form-group">
									<label>
										País
									</label>
									<input 
										name="pais" 
										placeholder="El país no se modifica a menos que haya hackeo" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={pais}
									/>
								</div>
							</div>
						
						</div>

						<div className="form-row mb-3">	

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Linkedin
									</label>
									<input 
										name="linkedin" 
										placeholder="Editar perfil de redes sociales" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={linkedin}
									/>
								</div>
							</div>

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Twitter
									</label>
									<input 
										name="twitter" 
										placeholder="Editar perfil de redes sociales" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={twitter}
									/>
								</div>
							</div>

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Instagram
									</label>
									<input 
										name="instagram" 
										placeholder="Editar perfil de redes sociales" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={instagram}
									/>
								</div>
							</div>

							<div className="col-md-3">
								<div className="form-group">
									<label>
										Canal de Youtube
									</label>
									<input 
										name="youtube" 
										placeholder="Editar perfil de redes sociales" 
										type="text" 
										className="form-control"
										onChange={leerInformacionPerfil}
                        				defaultValue={youtube}
									/>
								</div>
							</div>
						
						</div>

						<input 
								className="btn btn-primary my-3" 
								value="Guardar cambios" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)

}
export default withRouter(EditarPerfil);