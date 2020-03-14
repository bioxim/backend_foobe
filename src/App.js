import React, { Fragment, useContext } from 'react';

/* LAYOUT NO AUTH */
import Header from './componentes/layout/notauth/Header';
import Main from './componentes/layout/notauth/Main';
import Footer from './componentes/layout/notauth/Footer';

/* PAGINA LOGIN */
import Login from './componentes/auth/Login';

/* DASHBOARD */
import Dashboard from './componentes/dashboard/Dashboard';

/* SECCIONES WEB CONTENIDO DINAMICO */    
import Contenidos from './componentes/web/secciones/Contenidos';
import EditarContenido from './componentes/web/secciones/EditarContenido';
import Changelogs from './componentes/web/changelog/Changelogs';
import EditarChangelog from './componentes/web/changelog/EditarChangelog';
import Documentations from './componentes/web/documentation/Documentations';
import EditarDocumentation from './componentes/web/documentation/EditarDocumentation';
import Productores from './componentes/web/productores/Productores';
import Newsletters from './componentes/web/newsletter/Newsletters';

/* CRUD DE LISTADO DE PRODUCTOS POR CODIGO HS6 */
import Productos from './componentes/hs6/Productos';
import EditarProducto from './componentes/hs6/EditarProducto';

/* CRUD DE EVENTOS CALENDARIO */
import Calendarios from './componentes/calendario/Calendarios';
import EditarCalendario from './componentes/calendario/EditarCalendario';

/* FERIAS PARA LIBROS */
import Ferias from './componentes/ferias/Ferias';
import EditarFeria from './componentes/ferias/EditarFeria';
import BusquedaFerias from './componentes/ferias/BusquedaFerias';

/* TARJETAS */
import Tarjetas from './componentes/tarjetas/Tarjetas';
import EditarTarjeta from './componentes/tarjetas/EditarTarjeta';
import Busqueda from './componentes/tarjetas/Busqueda';

/* LIBROS */
import NuevoLibro from './componentes/libros/NuevoLibro'; 
import Libros from './componentes/libros/Libros';
import Librosfisicos from './componentes/librosfisicos/Librosfisicos';
import EditarLibrofisico from './componentes/librosfisicos/EditarLibrofisico';

/* USUARIOS ADMINISTRADORES */

import Usuarios from './componentes/usuarios/Usuarios';

/* USUARIOS CLIENTES */
import Clientes from './componentes/usuarios/Clientes';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// AUTH
import { CRMContext, CRMProvider } from './context/CRMContext';



function App() {

    // utilizar context en el componente
    const [ auth, guardarAuth ] = useContext(CRMContext);

  return (
    <Router>
    	<Fragment>
            <CRMProvider value={[ auth, guardarAuth ]}>
                <Header />
        		<main>
        			<Switch>
                        <Route exact path="/" component={Main} />

                        <Route exact path="/login" component={Login} />

                        <Route exact path="/dashboard" component={Dashboard} />

                        <Route exact path="/contenidos" component={Contenidos} />
                        <Route exact path="/contenidos/editar/:id" component={EditarContenido} />

                        <Route exact path="/changelog" component={Changelogs} />
                        <Route exact path="/changelog/editar/:id" component={EditarChangelog} />

                        <Route exact path="/doc" component={Documentations} />
                        <Route exact path="/doc/editar/:id" component={EditarDocumentation} />

                        <Route exact path="/productoshs6" component={Productos} />
                        <Route exact path="/producto/editar/:id" component={EditarProducto} />

                        <Route exact path="/calendario" component={Calendarios} />
                        <Route exact path="/calendario/editar/:id" component={EditarCalendario} />

                        <Route exact path="/productores" component={Productores} />

                        <Route exact path="/manejo-newsletters" component={Newsletters} />
                        
                        <Route exact path="/tradeshows" component={Ferias} />
                        <Route exact path="/tradeshows/editar/:id" component={EditarFeria} />
                        <Route exact path="/buscarferias" component={BusquedaFerias} /> 

                        <Route exact path="/tarjetas" component={Tarjetas} />
                        <Route exact path="/tarjetas/editar/:id" component={EditarTarjeta} />
                        <Route exact path="/buscartarjetas" component={Busqueda} />                        

                        <Route exact path="/books/nuevo/:id" component={NuevoLibro} />
                        <Route exact path="/books" component={Libros} />
                        <Route exact path="/librosfisicos/editar/:id" component={EditarLibrofisico} />
                        <Route exact path="/librosfisicos" component={Librosfisicos} />

                        <Route exact path="/crear-admin" component={Usuarios} />
                        <Route exact path="/crear-cuenta" component={Clientes} />

        			</Switch>
        		</main>
                <Footer />
            </CRMProvider>
    	</Fragment>
    </Router>
  )
}

export default App;
