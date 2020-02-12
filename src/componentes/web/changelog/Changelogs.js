import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../../config/axios';
import Spinner from '../../layout/Spinner';
import Changelog from './Changelog';
import NuevoChangelog from './NuevoChangelog';

import 'moment/locale/es';

import '../../dashboard/Dashboard.css';
import '../../layout/auth/Header.css';
import Header from '../../layout/auth/Header';
import Navegacion from '../../layout/auth/Navegacion';

import Pagination from '../../Pagination';

import { CRMContext } from '../../../context/CRMContext';

const Changelogs = (props) => {

	const [ changelogs, guardarChangelogs ] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(5);

	const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };
	
	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			//console.log('Consultando...');

			setLoading(true);

			const changelogsConsulta = await clienteAxios.get('/changelog');
			//console.log(contenidosConsulta.data);
      		

			// colocar el resultado en el state
			guardarChangelogs(changelogsConsulta.data);

			setLoading(false);
		}

		consultarAPI();
	}, [changelogs]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = changelogs.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!changelogs.length) return <Spinner />

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
									Changelogs (actualizaciones)
								</h1>
							</div>
							<div className="row">
								
								<NuevoChangelog />

							</div>
							
							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Lista de Logs
											</h5>
											<h6 className="card-subtitle text-muted">
												Acciones a tomar en sección Changelog en particular
											</h6>
										</div>
										<div className="card-body">
											<div className="react-bootstrap-table">
												<table className="table">
													<thead>
														<tr>
															<th className="sortable">
																Fecha
															</th>
															<th className="sortable">
																Changelog
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													
														<Changelog

															changelogs={currentPosts} 

														/>
												</table>
											</div>
										</div>

										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={changelogs.length}
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

export default Changelogs;