import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Moneda = ({productos}) => {

	const eliminarMoneda = id => {
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Una moneda eliminada no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/monedas/${id}`)
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
			{productos.map(moneda => (
				<tr
					key={moneda._id}
				>
					<td>
						{moneda.code}
					</td>
					<td colspan="4">
						{moneda.name}
					</td>
					<td>
						{moneda.symbol}
					</td>
					<td>
						<Link to={`/monedas/editar/${moneda._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarMoneda(moneda._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>	
			))}
		</tbody>
		
	)
}

export default Moneda;