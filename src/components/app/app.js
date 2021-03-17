import React from "react";
//import ReactDOM from 'react-dom'

import { Route, Switch } from 'react-router-dom'
import CartPage from "../pages/cart-page";
import HomePage from "../pages/home-page";
import ShopHeader from "../shop-header";

const App = () => {

    return (
        <main role='main' className='container'>
            <ShopHeader total={12}  numItems={2}/>
            <Switch>
                <Route
                    path='/'
                    component={HomePage}
                    exact
                />
                <Route
                    path='/cart'
                    component={CartPage}
                />
            </Switch>
        </main>
    )
}

// class App extends React.Component{
//   render(){console.log (this.state)
//     return <Spinner />
//   }
// }

export default App;

