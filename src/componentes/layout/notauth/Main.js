import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './addons/noauth.css';

const Main = () => (
	<Fragment>
		<section className="pt-4 pt-md-11 pb-3">
		      <div className="container">
		        <div className="row align-items-center">
		          <div className="col-12 col-md-6 order-md-2">
		            <img src="img/illustration-main.png" alt="imagen ilustrativa foobe" className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0" />
		          </div>
		          <div className="col-12 col-md-6">
		            <h2 className="display-4 text-center text-md-left">
		              Bienvenide al Panel de Administración de FOOBE <br/>
		          	</h2>
		            <h5 className="font-italic color-pink">for food Traders.</h5>
		            
		            <p className="lead text-center text-md-left text-muted mb-6 mb-lg-8">
		              Be a member of this community, built for traders and eveyone involved in food & beverages products.
		            </p>
		          </div>
		        </div>
		      </div> 
	    </section>
	</Fragment>    
)

export default Main;