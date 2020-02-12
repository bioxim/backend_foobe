import React, { useEffect, useState, useContext, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';
import FormBuscarTarjetas from './FormBuscarTarjetas';
import FormTarjetasEncontradas from './FormTarjetasEncontradas';

import { CRMContext } from '../../context/CRMContext';

import moment from 'moment';

function Busqueda(props) {
	// extraer ID de la feria
    const { id } = props.match.params;

    // state
    const [busqueda, guardarBusqueda] = useState('');
    const [cards, guardarCards] = useState([]);
    const [tarjetas, guardarTarjetas] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) {
    	props.history.push('/login');
    };

    useEffect(() => {

        // obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/tarjetas`);
            guardarTarjetas(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, [tarjetas]);

    useEffect(() => {

        // obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/tarjetas/${id}`);
            guardarCards(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, [cards, id]);

    const buscarTarjetas = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/tarjetas/buscar/${busqueda}`);

        // si no hay resultados una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]) {

            let tarjetaResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            //tarjetaResultado.tarjeta = resultadoBusqueda.data[0]._id;

            // ponerlo en el state
            guardarCards([...cards, tarjetaResultado]);

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
									Buscar Tarjetas
								</h1>
							</div>

							<div className="row mb-1">
								<div className="col">
									<div className="card">
								
										<div className="card-body">
											
											<FormBuscarTarjetas
												buscarTarjetas={buscarTarjetas}
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
											
											{cards.map(tarjeta => (
						                        <FormTarjetasEncontradas
						                            key={tarjeta.tarjeta}
						                            tarjeta={tarjeta}
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
export default  withRouter(Busqueda);