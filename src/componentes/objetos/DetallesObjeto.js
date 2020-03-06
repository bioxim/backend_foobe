import React, { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import '../layout/notauth/addons/noauth.css';

function DetallesObjeto({objetos}, props) {

	const [auth] = useContext(CRMContext);

    if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
      props.history.push('/login');
    }

      const eliminarObjeto = id => {
        //console.log('eliminando...', id);
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Un objeto de cliente eliminado no se puede recuperar",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'No, cancelar'
        }).then((result) => {
          if (result.value) {
            // Eliminar en la rest api
            clienteAxios.delete(`/activity/${id}`)
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
      
		<div className="row pt-3">

			{objetos.map(objeto => (
				
				<div className="card" key={objeto._id}>
					
					<div className="card-header row">
						<h5 className="card-title">
                    		<span className="text-primary text-uppercase">Cliente: </span> {objeto.cliente.nombre} {objeto.cliente.apellido}
                  		</h5>
                  		<h6 className="card-subtitle text-muted mt-1 pl-2 mr-3">
                  			<span className="text-primary text-uppercase">Correo Electrónico: </span> {objeto.cliente.email}
                  		</h6>
					</div>
					
					<div className="card-body">
						<div className="react-bootstrap-table">
							
							<table className="table">

								<thead>
									<tr>
										<th>
											PERFIL IMG
										</th>
										<th>
											DATOS DE PERFIL
										</th>
										<th>
											REDES SOCIALES
										</th>
										<th>
											ACCIONES
										</th>
									</tr>
								</thead>

								<tbody>
									{objeto.perfil.map(detalleperfil => (

	                                  <tr key={objeto._id+detalleperfil.detalleperfil._id}>
	                                  	<td>
	                                  		{ detalleperfil.detalleperfil.imagen ? (
							                    	<img 	src={`${process.env.REACT_APP_BACKEND_URL}/${detalleperfil.detalleperfil.imagen}`} 
							                    			alt={`logo del tradeshow ${detalleperfil.detalleperfil.nombre}`} 
							                    			className="img-fluid rounded-circle"
							                    			width = "70" 
							                    	/>
							                    ) : null
							                }
	                                  	</td>
	                                  	<td>
	                                  		<div>
	                                  			<small>{detalleperfil.detalleperfil.nombre} {detalleperfil.detalleperfil.apellido}</small>
	                                  			<small>| {detalleperfil.detalleperfil.email}</small>
	                                  			<small>| {detalleperfil.detalleperfil.telefono}</small>
	                                  			<small>| {detalleperfil.detalleperfil.profile}</small>
	                                  			<small>| {detalleperfil.detalleperfil.taglineProfile}</small>
	                                  			<small>| {detalleperfil.detalleperfil.empresa}.  Dirección: {detalleperfil.detalleperfil.direccion}, {detalleperfil.detalleperfil.ciudad} - {detalleperfil.detalleperfil.estado} <span className="font-weight-bold text-uppercase">{detalleperfil.detalleperfil.pais}</span></small>
	                                  		</div>
	                                  	</td>
	                                  	<td>
	                                  		<div>
	                                  			<p>
	                                  				{ detalleperfil.detalleperfil.facebook ? (
														<a href={`https://www.facebook.com/${detalleperfil.detalleperfil.facebook}`} target="_blanck">
															<small><i className="fab fa-facebook-f mr-1"></i></small>
														</a>
														) : null 
													}
													{ detalleperfil.detalleperfil.linkedin ? (
														<a href={`https://www.linkedin.com/${detalleperfil.detalleperfil.linkedin}`} target="_blanck">
															<small><i className="fab fa-linkedin-in mr-1"></i></small>
														</a>
														) : null 
													}
													{ detalleperfil.detalleperfil.twitter ? (
														<a href={`https://twitter.com/${detalleperfil.detalleperfil.twitter}`} target="_blanck">
															<small><i className="fab fa-twitter mr-1"></i></small>
														</a>
														) : null 
													}
													{ detalleperfil.detalleperfil.instagram ? (
														<a href={`https://instagram.com/${detalleperfil.detalleperfil.instagram}`} target="_blanck">
															<small><i className="fab fa-instagram mr-1"></i></small>
														</a>
														) : null 
													}
													{ detalleperfil.detalleperfil.youtube ? (
														<a href={`https://www.youtube.com/channel/${detalleperfil.detalleperfil.youtube}`} target="_blanck">
															<small><i className="fab fa-youtube"></i></small>
														</a>
														) : null 
													}
	                                  			</p>
	                                  		</div>
	                                  	</td>
	                                  	<td>
											<button  
												className="mr-1 mb-1 btn btn-sm btn-danger text-white font-weight-bold"
												type="button"
												onClick={() => eliminarObjeto(detalleperfil.detalleperfil._id)}					
											>
												<i className="fas fa-times"></i>
											</button>
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
export default DetallesObjeto;