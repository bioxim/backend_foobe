import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../../config/axios';
import Spinner from '../../layout/Spinner';
import Pagination from '../../Pagination';
import Productor from './Productor';

import '../../dashboard/Dashboard.css';
import '../../layout/auth/Header.css';
import Header from '../../layout/auth/Header';
import Navegacion from '../../layout/auth/Navegacion';

import { CRMContext } from '../../../context/CRMContext';

const Productores = (props) => {

	const [ productores, guardarProductores ] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(20);

	const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };
	
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			//console.log('Consultando...');

			setLoading(true);

			const productoresConsulta = await clienteAxios.get('/productores');
			//console.log(contenidosConsulta.data);

			// colocar el resultado en el state
			guardarProductores(productoresConsulta.data);

			setLoading(false);
		}
		consultarAPI();
	}, [productores,loading, guardarAuth]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = productores.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!productores.length) return <Spinner />

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
									Productores que cargaron su info desde la web
								</h1>
							</div>

							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Lista de productores no relevados
											</h5>
											<h6 className="card-subtitle text-muted">
												Se pueden depurar los siguientes registros de la base de datos
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
																email
															</th>
															<th>
																teléfono
															</th>
															<th>
																producto
															</th>
															<th>
																zona
															</th>
															<th>
																dirección
															</th>
															<th>
																país
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													
													<Productor

														productores={currentPosts} 

													/>

												</table>
											</div>
										</div>
										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={productores.length}
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

export default Productores;