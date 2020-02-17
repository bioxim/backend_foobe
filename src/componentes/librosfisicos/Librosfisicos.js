import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

import Librofisico from './Librofisico';
import NuevoLibrofisico from './NuevoLibrofisico';

import '../dashboard/Dashboard.css';
import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import Pagination from '../Pagination';

import { CRMContext } from '../../context/CRMContext';

const Librosfisicos = (props) => {

	const [ librosf, guardarLibrosf ] = useState([]);

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
		
			setLoading(true);
			
			const librosfConsulta = await clienteAxios.get('/librosfisicos');

			// colocar el resultado en el state
			guardarLibrosf(librosfConsulta.data);

			setLoading(false);
		}
		consultarAPI();
	}, [librosf]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = librosf.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!librosf.length) return <Spinner />

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
									Listado de libros en PDF sobre los contactos de las ferias
								</h1>
							</div>
							<div className="row">
								<NuevoLibrofisico />
							</div>
							
							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Manual del usuario
											</h5>
											<h6 className="card-subtitle text-muted">
												Detallado de los libros físicos
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
																Fecha
															</th>
															<th>
																Contactos
															</th>
															<th>
																País
															</th>
															<th>
																Producto
															</th>
															<th>
																PDF
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													
													<Librofisico

														librosf={currentPosts} 

													/>

												</table>
											</div>
										</div>
										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={librosf.length}
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

export default Librosfisicos;