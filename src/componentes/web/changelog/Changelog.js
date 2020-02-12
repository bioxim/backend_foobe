import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';

import moment from 'moment';
import 'moment/locale/es';

const Changelog = ({changelogs}) => {

	// Eliminar Cliente
	const eliminarChangelog = idChangelog => {
		//console.log('Eliminando...', id);
		Swal.fire({
		  title: '¿Estás seguro?',
		  text: "Una actualización de sección eliminada no se puede recuperar",
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
		      clienteAxios.delete(`/changelog/${idChangelog}`)
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
			{changelogs.map(log => (
				<tr 
					key={log._id}
				>
					<td>
						{moment(`${log.fecha}`).format('l')}
					</td>
					<td>
						{log.changelog}
					</td>
					<td>
						<Link to={`/changelog/editar/${log._id}`} className="mr-1 mb-1 btn btn-warning text-white font-weight-bold">
							EDITAR
						</Link>
					</td>
					<td>
						<button  
							className="mr-1 mb-1 btn btn-danger text-white font-weight-bold"
							type="button"
							onClick={() => eliminarChangelog(log._id)}
						>
							ELIMINAR
						</button>
					</td>
				</tr>
			))}	
		</tbody>
		
	)

}

export default Changelog;