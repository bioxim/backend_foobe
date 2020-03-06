import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import Spinner from '../layout/Spinner';

import '../dashboard/Dashboard.css';
import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import NuevoUsuario from './NuevoUsuario';
import Usuario from './Usuario';
import Pagination from '../Pagination';

import FormBuscarCliente from './FormBuscarCliente';

import { CRMContext } from '../../context/CRMContext';

const Usuarios = ({history}) => {
	
	const [auth, guardarAuth] = useContext(CRMContext);
	
	const [busqueda, guardarBusqueda] = useState('');
	const [ administradores, guardarAdministradores ] = useState([]);

	const [loading, setLoading] = useState(false);
  	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(20);

  	useEffect( () => {
		// Query a la API
		const consultarAPI = async () => {
			
			setLoading(true);
			
			const administradoresConsulta = await clienteAxios.get('/administradores');
			
			guardarAdministradores(administradoresConsulta.data);

			setLoading(false);

		}
		consultarAPI();
	}, [administradores, loading, guardarAuth]);

	const buscarCliente = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/administradores/busqueda/${busqueda}`);

        // si no hay resultados una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]) {

            let clienteResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            clienteResultado.cliente = resultadoBusqueda.data[0].email;



            // ponerlo en el state
            guardarAdministradores([...administradores, clienteResultado]);

            Swal.fire({
                type: 'success',
                title: 'Se encontró el administrador',
                text: clienteResultado.cliente
            })

        } else {
            // no hay resultados
            Swal.fire({
                type: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }
    }

    // almacenar una busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value );
    }

	// Get current 
	  const indexOfLastPost = currentPage * postsPerPage;
	  const indexOfFirstPost = indexOfLastPost - postsPerPage;
	  const currentPosts = administradores.slice(indexOfFirstPost, indexOfLastPost);

	  // Change page
	  const paginate = pageNumber => setCurrentPage(pageNumber);

	// spinner de carga
	if(!administradores.length) return <Spinner />

    if(!auth.auth) {
    	history.push('/login');
    };

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
									Administrador de usuarios administradores
								</h1>
								<FormBuscarCliente
							        buscarCliente={buscarCliente}
							        leerDatosBusqueda={leerDatosBusqueda}
							    />
							</div>

							<div className="row">
								<NuevoUsuario />
							</div>

							<div className="row">
								<div className="col">
									<div className="card mb-3">
										<div className="card-header">
											<h5 className="card-title">
												Listado usuarios administradores del sistema
											</h5>
											<h6 className="card-subtitle text-muted">
												Todos los usuarios administradores
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
																email
															</th>
															<th>
																Eliminar
															</th>
														</tr>
													</thead>

													<Usuario

															administradores={currentPosts} 

													/>

												</table>
											</div>
										</div>

										<Pagination
									        postsPerPage={postsPerPage}
									        totalPosts={administradores.length}
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

export default Usuarios;