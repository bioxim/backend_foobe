import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

import moment from 'moment';

function EditarCliente(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const [miembro, guardarMiembro] = useState({
		nombre: '',
		tagline: '',
		linkedin: '',
		twitter: '',
		facebook: '',
		instagram: '',
		empresa: '',
		direccion: ''
	});

	const [archivo, guardarArchivo] = useState('');

	useEffect(() => {
    	
	        const consultarAPI = async () => {
	            const miembroConsulta = await clienteAxios.get(`/clientes/${id}`);
	            guardarMiembro(miembroConsulta.data);
	        }

	        consultarAPI();
    }, [id, guardarAuth]);

	const editarMiembro = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', miembro.nombre);
        formData.append('tagline', miembro.tagline);
        formData.append('linkedin', miembro.linkedin);
        formData.append('twitter', miembro.twitter);
        formData.append('facebook', miembro.facebook);
        formData.append('instagram', miembro.instagram);
        formData.append('empresa', miembro.empresa);
        formData.append('direccion', miembro.direccion);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/clientes/editar/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );
            //console.log(res);
            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Profile Up-to-date :)',
                    res.data.mensaje,
                    'success'
                )
            }
            // redireccionar
            //props.history.push('/profile');

        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
            	type:'error',
                title: 'Error',
                text: 'Please, try again'
            })
        }
    }

    // leer los datos del formulario
    const leerInformacionMiembro = e => {
        guardarMiembro({
            ...miembro,
            [e.target.name] : e.target.value
        })
    }

    // coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    const { nombre, tagline, nacimiento, imagen, actividad, linkedin, twitter, facebook, instagram, empresa, direccion, pais } = miembro;

    if(!miembro) return <Spinner />

    return(

    	<div className="col">
			<div className="card">
				
				<div className="card-header">
					<h5 className="card-title">
						Moderar el perfil del usuario registrado
					</h5>
					<h6 className="card-subtitle text-muted">
						Si la ofensa es muy grave, eliminarlo.
					</h6>
				</div>

				<div className="card-body">
					<form
						onSubmit={editarMiembro}
					>

						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre - nacimiento { nacimiento ? moment(`${nacimiento}`).format('l') : null }
									</label>
									<input 
										name="nombre" 
										placeholder="Nombre completo de la persona" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={nombre}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>Tagline - {actividad ? actividad : null}</label>
									<input 
										name="tagline" 
										placeholder="Lema" 
										type="texto" 
										className="form-control"
										onChange={leerInformacionMiembro}	
										defaultValue={tagline}							
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
										placeholder="nombre de la empresa" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={empresa}
									/>
								</div>
							</div>
						</div>
						
						<div className="form-row">
							<div className="col-md-5">
								<div className="form-group">
										{ imagen ? (
					                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt="imagen" width="150" className="img-fluid pb-3" />
					                    ) : null }
				                    <input 
				                        type="file"  
				                        name="imagen"
				                        onChange={leerArchivo}
				                    />
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Dirección Completa
									</label>
									<input 
										name="direccion" 
										placeholder="full address" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={direccion}
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
										placeholder="País" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={pais}
									/>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col text-center">
								{ linkedin ? ( 
									<a className="btn btn-primary rounded-circle mx-1" href={`https://www.linkedin.com/in/${linkedin}`} target="_blanck"><i className="fab fa-linkedin-in"></i></a>
								) : null }
								{ twitter ? (
									<a className="btn btn-info rounded-circle mx-1" href={`https://twitter.com/${twitter}`} target="_blanck"><i className="fab fa-twitter"></i></a>
								) : null }
								{ facebook ? (
									<a className="btn btn-primary rounded-circle mx-1" href={`https://www.facebook.com/${facebook}`} target="_blanck"> <i className="fab fa-facebook-f"></i> </a>
								) : null }
								{ instagram ? (
									<a className="btn btn-danger rounded-circle mx-1" href={`https://www.instagram.com/${instagram}`} target="_blanck"><i className="fab fa-instagram"></i></a>
								) : null }
							</div>
						</div>
						<div className="row">
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Linkedin
									</label>
									<input 
										name="linkedin" 
										placeholder="Linkedin" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
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
										placeholder="Twitter" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={twitter}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Facebook
									</label>
									<input 
										name="facebook" 
										placeholder="Facebook" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={facebook}
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
										placeholder="Instagram" 
										type="text" 
										className="form-control"
										onChange={leerInformacionMiembro}
                        				defaultValue={instagram}
									/>
								</div>
							</div>
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Guardar Cambios" 
								type="submit"
						/>

					</form>
				</div>
			</div>
		</div>

    )
}

export default withRouter(EditarCliente);