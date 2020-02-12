import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Tarjeta = ({tarjetas}) => {

	const eliminarTarjeta = id => {
		//console.log('eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Una tarjeta eliminada no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/tarjetas/${id}`)
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

	return (
		<tbody>
			{tarjetas.map(tarjeta => (
				<tr>
					<td>
						{tarjeta.nombre}
					</td>
					<td>
						{tarjeta.empresa}
					</td>
					<td>
						{tarjeta.email}
					</td>
					<td>
						{tarjeta.telefono}
					</td>
					<td>
						{tarjeta.url}
					</td>
					<td>
						<Link to={`/tarjetas/editar/${tarjeta._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarTarjeta(tarjeta._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}
		</tbody>	
	)
}
export default Tarjeta;