import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';
import { withRouter } from 'react-router-dom';

const NuevoDocumentation = (props) => {

	const [doc, guardarDoc] = useState({
		titulo: '',
		texto: ''
	});
	
    // archivo = state, guardarArchivo = setState
	const [archivo, guardarArchivo] = useState('');

    const agregarDoc = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('titulo', doc.titulo);
        formData.append('texto', doc.texto);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.post('/doc', formData, {
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
            props.history.push('/doc');

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
        const leerInformacionDoc = e => {
            guardarDoc({
                //obtener una copia del state y agregar el nuevo
                ...doc,
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
						Agregar Nuevo Documento de la Guía de Usuario
					</h5>
					<h6 className="card-subtitle text-muted">Cargar las instrucciones pertenecientes a la nueva sección.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarDoc}
					>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Título
									</label>
									<input 
										name="titulo" 
										placeholder="Título de la sección" 
										type="text" 
										className="form-control"
										onChange={leerInformacionDoc}
									/>
								</div>
							</div>
							<div className="col-md-8">
								<div className="form-group">
									<label>Texto descriptivo</label>
									<textarea 
											className="form-control"
											name="texto" 
											placeholder="Descripción" 
											type="text"
											onChange={leerInformacionDoc}
											rows="5"
									>
									</textarea>
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
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Agregar Document" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(NuevoDocumentation);