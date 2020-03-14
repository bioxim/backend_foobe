import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

function EditarProducto(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

   const [producto, guardarProducto] = useState({
		codigo: '',
		nombre: '',
		descripcion: ''
	});

    // cuando el componente carga
    useEffect(() => {
    	
	        const consultarAPI = async () => {
	            const productoConsulta = await clienteAxios.get(`/producto/${id}`);
	            guardarProducto(productoConsulta.data);
	        }

	        consultarAPI();
    }, [id, guardarAuth]);

    const editarProducto = async e => {
        e.preventDefault();

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/producto/${id}`, producto);

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/productoshs6');

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
    const leerInformacionProducto = e => {
        guardarProducto({
            // obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name] : e.target.value
        })
    }
    // extraer los valores del state
    const { nombre, descripcion, codigo } = producto;

    if(!nombre) return <Spinner />

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Modificar Producto HS6
					</h5>
					<h6 className="card-subtitle text-muted">Modificar o actualizar los nuevos datos de este producto en particular.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={editarProducto}
					>
						<div className="form-row">
							<div className="col-md-2">
								<div className="form-group">
									<label>
										Codigo
									</label>
									<input 
										name="codigo" 
										placeholder="Nombre de la Feria" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
                        				defaultValue={codigo}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre corto
									</label>
									<input 
										name="nombre" 
										placeholder="Nombre corto" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
                        				defaultValue={nombre}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label>
										Descripción
									</label>
									<input 
										name="descripcion" 
										placeholder="Nombre completo" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
                        				defaultValue={descripcion}
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
export default withRouter(EditarProducto);