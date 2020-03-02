import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';

const Productor = ({productores}) => {

	// Eliminar Cliente
	const eliminarProductor = id => {
		//console.log('Eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Un productor eliminado no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'Cancelar'
		}).then((result) => {
		  if (result.value) {
		    Swal.fire(
		      // llamado a axios
		      clienteAxios.delete(`/productores/${id}`)
		      	.then(res => {
		      		//console.log(res);
		      		Swal.fire(
      					'Eliminado!',
      					res.data.mensaje,
      					'success'
    				)
		      	})			
		    )
		  }
		})
	}

	return (
		<tbody>
			{productores.map(productor => (
				<tr>
					<td>
						{productor.nombre} {productor.apellido}
					</td>
					<td>
						{productor.email}
					</td>
					<td>
						{productor.telefono}
					</td>
					<td>
						{productor.producto}
					</td>
					<td>
						{productor.zona}
					</td>
					<td>
						{productor.direccion}, {productor.ciudad} - {productor.estado}
					</td>
					<td>
						{productor.pais}
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarProductor(productor._id)}
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}	
		</tbody>
	)
}

export default Productor;
