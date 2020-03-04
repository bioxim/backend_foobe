import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Tarjeta = ({clientes}) => {

	const eliminarTarjeta = id => {
		//console.log('eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Un cliente eliminado no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/clientes/${id}`)
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
			{clientes.map(cliente => (
				<tr>
					<td>
						{cliente.nombre}
					</td>
					<td>
						{cliente.email}
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarTarjeta(cliente._id)}					
						>
							ELIMINAR
						</button>
					</td>
					<td>
						<Link to={`/clientes/alta/${cliente._id}`} className="mr-1 mb-1 btn btn-success text-white font-weight-bold">
							<i class="fas fa-plus"></i>
						</Link>	
					</td>
				</tr>
			))}
		</tbody>	
	)
}
export default Tarjeta;