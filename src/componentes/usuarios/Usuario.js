import React from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const Usuario = ({administradores}) => {

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
		    clienteAxios.delete(`/administradores/${id}`)
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
			{administradores.map(admin => (
				<tr>
					<td>
						{admin.nombre}
					</td>
					<td>
						{admin.email}
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarTarjeta(admin._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}
		</tbody>	
	)
}
export default Usuario;