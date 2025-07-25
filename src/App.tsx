import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AccountList from './components/AccountList';
import AccountDetails from './components/AccountDetails';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <h1>Banking-system</h1>

        <Routes>
          <Route path='/'></Route>
          <Route path='/accounts' element={<AccountList />}/>
          <Route path='/accounts/:id' element={< AccountDetails/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
