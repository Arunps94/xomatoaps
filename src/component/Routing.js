import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './Footer'
import Home from './home/Home'
import Listing from './Listing/Listing'
import Details from './Details/restDetails';
import PlaceOrder from './Booking/placeOrder';
import ViewAPI from './Booking/ViewAPI';
import Register from './Login/Register';
import Login from './Login/login';


const Routing = () => {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Home} />
            <Route path='/list/:id' component={Listing} />
            <Route path='/details/:id' component={Details} />
            <Route path='/placeOrder/:restName' component={PlaceOrder} />
            <Route path='/viewBooking' component={ViewAPI} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Footer />
        </BrowserRouter>
    )
}

export default Routing;