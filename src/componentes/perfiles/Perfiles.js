import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

import Perfil from './Perfil';
import NuevoPerfil from './NuevoPerfil';

import '../dashboard/Dashboard.css';
import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import Pagination from '../Pagination';

import { CRMContext } from '../../context/CRMContext';

const Perfiles = (props) => {
	
	const [ perfiles, guardarPerfiles ] = useState([]);

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

			const perfilesConsulta = await clienteAxios.get('/profile');

			guardarPerfiles(perfilesConsulta.data);

			setLoading(false);
		}
		consultarAPI();
	}, [perfiles]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = perfiles.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!perfiles.length) return <Spinner />

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
									Perfiles cargados por los clientes
								</h1>
								<Link to={"/"} className="btn btn-sm btn-warning text-white">
									<i class="fas fa-search mr-2"></i> Buscar
								</Link>
							</div>
							<div className="row">
								
								<NuevoPerfil />

							</div>
							
							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Revisión de perfiles
											</h5>
											<h6 className="card-subtitle text-muted">
												Los perfiles se pueden editar si incumple con los parámetros establecidos por las políticas de privacidad de FOOBE
											</h6>
										</div>
										<div className="card-body">
											<div className="react-bootstrap-table">
												<table className="table">
													<thead>
														<tr>
															<th>
																nombre
															</th>
															<th>
																tagline
															</th>
															<th>
																profile
															</th>
															<th>
																tel
															</th>
															<th>
																cumple
															</th>
															<th>
																empresa
															</th>
															<th>
																dirección
															</th>
															<th>
																país
															</th>
															<th>
																imagen
															</th>
															<th>
																redes sociales
															</th>
															<th>
																Editar
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>
													
													<Perfil

															perfiles={currentPosts} 

													/>

												</table>
											</div>
										</div>

										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={perfiles.length}
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
export default Perfiles;
