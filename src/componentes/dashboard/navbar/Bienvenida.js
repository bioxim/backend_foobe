import React, { useContext, Fragment } from 'react';
import { CRMContext } from '../../../context/CRMContext';

const Bienvenida = (props) => {

	const [auth] = useContext(CRMContext);
	const { credenciales } = auth;
	const { email } = credenciales;

	return (
		<Fragment>
			
			<div>
				<h1 className="header-title">
					Administradora {email}!
				</h1>
			</div>

			<p className="header-subtitle">
				Administración de Foobe.
			</p>
		</Fragment>
	)
}

export default Bienvenida;
