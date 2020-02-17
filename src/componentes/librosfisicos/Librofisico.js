import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import moment from 'moment';

const Librofisico = ({librosf}) => {

	// elimina un producto
	const eliminarLibrofisico = id => {
		//console.log('eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Un libro eliminado no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/librosfisicos/${id}`)
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
			{librosf.map(libro => (
				<tr>
					<td>
						{libro.nombre}
					</td>
					<td>
						{moment(`${libro.fecha}`).format('l')}
					</td>
					<td>
						{libro.contactos}
					</td>
					<td>
						{libro.pais}
					</td>
					<td>
						{libro.producto}
					</td>
					<td>
						{ libro.pdf ? (
		                    	<a 	href={`${process.env.REACT_APP_BACKEND_URL}/${libro.pdf}`} 
		                    			className="btn btn-success"
		                    			target="_blanck"
		                    	>
		                    		DESCARGAR
		                    	</a>
		                    ) : null
		                }
					</td>
					<td>
						<Link to={`/librosfisicos/editar/${libro._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarLibrofisico(libro._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}
		</tbody>	
	)
}

export default Librofisico;