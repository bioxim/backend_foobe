import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';

const Contenido = ({contenido}) => {

	//console.log(contenido);

	const { _id, tagline } = contenido;

	// Eliminar Cliente
	const eliminarContenido = idContenido => {
		//console.log('Eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Una sección eliminada no se puede recuperar",
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
		      clienteAxios.delete(`/contenidos/${idContenido}`)
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
		<tr>
			<td>
				{tagline}
			</td>
			<td>
				<Link to={`/contenidos/editar/${_id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
					EDITAR
				</Link>
			</td>
			<td>
				<button  
					className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
					type="button"
					onClick={() => eliminarContenido(_id)}
				>
					ELIMINAR
				</button>
			</td>
		</tr>	
	)
}

export default Contenido;
