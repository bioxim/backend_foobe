import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

import moment from 'moment';
import 'moment/locale/es';

const Calendario = ({calendarios}) => {

	const eliminarCalendario = id => {
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Una feria eliminada no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/calendario/${id}`)
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

	return (
		<tbody>
			{calendarios.map(feria => (
				<tr
					key={feria._id}
				>
					<td>
						{ feria.imagen ? (
		                    	<img 	src={`${process.env.REACT_APP_BACKEND_URL}/${feria.imagen}`} 
		                    			alt={`logo del tradeshow ${feria.nombre}`} 
		                    			className="img-fluid"
		                    			width = "50" 
		                    	/>
		                    ) : null
		                }
					</td>
					<td colspan="2">
						{feria.nombre}
					</td>
					<td>
						{moment(`${feria.fechainicial}`).format('l')}
					</td>
					<td>
						{moment(`${feria.fechafin}`).format('l')}
					</td>
					<td colspan="2">
						{feria.direccion}
					</td>
					<td>
						{feria.lat}
					</td>
					<td>
						{feria.long}			
					</td>
					<td>
						{feria.pais}			
					</td>
					<td>
						<Link to={`/calendario/editar/${feria._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarCalendario(feria._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>	
			))}
		</tbody>
		
	)
}

export default Calendario;