import React from 'react';
import moment from 'moment';

function FormFeriasEncontradas (props) {

    const { tarjeta, index } = props;

	return(
		<div className="col-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Fecha Inicial
                        </th>
                        <th>
                            Fecha Fin
                        </th>
                        <th>
                            Categoría
                        </th>
                        <th>
                            Tipo
                        </th>
                    </tr>
                </thead> 
                <tbody>
                    <tr>
                        <td>
                            { tarjeta.imagen ? (
                                <img    src={`${process.env.REACT_APP_BACKEND_URL}/${tarjeta.imagen}`} 
                                        alt={`logo del tradeshow ${tarjeta.nombre}`} 
                                        className="img-fluid rounded-circle"
                                        width = "50" 
                                />
                            ) : null
                        }
                        </td>
                        <td>
                            {tarjeta.nombre}
                        </td>
                        <td>
                            {moment(`${tarjeta.fechainicial}`).format('l')}
                        </td>
                        <td>
                            {moment(`${tarjeta.fechafin}`).format('l')}
                        </td>
                        <td>
                            {tarjeta.categoria}
                        </td>
                        <td>
                            {tarjeta.tipo}
                        </td>
                    </tr>
                </tbody>  
            </table>
        </div>  
	)
}

export default FormFeriasEncontradas;