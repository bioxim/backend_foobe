import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

function EditarLibrofisico(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const [librof, guardarLibrof] = useState({
		nombre: '',
		fecha: '',
		contactos: '',
		pais: '',
		producto: ''
	});
	// archivo = state, guardarArchivo = setState
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

	// cuando el componente carga
    useEffect(() => {

	        const consultarAPI = async () => {
	            const librofConsulta = await clienteAxios.get(`/librosfisicos/${id}`);
	            guardarLibrof(librofConsulta.data);
	        }

	        consultarAPI();
    }, [id, guardarAuth]);

    const editarLibrof = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', librof.nombre);
        formData.append('fecha', librof.fecha);
        formData.append('contactos', librof.contactos);
        formData.append('pais', librof.pais);
        formData.append('producto', librof.producto);
        formData.append('pdf', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/librosfisicos/${id}`, formData, {
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
            props.history.push('/librosfisicos');

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
    const leerInformacionDoc = e => {
        guardarLibrof({
            // obtener una copia del state y agregar el nuevo
            ...librof,
            [e.target.name] : e.target.value
        })
    }

    // coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    // extraer los valores del state
    const {nombre, fecha, pdf, contactos} = librof;

    if(!librof) return <Spinner />

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Editar Documento de la Guía de Usuario
					</h5>
					<h6 className="card-subtitle text-muted">Cargar las instrucciones pertenecientes a la nueva sección.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={editarLibrof}
					>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre
									</label>
									<input 
										name="nombre" 
										placeholder="Título de la sección" 
										type="text" 
										className="form-control"
										onChange={leerInformacionDoc}
										defaultValue={nombre}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>Fecha</label>
									<input 
											className="form-control"
											name="fecha" 
											placeholder="Fecha" 
											type="date"
											onChange={leerInformacionDoc}
											defaultValue={fecha}
									>
									</input>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>País</label>
									<select 
											name="pais" 
											className="custom-select"
											onChange={leerInformacionDoc}
									>
										<option selected disabled>-- Elige un país --</option>
										{paises.map(pais =>(
											<option value={pais.name}>{pais.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-md-6">
								<div className="form-group">
									{ pdf ? (
					                        <a href={`${process.env.REACT_APP_BACKEND_URL}/${pdf}`} 
					                        	className="btn btn-success mr-3"
					                        	target="_blanck"
					                        >
					                        	DESCARGAR ANTERIOR
					                        </a>
					                    ) : null }
				                    <input 
				                        type="file"  
				                        name="pdf"
				                        onChange={leerArchivo}
				                    />
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label className="form-label">Contactos</label>
									<input  type="number"  
				                            name="contactos"
				                            className="form-control"
				                            onChange={leerInformacionDoc} 
				                            defaultValue={contactos}
				                    />
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label>Tipo</label>
									<select 
											name="producto" 
											className="custom-select"
											onChange={leerInformacionDoc}
									>
										<option selected disabled>-- Elige una categoria --</option>
										<option value="Honey">Honey</option>
										<option value="Soybeans">Soybeans</option>
									</select>
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

export default withRouter(EditarLibrofisico);