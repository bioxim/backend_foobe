import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Feria from './Feria';
import NuevaFeria from './NuevaFeria';

import '../dashboard/Dashboard.css';
import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import Pagination from '../Pagination';

import { CRMContext } from '../../context/CRMContext';

const Ferias = (props) => {

	const [ ferias, guardarFerias ] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(10);

	const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };
	
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			
			setLoading(true);
			
			const feriasConsulta = await clienteAxios.get('/tradeshows');
			
			guardarFerias(feriasConsulta.data);

			setLoading(false);

		}
		consultarAPI();
	}, [ferias, loading, guardarAuth]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = ferias.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!ferias.length) return <Spinner />

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
									Ferias (tradeshows)
								</h1>
								<Link to={"/buscarferias"} className="btn btn-sm btn-warning text-white">
									<i class="fas fa-search mr-2"></i> Buscar
								</Link>
							</div>
							<div className="row">
								<NuevaFeria />
							</div>
							
							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Listado de las ferias - Admin
											</h5>
											<h6 className="card-subtitle text-muted">
												Las ferias únicamente para libros
											</h6>
										</div>
										<div className="card-body">
											<div className="react-bootstrap-table">
												<table className="table">
													<thead>
														<tr>
															<th>
																Imagen
															</th>
															<th>
																Nombre
															</th>
															<th>
																Inicio
															</th>
															<th>
																Final
															</th>
															<th>
																Categoría
															</th>
															<th>
																Tipo
															</th>
															<th>
																<i class="fas fa-plus"></i>
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>

													<Feria

															ferias={currentPosts} 

													/>

												</table>
											</div>
										</div>

										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={ferias.length}
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

export default Ferias;