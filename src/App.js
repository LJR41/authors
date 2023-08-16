import logo from './logo.svg';
import './App.css';
import {Route,Routes,Link} from 'react-router-dom'
import AuthorForm from './Components/AuthorForm';
import AuthorAll from './Components/AuthorAll';
import AuthorEdit from './Components/AuthorEdit';
import Dashboard from './Views/Dashboard';

function App() {
  return (
    <div className="App">
      <h1>Favorite Authors</h1>
      <Link to='/author'>View All</Link>
      <Link to='/author/form'>Add New Author</Link>
      <Link to='/'>Home</Link>
      
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/author/form' element={<AuthorForm/>}/>
        <Route path='/author' element={<AuthorAll/>}/>
        <Route path='/author/:id/edit' element={<AuthorEdit/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
