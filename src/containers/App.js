import React, { Fragment } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

// Pages
import Home from './Home/Home'
import Register from '../components/Home/Register'
import Dashboard from './Dashboard/Dashboard'

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Route path="/" exact component={Home}/> 
                <Route path="/register" component={Register}/>
                <Route path="/dashboard" component={Dashboard}/>
            </BrowserRouter>
        </Fragment>
    )
}

export default App