import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import FormBuscarTarjeta from './FormBuscarTarjeta';
import FormCantidadTarjeta from './FormCantidadTarjeta';

import FormBuscarLibroF from './FormBuscarLibroF';
import FormCantidadLibroF from './FormCantidadLibroF';

import moment from 'moment';

function NuevoLibro(props) {
	// extraer ID de la feria
    const { id } = props.match.params;

    // state
    const [feria, guardarFeria] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [busqueda2, guardarBusqueda2] = useState('');
    const [tarjetas, guardarTarjetas] = useState([]);
    const [librosf, guardarLibrosf] = useState([]);

    useEffect(() => {

        // obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/tradeshows/${id}`);
            guardarFeria(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, [tarjetas, librosf, id]);

    //console.log(librosf)

    const buscarTarjeta = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/tarjetas/busqueda/${busqueda}`);

        // si no hay resultados una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]) {

            let tarjetaResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            tarjetaResultado.tarjeta = resultadoBusqueda.data[0]._id;
            tarjetaResultado.cantidad = 0;

            // ponerlo en el state
            guardarTarjetas([...tarjetas, tarjetaResultado]);

        } else {
            // no hay resultados
            Swal.fire({
                type: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }
    }

    const buscarLibrof = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/librosf/busqueda/${busqueda2}`);

        // si no hay resultados una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]) {

            let librofResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            librofResultado.libropdf = resultadoBusqueda.data[0]._id;
            librofResultado.cantidad = 0;

            // ponerlo en el state
            guardarLibrosf([...librosf, librofResultado]);

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

    // almacenar una busqueda en el state
    const leerDatosBusqueda2 = e => {
        guardarBusqueda2( e.target.value );
    }

    // Elimina Un pdf del state 
    const eliminarLibroF = id => {
        const todosLibrosf = librosf.filter(libropdf => libropdf.libropdf !== id );

        guardarLibrosf(todosLibrosf);
    }

    // Elimina Ua tarjeta del state 
    const eliminarTarjetaLibro = id => {
        const todosTarjetas = tarjetas.filter(tarjeta => tarjeta.tarjeta !== id );

        guardarTarjetas(todosTarjetas);
    }

    // Almacena el libro en la BD
    const realizarLibro = async e => {
        e.preventDefault();

        // extraer el ID
        const { id } = props.match.params;

        // construir el objeto
        const libro = {
            "feria" : id, 
            "libro" : tarjetas,
            "librof" : librosf,
        }

        // almacenarlo en la BD
        const resultado = await clienteAxios.post(`/books/nuevo/${id}`, libro);

        // leer resultado
        if(resultado.status === 200) {
            // alerta de todo bien
            Swal.fire({
                type: 'success',
                title: 'Correcto',
                text: resultado.data.mensaje
            })
        } else {
            // alerta de error
            Swal.fire({
                type: 'error',
                title: 'Hubo un Error',
                text: 'Vuelva a intentarlo'
            })
        }

        // redireccionar
        props.history.push('/books');

    }

    // validar el formulario
    const validarLibro = () => {

        let valido = !tarjetas.length;

        // Return true o false
        return valido;
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
									Book of Fairs - Nuevo Libro
								</h1>
							</div>

							<div className="row">
								<div className="col">
									<div className="card">
										<div className="card-header">
											<h5 className="card-title">
												Agregar tarjeta a la feria: {feria.nombre} 
											</h5>
											<h6 className="card-subtitle text-muted">
												Fecha: {moment(`${feria.fechainicial}`).format('l')} a {moment(`${feria.fechafin}`).format('l')}
											</h6>
										</div>
										<div className="card-body">

											<FormBuscarLibroF 
							                    buscarLibrof={buscarLibrof}
							                    leerDatosBusqueda2={leerDatosBusqueda2}
							                />

											<FormBuscarTarjeta 
							                    buscarTarjeta={buscarTarjeta}
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
											{librosf.map((libropdf, index2) => (
                                                <FormCantidadLibroF
                                                    key={libropdf.libropdf}
                                                    libropdf={libropdf}
                                                    eliminarLibroF={eliminarLibroF}
                                                    index2={index2}
                                                />
						                        
						                    ))}
										</div>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col">
									<div className="card">
										<div className="card-body">
											{tarjetas.map((tarjeta, index) => (
						                        <FormCantidadTarjeta
						                            key={tarjeta.tarjeta}
						                            tarjeta={tarjeta}
						                            eliminarTarjetaLibro={eliminarTarjetaLibro}
						                            index={index}
						                        />
						                    ))}
										</div>
									</div>
								</div>
							</div>
							
							<div className="row">
								<div className="col">
									<div className="card">
										<div className="card-body">
							                    <form
							                        onSubmit={realizarLibro}
							                    >
							                        <input type="submit"
							                              className="btn btn-success btn-block"
							                              value="Crear Libro" 
                                                          disabled={ validarLibro() }
                                                    />
							                    </form>
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
export default  withRouter(NuevoLibro);