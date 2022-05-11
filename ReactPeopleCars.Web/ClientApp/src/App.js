import React from 'react';
import { Route, Link } from 'react-router-dom';

import HomePage from './HomePage';
import AddPerson from './AddPerson';
import AddCars from './AddCars';
import Layout from './Layout';
import DeleteCars from './DeleteCars';


function App() {
    return <Layout>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/AddPerson' component={AddPerson} />
        <Route exact path='/AddCars/:id' component={AddCars} />
        <Route exact path='/DeleteCars/:id' component={DeleteCars} />
    </Layout>
}

export default App;