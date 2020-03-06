import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

import Tarjeta from './Tarjeta';
import NuevaTarjeta from './NuevaTarjeta';

import '../dashboard/Dashboard.css';
import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import Pagination from '../Pagination';

import { CRMContext } from '../../context/CRMContext';

const Tarjetas = (props) => {

	const [ tarjetas, guardarTarjetas ] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(25);

	const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };
	
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			
			setLoading(true);

			const tarjetasConsulta = await clienteAxios.get('/tarjetas');

			guardarTarjetas(tarjetasConsulta.data);

			setLoading(false);
		}
		consultarAPI();
	}, [tarjetas, loading, guardarAuth]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = tarjetas.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!tarjetas.length) return <Spinner />

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
									Tarjetas Personales de negocios Admin
								</h1>
								<Link to={"/buscartarjetas"} className="btn btn-sm btn-warning text-white">
									<i class="fas fa-search mr-2"></i> Buscar
								</Link>
							</div>
							<div className="row">
								
								<NuevaTarjeta />

							</div>
							
							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Carga de Tarjetas
											</h5>
											<h6 className="card-subtitle text-muted">
												Las tarjetas conseguidas por nosotras en las ferias a nuestro alcance
											</h6>
										</div>
										<div className="card-body">
											<div className="react-bootstrap-table">
												<table className="table">
													<thead>
														<tr>
															<th>
																Nombre
															</th>
															<th>
																Empresa
															</th>
															<th>
																Email
															</th>
															<th>
																Teléfono
															</th>
															<th>
																Web
															</th>
															<th>
																País
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													
													<Tarjeta

															tarjetas={currentPosts} 

													/>

												</table>
											</div>
										</div>

										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={tarjetas.length}
									        paginate={paginate}
									    />

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

export default Tarjetas;