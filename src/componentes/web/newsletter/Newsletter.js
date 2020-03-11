import React from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';

import moment from 'moment';

const Newsletter = ({suscriptores}) => {

	const eliminarCorreo = idSuscriptor => {
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Un correo eliminado no se puede recuperar",
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
		      clienteAxios.delete(`/newsletter/${idSuscriptor}`)
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
			{suscriptores.map(suscriptor => (
				<tr 
					key={suscriptor._id}
				>
					<td>
						{moment(`${suscriptor.alta}`).format('l')}
					</td>
					<td>
						{suscriptor.email}
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarCorreo(suscriptor._id)}
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}	
		</tbody>
		
	)
}
export default Newsletter;