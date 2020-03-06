import React, { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import '../layout/notauth/addons/noauth.css';

import moment from 'moment';

function DetallesLibro({libros}, props) {

    const [auth] = useContext(CRMContext);

    if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
      props.history.push('/login');
    }

      const eliminarLibro = id => {
        //console.log('eliminando...', id);
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Un libro eliminado no se puede recuperar",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'No, cancelar'
        }).then((result) => {
          if (result.value) {
            // Eliminar en la rest api
            clienteAxios.delete(`/books/${id}`)
              .then(res => {
                if(res.status === 200) {
                  Swal.fire(
                    'Eliminada!',
                    res.data.mensaje,
                    'success'
                  )
                }
              })
          }
        })
      }

    return(
      
      <div className="row">
        {libros.map(libro => (
              <div className="card" key={libro._id}>
                
                <div className="card-header row">
                 
                  <h5 className="card-title">
                    {libro.feria.nombre}
                  </h5>
                  <h6 className="card-subtitle text-muted mt-1 pl-2 mr-3">
                    All Business Cards in {moment(`${libro.feria.fechainicial}`).format('YYYY')} edition
                  </h6>
                  <p>
                    {libro.librof.map(libropdf => (
                      //console.log(libro._id+tarjeta.tarjeta._id)
                      <ul 
                        key={libro._id+libropdf.libropdf._id}
                        className="list-unstyled"
                      >
                        <li>
                          <a 
                            className="btn btn-sm btn-success text-white"
                            href={`${process.env.REACT_APP_BACKEND_URL}/${libropdf.libropdf.pdf}`}
                            target="_blanck"
                          >
                            <i class="fas fa-download"></i>
                          </a>
                        </li>
                      </ul>
                    ))}
                  </p>
                </div>
                
                <div className="card-body">

                        <div className="row">
                            { libro.feria.imagen ? (
                                          <img src={`${process.env.REACT_APP_BACKEND_URL}/${libro.feria.imagen}`} alt="imagen de la guía de usuarios" width = "200" className="img-fluid"/>
                                        ): null}
                            <button  
                              className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
                              type="button"
                              onClick={() => eliminarLibro(libro._id)}          
                            >
                              ELIMINAR
                            </button>                            
                        </div>

                          <div className="react-bootstrap-table">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>
                                    Nombre
                                  </th>
                                  <th>
                                    Empresa
                                  </th>
                                  <th>
                                    Email
                                  </th>
                                  <th>
                                    Tel
                                  </th>
                                  <th>
                                    Url
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {libro.librof.map(libropdf => (
                                  //console.log(libro._id+tarjeta.tarjeta._id)
                                  <tr key={libro._id+libropdf.libropdf._id}>
                                    <td>
                                      {libropdf.libropdf.nombre}
                                    </td>
                                    <td>
                                      {libropdf.libropdf.fecha}
                                    </td>
                                    <td>
                                      {libropdf.libropdf.contactos}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tbody>
                                {libro.libro.map(tarjeta => (
                                  //console.log(libro._id+tarjeta.tarjeta._id)
                                  <tr key={libro._id+tarjeta.tarjeta._id}>
                                    <td>
                                      {tarjeta.tarjeta.nombre}
                                    </td>
                                    <td>
                                      {tarjeta.tarjeta.empresa}
                                    </td>
                                    <td>
                                      {tarjeta.tarjeta.email}
                                    </td>
                                    <td>
                                      {tarjeta.tarjeta.telefono}
                                    </td>
                                    <td>
                                      {tarjeta.tarjeta.url}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

              </div>

        ))}
      </div>
      
    )
}

export default withRouter(DetallesLibro);