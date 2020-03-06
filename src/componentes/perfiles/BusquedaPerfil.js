import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';
import FormBuscarPerfiles from './FormBuscarPerfiles';
import FormPerfilesEncontradas from './FormPerfilesEncontradas';

import { CRMContext } from '../../context/CRMContext';

function BusquedaPerfil(props) {
	// extraer ID de la feria
    const { id } = props.match.params;

    // state
    const [busqueda, guardarBusqueda] = useState('');
    const [profiles, guardarProfiles] = useState([]);
    const [perfiles, guardarPerfiles] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };

    useEffect(() => {

        // obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/profile`);
            guardarPerfiles(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, [perfiles, guardarAuth]);

    useEffect(() => {

        // obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/profile/${id}`);
            guardarProfiles(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, [profiles, id]);

    const buscarPerfiles = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/profile/busqueda/${busqueda}`);

        // si no hay resultados una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]) {

            let perfilResultado = resultadoBusqueda.data[0];

            // ponerlo en el state
            guardarProfiles([...profiles, perfilResultado]);

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
									Buscar Perfil por id específico
								</h1>
							</div>

							<div className="row mb-1">
								<div className="col">
									<div className="card">
								
										<div className="card-body">
											
											<FormBuscarPerfiles
												buscarPerfiles={buscarPerfiles}
							                    leerDatosBusqueda={leerDatosBusqueda}
											/>

										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col">
									<div className="card">
										<div className="card-body">
											
											{profiles.map(perfil => (
						                        <FormPerfilesEncontradas
						                            key={perfil.perfil}
						                            perfil={perfil}
						                        />
						                    ))}

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
export default  withRouter(BusquedaPerfil);