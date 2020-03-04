import React, { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import '../layout/auth/Header.css';
import Header from '../layout/auth/Header';
import Navegacion from '../layout/auth/Navegacion';

import FormBuscarPerfiles from './FormBuscarPerfiles';
import FormCantidadPerfil from './FormCantidadPerfil';

function AltaPerfil(props) {

	const { id } = props.match.params;

	const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [perfiles, guardarPerfiles] = useState([]);

    useEffect(() => {

        // obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar a la api
        consultarAPI();

    }, [perfiles, id]);

    const buscarPerfiles = async e => {
        e.preventDefault();

        // obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/profile/busqueda/${busqueda}`);

        // si no hay resultados una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]) {

            let perfilResultado = resultadoBusqueda.data[0];
            // agregar la llave "producto" (copia de id)
            perfilResultado.perfil = resultadoBusqueda.data[0]._id;

            // ponerlo en el state
            guardarPerfiles([...perfiles, perfilResultado]);

        } else {
            // no hay resultados
            Swal.fire({
                type: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }
    }

    const leerDatosBusqueda = e => {
        guardarBusqueda( e.target.value );
    }

    const eliminarPerfilObjeto = id => {
        const todosPerfiles = perfiles.filter(perfil => perfil.perfil !== id );

        guardarPerfiles(todosPerfiles);
    }

    const realizarObjeto = async e => {
        e.preventDefault();

        // extraer el ID
        const { id } = props.match.params;

        // construir el objeto
        const objeto = {
            "cliente" : id, 
            "perfil" : perfiles
        }

        // almacenarlo en la BD
        const resultado = await clienteAxios.post(`/activity/nuevo/${id}`, objeto);

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
        props.history.push('/');

    }

    // validar el formulario
    const validarObjeto = () => {

        let valido = !perfiles.length;

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
									Objeto Cliente - Alta de Perfil
								</h1>
							</div>

							<div className="row">
								<div className="col">
									<div className="card">
										<div className="card-header">
											<h5 className="card-title">
												Agregar perfil al nuevo miembro registrado: {cliente.nombre} {cliente.apellido} 
											</h5>
											<h6 className="card-subtitle text-muted">
												Buscar perfil por su email: {cliente.email}
											</h6>
										</div>
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
											{perfiles.map((perfil, index) => (
						                        <FormCantidadPerfil
						                            key={perfil.perfil}
						                            perfil={perfil}
						                            eliminarPerfilObjeto={eliminarPerfilObjeto}
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
							                        onSubmit={realizarObjeto}
							                    >
							                        <input type="submit"
							                              className="btn btn-success btn-block"
							                              value="Alta Perfil Cliente" 
                                                          disabled={ validarObjeto() }
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
export default withRouter(AltaPerfil);