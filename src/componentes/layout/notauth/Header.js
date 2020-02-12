import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { CRMContext } from '../../../context/CRMContext';

import './addons/noauth.css';

const Header = (props) => {

	const [auth, guardarAuth] = useContext(CRMContext);

	const cerrarSesion = () =>{
		// auth.auth = false y el token se remueve
		guardarAuth({
			token: '',
			auth: false
		});

		localStorage.setItem('token', '');

		// redireccionar
		props.history.push('/');
	}

	return (
		<header>
	        <nav className="navbar navbar-expand-lg navbar-light bg-white">
		      <div className="container">
		        <Link to={"/"} className="navbar-brand">
		          <img src="img/foobe.png" className="navbar-brand-img img-fluid logo" alt="foobe community logo"/>
		        </Link>
		        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		          <span className="navbar-toggler-icon"></span>
		        </button>
		        <div className="navbar-collapse collapse" id="navbarCollapse">
		        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
		           <i className="fas fa-times"></i>
		         </button>
		          <ul className="navbar-nav ml-auto">
		            { auth.auth ? (
		            <li className="nav-item dropdown hovered">
		              <Link to={"/dashboard"} className="nav-link font-weight-bold text-primary" id="navbarLandings">
		                Community
		              </Link>
		            </li>
		            ) : (
		            	<li className="nav-item dropdown hovered">
		              <Link to={"/login"} className="nav-link font-weight-bold" id="navbarLandings">
		                Community
		              </Link>
		            </li>
		            )}
		          </ul>
		         { !auth.auth ? (
					<Fragment>
						<Link to={"/login"} className="navbar-btn btn btn-success ml-auto text-uppercase">
			              <i className="fas fa-sign-in-alt"></i>  Log-In
			            </Link>
					</Fragment>
		         ) : null }
		        { auth.auth ? (
						<button
		            		type="button"
		            		className="navbar-btn btn btn-danger ml-auto margen"
		            		onClick={cerrarSesion}
		            	>
		            		<i className="mr-2 fas fa-times"></i> 
		            		Sign Out
		            	</button>
					) : null }
		        </div>
		      </div>
		  </nav>
	    </header>
	)
}
 export default withRouter(Header); 