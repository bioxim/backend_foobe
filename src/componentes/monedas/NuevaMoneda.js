import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

const NuevaMoneda = (props) => {

	const [producto, guardarProducto] = useState({
		code: '',
		name: '',
		symbol: ''
	});

    const agregarProducto = async e => {
        e.preventDefault();

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.post('/monedas', producto);
            //console.log(res);
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/monedas');

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
        const leerInformacionProducto = e => {
            guardarProducto({
                //obtener una copia del state y agregar el nuevo
                ...producto,
                [e.target.name]: e.target.value
            })
        }
	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Agregar Nueva Moneda
					</h5>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarProducto}
					>
						<div className="form-row">
							<div className="col-md-2">
								<div className="form-group">
									<label>
										Code
									</label>
									<input 
										name="code" 
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
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
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
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
										type="text" 
										className="form-control"
										onChange={leerInformacionProducto}
									/>
								</div>
							</div>
						</div>
				
						<input 
								className="btn btn-primary my-3" 
								value="Agregar" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(NuevaMoneda);