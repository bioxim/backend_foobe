import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';
import { withRouter } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Parser from 'html-react-parser';

import { CRMContext } from '../../../context/CRMContext';

function EditarDocumentation(props) {

	const { id } = props.match.params;

	const [auth, guardarAuth] = useContext(CRMContext);

	// verificar si el usuario está autenticado o no
	if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
		props.history.push('/login');
	}

	const [doc, guardarDoc] = useState({
		titulo: '',
		tituloEsp: ''
	});

	// archivo = state, guardarArchivo = setState
	const [archivo, guardarArchivo] = useState('');

	const [texto, guardarTexto] = useState('');
	const [textoEsp, guardarTextoEsp] = useState('');

	// cuando el componente carga
    useEffect(() => {

	        const consultarAPI = async () => {
	            const docConsulta = await clienteAxios.get(`/doc/${id}`);
	            guardarDoc(docConsulta.data);
	        }

	        consultarAPI();
    }, [id, guardarAuth]);

    const editarDoc = async e => {
        e.preventDefault();

        // crear un formdata
        const formData = new FormData();
        formData.append('titulo', doc.titulo);
        formData.append('tituloEsp', doc.tituloEsp);
        formData.append('texto', texto);
        formData.append('textoEsp', textoEsp);
        formData.append('imagen', archivo);

        // almacenarlo en la BD
        try {
            const res = await clienteAxios.put(`/doc/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            // Lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/doc');

        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    // leer los datos del formulario
    const leerInformacionDoc = e => {
        guardarDoc({
            // obtener una copia del state y agregar el nuevo
            ...doc,
            [e.target.name] : e.target.value
        })
    }

    // coloca la imagen en el state
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    const leerTexto = texto => {
            //console.log(e.target.files);
            guardarTexto(texto);
    }

    const leerTextoEsp = textoEsp => {
            //console.log(e.target.files);
            guardarTextoEsp(textoEsp);
    }

    // extraer los valores del state
    const {titulo, tituloEsp, imagen } = doc;

    if(!doc) return <Spinner />

	return (
		<div className="col">
			<div className="card">
				<div className="card-header">
					<h5 className="card-title">
						Editar Documento de la Guía de Usuario
					</h5>
					<h6 className="card-subtitle text-muted">Cargar las instrucciones pertenecientes a la nueva sección.
					</h6>
				</div>
				<div className="card-body">
					<form
						onSubmit={editarDoc}
					>
						<div className="form-row">
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Título
									</label>
									<input 
										name="titulo" 
										placeholder="Título de la sección" 
										type="text" 
										className="form-control"
										onChange={leerInformacionDoc}
										defaultValue={titulo}
									/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="form-group">
									<label>
										Título Español
									</label>
									<input 
										name="tituloEsp" 
										placeholder="Título de la sección" 
										type="text" 
										className="form-control"
										onChange={leerInformacionDoc}
										defaultValue={tituloEsp}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label>Texto descriptivo</label>
									<ReactQuill 
										theme="snow"
										value={texto}
										onChange={leerTexto}
									/>
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-md-5">
								<div className="form-group">
									<label>Texto descriptivo en Español</label>
									<ReactQuill 
										theme="snow"
										value={textoEsp}
										onChange={leerTextoEsp}
									/>
								</div>
							</div>
							<div className="col-md-5">
								<div className="form-group">
									{ imagen ? (
					                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt="imagen" width="150" className="img-fluid rounded-circle pb-3" />
					                    ) : null }
				                    <input 
				                        type="file"  
				                        name="imagen"
				                        onChange={leerArchivo}
				                    />
								</div>
							</div>
						</div>
						<input 
								className="btn btn-primary my-3" 
								value="Guardar Cambios" 
								type="submit"
						/>
					</form>
				</div>
			</div>
		</div>
	)

}

export default withRouter(EditarDocumentation);