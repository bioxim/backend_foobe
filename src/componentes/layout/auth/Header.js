import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { CRMContext } from '../../../context/CRMContext';


const Header = () => {

	const [auth] = useContext(CRMContext);

    if(!auth.auth) return null;

	return (
		<nav className="sidebar collapse toggled2" id="collapseExample" >
		<div className="sidebar-content">
			<Link to={"/dashboard"} className="sidebar-brand d-none d-sm-block"> 
				<span className="align-middle">Foobe App</span> 
			</Link>
			<div className="sidebar-user">
				<img src="/img/avatar-static.jpg" className="img-fluid rounded-circle mb-2" alt="Linda Miller" />
				<div className="font-weight-bold">
					María Ximena Camino
				</div>
				<small>
					Front-end Developer & SEO
				</small>
			</div>
			<ul className="sidebar-nav">
				<li className="sidebar-header">
					Main
				</li>
				<li className="sidebar-item">
					<Link to={"/dashboard"} className="sidebar-link">
						<i className="fas fa-home"></i>
						<span className="align-middle">
							Dashboard
						</span> 
					</Link>
				</li>
				
				<li className="sidebar-header">
					Manejo de Usuarios
				</li>
				<li className="sidebar-item ">
					<span data-toggle="collapse" className="sidebar-link" href="#collapseExample4" role="button" aria-expanded="true">
						<i className="fas fa-lock"></i>
						<span className="align-middle">
							Cuentas
						</span>
					</span>
					<div className="collapse" id="collapseExample4" aria-expanded="true">
						<ul id="item" className="sidebar-dropdown list-unstyled">
							<li className="sidebar-item ">
								<Link to={"/crear-cuenta"} className="sidebar-link">
									Clientes
								</Link>
							</li>
							<li className="sidebar-item ">
								<Link to={"/crear-admin"} className="sidebar-link">
										Administradores
								</Link>
							</li>
						</ul>
					</div>
				</li>

				<li className="sidebar-header">
					Bases de datos
				</li>
				<li className="sidebar-item ">
					<span data-toggle="collapse" className="sidebar-link" href="#collapseExample6" role="button" aria-expanded="true">
						<i className="fas fa-lock"></i>
						<span className="align-middle">
							Libros
						</span>
					</span>
					<div className="collapse" id="collapseExample6" aria-expanded="true">
						<ul id="item" className="sidebar-dropdown list-unstyled">
							<li className="sidebar-item ">
								<Link to={"/tradeshows"} className="sidebar-link">
									Ferias
								</Link>
							</li>
							<li className="sidebar-item ">
								<Link to={"/tarjetas"} className="sidebar-link">
									Tarjetas
								</Link>
							</li>
							<li className="sidebar-item ">
								<Link to={"/books"} className="sidebar-link">
									Libros
								</Link>
							</li>
							<li className="sidebar-item ">
								<Link to={"/librosfisicos"} className="sidebar-link">
									Manejo de PDFs
								</Link>
							</li>
						</ul>
					</div>
				</li>

				<li className="sidebar-item ">
						<span data-toggle="collapse" className="sidebar-link" href="#collapseExample5" role="button" aria-expanded="true">
							<i className="fab fa-freebsd"></i>
							<span className="align-middle">
								Contenido Web
							</span>
						</span>
						<div className="collapse" id="collapseExample5" aria-expanded="true">
							<ul id="item" className="sidebar-dropdown list-unstyled">
								<li className="sidebar-item ">
									<Link to={"/contenidos"} className="sidebar-link">
										Home - Principal
									</Link>
								</li>
								<li className="sidebar-item ">
									<Link to={"/changelog"} className="sidebar-link">
										ChangeLog
									</Link>
								</li>
								<li className="sidebar-item ">
									<Link to={"/doc"} className="sidebar-link">
										Documentation
									</Link>
								</li>
								<li className="sidebar-item ">
									<Link to={"/productores"} className="sidebar-link">
										Productores
									</Link>
								</li>
								<li className="sidebar-item ">
									<Link to={"/manejo-newsletters"} className="sidebar-link">
										Correos Newsletter
									</Link>
								</li>
								<li className="sidebar-item ">
									<Link to={"/productoshs6"} className="sidebar-link">
										Código HS6
									</Link>
								</li>
							</ul>
						</div>
				</li>

			</ul>
		</div>
	</nav>
	)
}

export default Header;
