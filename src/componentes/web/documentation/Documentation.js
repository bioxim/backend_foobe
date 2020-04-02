import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';
import Parser from 'html-react-parser';

const Documentation = ({docs}) => {

	// elimina un producto
	const eliminarDoc = id => {
		//console.log('eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Un Doc eliminado no se puede recuperar",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sí, eliminar!',
		  cancelButtonText: 'No, cancelar'
		}).then((result) => {
		  if (result.value) {
		    // Eliminar en la rest api
		    clienteAxios.delete(`/doc/${id}`)
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
			{docs.map(doc => (
				<tr>
					<td>
						{ doc.imagen ? (
		                    	<img 	src={`${process.env.REACT_APP_BACKEND_URL}/${doc.imagen}`} 
		                    			alt={`imagen de ${doc.titulo}`} 
		                    			className="img-fluid rounded-circle"
		                    			width = "50" 
		                    	/>
		                    ) : null
		                }
					</td>
					<td>
						{doc.titulo}
					</td>
					<td colspan="6">
						{Parser(doc.texto)}
					</td>
					<td>
						<Link to={`/doc/editar/${doc._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarDoc(doc._id)}					
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}
		</tbody>	
	)
}

export default Documentation;