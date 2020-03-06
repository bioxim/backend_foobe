import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import moment from 'moment';
import 'moment/locale/es';

function FormTarjetasEncontradas (props) {

    const { perfil } = props;

    const eliminarPerfil = id => {
        
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Un perfil eliminado no se puede recuperar",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'No, cancelar'
        }).then((result) => {
          if (result.value) {
            // Eliminar en la rest api
            clienteAxios.delete(`/profile/${id}`)
                .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                          'Eliminado!',
                          res.data.mensaje,
                          'success'
                        )
                    }
                })
          }
        })
    }

	return(
		<div className="col-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            tagline
                        </th>
                        <th>
                            profile
                        </th>
                        <th>
                            tel
                        </th>
                        <th>
                            cumple
                        </th>
                        <th>
                            empresa
                        </th>
                        <th>
                            dirección
                        </th>
                        <th>
                            país
                        </th>
                        <th>
                            imagen
                        </th>
                        <th>
                            redes sociales
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <td>
                        <small>{perfil.nombre} {perfil.apellido}</small>
                    </td>
                    <td>
                        <small>{perfil.email}</small>
                    </td>
                    <td>
                        <small>{perfil.taglineProfile}</small>
                    </td>
                    <td>
                        <small>{perfil.profile}</small>
                    </td>
                    <td>
                        <small>{perfil.telefono}</small>
                    </td>
                    <td>
                        <small>{moment(`${perfil.nacimiento}`).format('l')}</small>
                    </td>
                    <td>
                        <small>{perfil.empresa}</small>
                    </td>
                    <td>
                        <small>{perfil.direccion}, {perfil.ciudad} - {perfil.estado}</small>
                    </td>
                    <td>
                        <small>{perfil.pais}</small>
                    </td>
                    <td>
                        { perfil.imagen ? (
                                <img    src={`${process.env.REACT_APP_BACKEND_URL}/${perfil.imagen}`} 
                                        alt={`logo del tradeshow ${perfil.nombre}`} 
                                        className="img-fluid rounded-circle"
                                        width = "50" 
                                />
                            ) : null
                        }
                    </td>
                    <td>
                        { perfil.facebook ? (
                            <a href={`https://www.facebook.com/${perfil.facebook}`} target="_blanck">
                                <small><i className="fab fa-facebook-f mr-1"></i></small>
                            </a>
                            ) : null 
                        }
                        { perfil.linkedin ? (
                            <a href={`https://www.linkedin.com/${perfil.linkedin}`} target="_blanck">
                                <small><i className="fab fa-linkedin-in mr-1"></i></small>
                            </a>
                            ) : null 
                        }
                        { perfil.twitter ? (
                            <a href={`https://twitter.com/${perfil.twitter}`} target="_blanck">
                                <small><i className="fab fa-twitter mr-1"></i></small>
                            </a>
                            ) : null 
                        }
                        { perfil.instagram ? (
                            <a href={`https://instagram.com/${perfil.instagram}`} target="_blanck">
                                <small><i className="fab fa-instagram mr-1"></i></small>
                            </a>
                            ) : null 
                        }
                        { perfil.youtube ? (
                            <a href={`https://www.youtube.com/channel/${perfil.youtube}`} target="_blanck">
                                <small><i className="fab fa-youtube"></i></small>
                            </a>
                            ) : null 
                        }
                    </td>
                    <td>
                        <Link to={`/perfil/editar/${perfil._id}`} className="mr-1 mb-1 btn btn-sm btn-warning text-white font-weight-bold">
                            <i className="far fa-edit"></i>
                        </Link>
                        <button  
                            className="mr-1 mb-1 btn btn-sm btn-danger text-white font-weight-bold"
                            type="button"
                            onClick={() => eliminarPerfil(perfil._id)}                  
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </td>
                    </tr>
                </tbody>  
            </table>
        </div>  
	)
}

export default FormTarjetasEncontradas;