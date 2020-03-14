import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Producto = ({productos}) => {

	const eliminarProducto = id => {
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Un codigo eliminado no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/producto/${id}`)
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
			{productos.map(producto => (
				<tr
					key={producto._id}
				>
					<td>
						{producto.codigo}
					</td>
					<td colspan="2">
						{producto.nombre}
					</td>
					<td colspan="4">
						{producto.descripcion}
					</td>
					<td>
						<Link to={`/producto/editar/${producto._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarProducto(producto._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>	
			))}
		</tbody>
		
	)
}

export default Producto;