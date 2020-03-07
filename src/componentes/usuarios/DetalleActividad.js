import React, { useState, useEffect, useContext, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

import 'moment/locale/es';

function EditarPerfil(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const [perfil, datosPerfil] = useState({
		nombre: '',
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
		youtube: ''
	});

	const [archivo, guardarArchivo] = useState('');

	useEffect( () => {

			const consultarAPI = async () => {
				const perfilConsulta = await clienteAxios.get(`/clientes/${id}`);
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

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/clientes/editar/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Your profile has been updated',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/crear-cuenta');

        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type:'error',
                title: 'Oups Something is wrong',
                text: 'Please, try again'
            })
        }
    }

    const leerInformacionPerfil = e => {
        datosPerfil({
            ...perfil,
            [e.target.name] : e.target.value
        })
    }

    const { nombre, imagen, apellido, email, taglineProfile, profile, telefono, empresa, direccion, ciudad, estado, pais, facebook, linkedin, twitter, instagram, youtube } = perfil;

    if(!perfil) return <Spinner />

    return (
		<Fragment>
			<div className="splash">
				<div className="splash-icon">
				</div>
			</div>

			<div className="wrapper  bg-light">
				<Header />
				
				<div className="main">
					
					<Navegacion />
					
					<div className="content">
						<div className="container-fluid">
							
							<div className="header">
								<h4 className="text-uppercase text-white">
									Profile details configuration
								</h4>
								<h5 className="text-uppercase">
									Please fill the blanks with your contact info, you will appear in our index lists
								</h5>
							</div>

							<div className="col">
								
								<div className="card">
									
									<div className="card-header">
										<h5 className="card-title">Personal details</h5>
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
											
											</div>

											<div className="form-row mb-3">	

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
										                ) : <p>No hay imagen colgada</p> }
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

						</div>	
					</div>
				</div>
			</div>

			<div className="redux-toastr" aria-live="assertive">
				<div>
					<div className="top-left">
					</div>
					<div className="top-right">
					</div>
					<div className="top-center">
					</div>
					<div className="bottom-left">
					</div>
					<div className="bottom-right">
					</div>
					<div className="bottom-center">
					</div>
				</div>
			</div>		
		</Fragment>
	)

}
export default withRouter(EditarPerfil);