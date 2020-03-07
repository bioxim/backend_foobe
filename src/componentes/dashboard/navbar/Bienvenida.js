import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../../config/axios';

const Bienvenida = (props) => {

	const { id } = props;

	const [admin, guardarAdmin] = useState([]);

	useEffect(() => {
    	
	        const consultarAPI = async () => {
	            const adminConsulta = await clienteAxios.get(`/administradores/${id}`);
	            guardarAdmin(adminConsulta.data);
	        }

	        consultarAPI();
    }, [id, admin]);

	return (
		<Fragment>
			{admin.map(adm => (
			<div>
				<h1 className="header-title">
					Bienvenida {adm.nombre}!
				</h1>
			</div>
			))}
			<p className="header-subtitle">
				Administración de Foobe.
			</p>
		</Fragment>
	)
}

export default Bienvenida;
