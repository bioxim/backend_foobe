import React from 'react';

function FormTarjetasEncontradas (props) {

    const { tarjeta } = props;

	return(
		<div className="col-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Empresa
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Teléfono
                        </th>
                        <th>
                            Web
                        </th>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <td>
                            {tarjeta.nombre}
                        </td>
                        <td>
                            {tarjeta.empresa}
                        </td>
                        <td>
                            {tarjeta.email}
                        </td>
                        <td>
                            {tarjeta.telefono}
                        </td>
                        <td>
                            {tarjeta.url}
                        </td>
                    </tr>
                </tbody>  
            </table>
        </div>  
	)
}

export default FormTarjetasEncontradas;