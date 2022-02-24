import './App.css';

import {Home} from './Home';
import {Product} from './Product';
import {Navigation} from "./Navigation";

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Type} from "./Type";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <h3 className="m-3 d-flex justify-content-center">
                    NKS Template UI
                </h3>

                <Navigation/>

                <Routes>
                    {/*component={Home} dont work!*/}
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="/products" element={<Product/>} exact/>
                    <Route path="/types" element={<Type/>} exact/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
