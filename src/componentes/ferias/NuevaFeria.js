import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

import 'moment/locale/es';
import moment from 'moment';

const NuevaFeria = (props) => {

	const [feria, guardarFeria] = useState({
		nombre: '',
		fechainicial: '',
		fechafin: '',
		tipo: '',
		categoria: ''

	});
	
    // archivo = state, guardarArchivo = setState
	const [archivo, guardarArchivo] = useState('');

    const agregarFeria = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('nombre', feria.nombre);
        formData.append('fechainicial', moment(feria.fechainicial));
        formData.append('fechafin', moment(feria.fechafin));
        formData.append('tipo', feria.tipo);
        formData.append('categoria', feria.categoria);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.post('/tradeshows', formData, {
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
            props.history.push('/tradeshows');

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
						Agregar Nueva Feria
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
									<label>Tipo</label>
									<select 
											name="tipo" 
											className="custom-select"
											onChange={leerInformacionFeria}
									>
										<option selected disabled>-- Elige una categoria --</option>
										<option value="International">International</option>
										<option value="National">National</option>
										<option value="Regional">Regional</option>
									</select>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>Categoría</label>
									<select 
											name="categoria" 
											className="custom-select"
											onChange={leerInformacionFeria}
									>
										<option value="" selected disabled>-- Elige una categoria --</option>
										<option value="Food">Food</option>
										<option value="Beverages">Beverages</option>
										<option value="Agriculture">Agriculture</option>
										<option value="Breeding">Breeding</option>
										<option value="Honey">Honey</option>
										<option value="Packaging">Packaging</option>
										<option value="Machinery">Machinery</option>
										<option value="Gastronomy">Gastronomy</option>
										<option value="Organic">Organic</option>
									</select>
								</div>
							</div>
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Agregar Feria" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(NuevaFeria);