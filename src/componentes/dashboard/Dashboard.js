import React, { useContext, Fragment } from 'react';

import './Dashboard.css';
import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Bienvenida from './navbar/Bienvenida';
import Navegacion from '../layout/auth/Navegacion';

// importar el Context
import { CRMContext } from '../../context/CRMContext';

const Dashboard = (props) => {

	// utilizar valores del context
	const [auth] = useContext(CRMContext);

	if(!auth.auth) {
		props.history.push('/login');
	}

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
								<Bienvenida />
							</div>
							<div className="row">
								<div className="d-flex col-xxl-7 col-xl-6">
									<div className="flex-fill w-100 card">
										<div className="card-header">
											<div className="card-actions float-right">
												<div className="d-inline-block dropdown">
													<h1>Contenido del Main a Definir</h1>
												</div>
											</div>
										</div>
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

export default Dashboard;