import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';

function EditarMoneda(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

   const [producto, guardarProducto] = useState({
		code: '',
		name: '',
		symbol: ''
	});

    // cuando el componente carga
    useEffect(() => {
    	
	        const consultarAPI = async () => {
	            const productoConsulta = await clienteAxios.get(`/monedas/${id}`);
	            guardarProducto(productoConsulta.data);
	        }

	        consultarAPI();
    }, [id, guardarAuth]);

    const editarProducto = async e => {
        e.preventDefault();

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/monedas/${id}`, producto);

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/monedas');

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
    const { code, name, symbol } = producto;

    if(!producto) return <Spinner />

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Modificar Moneda
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
										name="code" 
										placeholder="Code" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
                        				defaultValue={code}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre
									</label>
									<input 
										name="name" 
										placeholder="nombre completo de la moneda" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
                        				defaultValue={name}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label>
										Symbol
									</label>
									<input 
										name="symbol" 
										placeholder="símbolo" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
                        				defaultValue={symbol}
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
export default withRouter(EditarMoneda);