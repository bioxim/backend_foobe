import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';

import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';
import Spinner from '../layout/Spinner';

import DetallesObjeto from './DetallesObjeto';

import Pagination from '../Pagination';

import { CRMContext } from '../../context/CRMContext';

function ObjetosPerfil(props) {

	const [objetos, guardarObjetos] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(25);

	// utilizar valores del context
	const [auth, guardarAuth] = useContext(CRMContext);

	useEffect(() => {

        	const consultarAPI = async () => {

        	
		            setLoading(true);

		            const resultado = await clienteAxios.get('/activity');
		            guardarObjetos(resultado.data);

		            setLoading(false);

			}

        	consultarAPI();

	}, [objetos, loading, guardarAuth]);

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = objetos.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	if(!auth.auth) {
		props.history.push('/login');
	}

    if(!objetos.length) return <Spinner />

    return (
		<Fragment>
			<div className="splash">
				<div className="splash-icon">
				</div>
			</div>
			<div className="wrapper  bg-light">
				<Header />
				<div className="main">
					<Navegacion />
					<div className="content">
						<div className="container-fluid">
							<div className="header">
								<h1 className="header-title">
									Clientes - Perfiles
								</h1>
							</div>
							
				            <DetallesObjeto
				                objetos={currentPosts} 
				            />

							<div className="row mt-1 mb-3">
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={objetos.length}
									paginate={paginate}
								/>
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
export default ObjetosPerfil;