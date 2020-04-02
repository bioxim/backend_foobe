import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../../config/axios';
import Spinner from '../../layout/Spinner';

import Documentation from './Documentation';
import NuevoDocumentation from './NuevoDocumentation';

import '../../dashboard/Dashboard.css';
import '../../layout/auth/Header.css';
import Header from '../../layout/auth/Header';
import Navegacion from '../../layout/auth/Navegacion';

import Pagination from '../../Pagination';

import { CRMContext } from '../../../context/CRMContext';

const Documentations = (props) => {

	const [ docs, guardarDocs ] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(3);

	const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };
	
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
		
			setLoading(true);
			
			const docsConsulta = await clienteAxios.get('/doc');

			// colocar el resultado en el state
			guardarDocs(docsConsulta.data);

			setLoading(false);
		}
		consultarAPI();
	}, [docs, loading, guardarAuth]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = docs.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!docs.length) return <Spinner />

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
									Guía del Usuario (documentation)
								</h1>
							</div>
							<div className="row">
								<NuevoDocumentation />
							</div>
							
							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Manual del usuario
											</h5>
											<h6 className="card-subtitle text-muted">
												Detallado por sección web
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
																titulo
															</th>
															<th colspan="6">
																texto
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													
													<Documentation

														docs={currentPosts} 

													/>

												</table>
											</div>
										</div>
										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={docs.length}
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

export default Documentations;