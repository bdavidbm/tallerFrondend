import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MascotasComponent from './components/MascotasComponent';
import './App.css';
import Detalle from './components/Detalle';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MascotasComponent></MascotasComponent>}></Route>
          <Route path='/detalle/:id' element={<Detalle></Detalle>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;
