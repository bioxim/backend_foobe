import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

const NuevaTarjeta = (props) => {

	const [tarjeta, guardarTarjeta] = useState({
		nombre: '',
		empresa: '',
		email: '',
		telefono: '',
		url: '',
		pais: ''
	});

	const [ paises, guardarPaises ] = useState([]);

	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {

			const paisesConsulta = await clienteAxios.get('https://restcountries.eu/rest/v2/all');

			guardarPaises(paisesConsulta.data);

		}
		consultarAPI();
	}, [paises]);

    const agregarTarjeta = async e => {
        e.preventDefault();

        clienteAxios.post('/tarjetas', tarjeta)
			.then(res => {
				console.log(res);
				if(res.data.code === 11000) {
					//console.log('Error de duplicado de Mongo')
					Swal.fire({
						type: 'error',
						title: 'Hubo un error',
						text: 'Esta tarjeta está duplicada'
					})
				} else {
					//console.log(res.data);
					Swal.fire(
					  'Se agregó la nueva tarjeta!',
					  res.data.mensaje,
					  'success'
					)

					
				}

            // redireccionar
            props.history.push('/tarjetas');

        });

    }

    // leer los datos del formulario
        const leerInformacionTarjeta = e => {
            guardarTarjeta({
                //obtener una copia del state y agregar el nuevo
                ...tarjeta,
                [e.target.name]: e.target.value
            })
        }

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Agregar Nueva Tarjeta
					</h5>
					<h6 className="card-subtitle text-muted">Cargar las tarjetas obtenidas en ferias.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={agregarTarjeta}
					>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<label>
										Nombre
									</label>
									<input 
										name="nombre" 
										placeholder="Nombre que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={leerInformacionTarjeta}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Empresa
									</label>
									<input 
										name="empresa" 
										placeholder="Empresa que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={leerInformacionTarjeta}
									/>
								</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Email
									</label>
									<input 
										name="email" 
										placeholder="Email que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={leerInformacionTarjeta}
									/>
								</div>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Teléfono
									</label>
									<input 
										name="telefono" 
										placeholder="Telefono que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={leerInformacionTarjeta}
									/>
								</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<div className="form-group">
									<label>
										Website
									</label>
									<input 
										name="url" 
										placeholder="Url que figura en la tarjeta" 
										type="text" 
										className="form-control"
										onChange={leerInformacionTarjeta}
									/>
								</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="form-group">
									<label>País</label>
									<select 
											name="pais" 
											className="custom-select"
											onChange={leerInformacionTarjeta}
									>
										<option selected disabled>-- Elige un país --</option>
										{paises.map(pais =>(
											<option value={pais.name}>{pais.name}</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Agregar Tarjeta" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)

}

export default withRouter(NuevaTarjeta);