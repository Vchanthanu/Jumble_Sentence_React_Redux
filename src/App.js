import React from 'react';
import Header from './components/Header'
import Home from './components/Home';
import Footer from './components/Footer';
import { Route, Switch } from 'react-router-dom'
import Display from './components/Display';
import AddQuestion from './components/AddQuestion';
import Login from './components/Login';
import SignUp from './components/SignUp';
import EditQuestion from './components/EditQuestion';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='mainArea'>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route exact path='/' component={Login}></Route>
          <Route path='/signup' component={SignUp}></Route>
          <Route path='/edit_question' component={EditQuestion}></Route>
          <Route path='/display' component={Display}></Route>
          <Route path='/add_question' component={AddQuestion}></Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
