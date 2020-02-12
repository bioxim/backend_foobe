import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../../config/axios';
import Spinner from '../../layout/Spinner';
import Contenido from './Contenido';
import FormNuevoContenido from './FormNuevoContenido';

import '../../dashboard/Dashboard.css';
import '../../layout/auth/Header.css';
import Header from '../../layout/auth/Header';
import Navegacion from '../../layout/auth/Navegacion';

import { CRMContext } from '../../../context/CRMContext';

const Contenidos = (props) => {

	const [ contenidos, guardarContenidos ] = useState([]);

	const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };
	
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			//console.log('Consultando...');
		const contenidosConsulta = await clienteAxios.get('/contenidos');
			//console.log(contenidosConsulta.data);

			// colocar el resultado en el state
			guardarContenidos(contenidosConsulta.data);
		}
		consultarAPI();
	}, [contenidos]);

	// spinner de carga
	if(!contenidos.length) return <Spinner />

	return (
		<Fragment>
			<div className="splash">
				<div className="splash-icon">
				</div>
			</div>
			<div className="wrapper">
				<Header />
				<div className="main">
					<Navegacion />
					<div className="content">
						<div className="container-fluid">
							<div className="header">
								<h1 className="header-title">
									Secciones de la web
								</h1>
							</div>
							<div className="row">
								<FormNuevoContenido />				
							</div>
							
							<div className="row">
								<div className="col">
									<div className="card">
										<div className="card-header">
											<h5 className="card-title">
												Lista de Secciones dinámicas
											</h5>
											<h6 className="card-subtitle text-muted">
												Acciones a tomar en estas secciones en particular
											</h6>
										</div>
										<div className="card-body">
											<div className="react-bootstrap-table">
												<table className="table">
													<thead>
														<tr>
															<th>
																Tagline
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													<tbody>
														{contenidos.map(contenido => (
															//console.log(contenido)
															<Contenido 
																key={contenido._id}
																contenido={contenido}
															/>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="redux-toastr" aria-live="assertive">
				<div>
					<div className="top-left">
					</div>
					<div className="top-right">
					</div>
					<div className="top-center">
					</div>
					<div className="bottom-left">
					</div>
					<div className="bottom-right">
					</div>
					<div className="bottom-center">
					</div>
				</div>
			</div>		
		</Fragment>
	)
}

export default Contenidos;