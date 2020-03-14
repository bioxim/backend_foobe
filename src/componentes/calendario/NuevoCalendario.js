import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

import 'moment/locale/es';

const NuevoCalendario = (props) => {

	const [feria, guardarFeria] = useState({
		nombre: '',
		fechainicial: '',
		fechafin: '',
		direccion: '',
		lat: '',
		long: '',
		pais: ''
	});
	
    // archivo = state, guardarArchivo = setState
	const [archivo, guardarArchivo] = useState('');

    const agregarFeria = async e => {
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
            const res = await clienteAxios.post('/calendario', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            //console.log(res);
            //lanzar alerta
            if(res.status === 200) {
                Swal.fire(
                    'Agregada Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/calendario');

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
        const leerInformacionFeria = e => {
            guardarFeria({
                //obtener una copia del state y agregar el nuevo
                ...feria,
                [e.target.name]: e.target.value
            })
        }

        // coloca la imagen en el state
        const leerArchivo = e => {
            console.log(e.target.files);
            guardarArchivo(e.target.files[0]);
        }

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Agregar Nuevo Evento del Calendario
					</h5>
					<h6 className="card-subtitle text-muted">Cargar los datos pertenecientes a la nueva feria.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarFeria}
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
									/>
								</div>
							</div>
						</div>
						<div className="form-row">
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
									<label>
										Dirección
									</label>
									<input 
										name="direccion" 
										placeholder="full address" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
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
										placeholder="País de la feria" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
									/>
								</div>
							</div>
							<div className="col-md-1">
								<div className="form-group">
									<label>
										Latitude
									</label>
									<input 
										name="lat" 
										placeholder="Latitud" 
										type="text" 
										className="form-control"
										onChange={leerInformacionFeria}
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
									/>
								</div>
							</div>
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Agregar Evento" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(NuevoCalendario);