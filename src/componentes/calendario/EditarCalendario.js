import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

import 'moment/locale/es';

function EditarCalendario(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

    const [feria, guardarFeria] = useState({
		nombre: '',
		fechainicial: '',
		fechafin: '',
		direccion: '',
		lat: '',
		long: '',
		pais: ''
	});

	const [archivo, guardarArchivo] = useState('');

    // cuando el componente carga
    useEffect(() => {
    	
	        const consultarAPI = async () => {
	            const feriaConsulta = await clienteAxios.get(`/calendario/${id}`);
	            guardarFeria(feriaConsulta.data);
	        }

	        consultarAPI();
    }, [id, guardarAuth]);

    const editarFeria = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', feria.nombre);
        formData.append('fechainicial', feria.fechainicial);
        formData.append('fechafin', feria.fechafin);
        formData.append('direccion', feria.direccion);
        formData.append('lat', feria.lat);
        formData.append('long', feria.long);
        formData.append('pais', feria.pais);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/calendario/${id}`, formData, {
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
            props.history.push('/calendario');

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
    const leerInformacionFeria = e => {
        guardarFeria({
            // obtener una copia del state y agregar el nuevo
            ...feria,
            [e.target.name] : e.target.value
        })
    }

    // coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    // extraer los valores del state
    const { nombre, fechainicial, fechafin, imagen, direccion, lat, long, pais } = feria;

    console.log(feria);

    if(!feria) return <Spinner />

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Actualizar datos del Evento
					</h5>
					<h6 className="card-subtitle text-muted">Modificar o actualizar los nuevos datos de esta feria en particular.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={editarFeria}
					>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre de la Feria
									</label>
									<input 
										name="nombre" 
										placeholder="Nombre de la Feria" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
                        				defaultValue={nombre}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>Fecha Inicio</label>
									<input 
										name="fechainicial" 
										placeholder="Fecha de Inicio" 
										type="date" 
										className="form-control"
										onChange={leerInformacionFeria}	
										defaultValue={fechainicial}							
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>Fecha Fin</label>
									<input 
										name="fechafin" 
										placeholder="Fecha de Final" 
										type="date" 
										className="form-control" 
										onChange={leerInformacionFeria}
                        				defaultValue={fechafin}
									/>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-md-4">
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
										onChange={leerInformacionFeria}
                        				defaultValue={direccion}
									/>
								</div>
							</div>
							<div className="col-md-2">
								<div className="form-group">
									<label>
										País
									</label>
									<input 
										name="pais" 
										placeholder="País" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
                        				defaultValue={pais}
									/>
								</div>
							</div>
							<div className="col-md-1">
								<div className="form-group">
									<label>
										Latitud
									</label>
									<input 
										name="lat" 
										placeholder="latitud" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
                        				defaultValue={lat}
									/>
								</div>
							</div>
							<div className="col-md-1">
								<div className="form-group">
									<label>
										Longitud
									</label>
									<input 
										name="long" 
										placeholder="Longitud" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
                        				defaultValue={long}
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
export default withRouter(EditarCalendario);