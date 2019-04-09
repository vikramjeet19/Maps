import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Data from './Component/Form/Form'
import Main from './Component/Main';
import Header from './Component/Header/Header';
import Hoc from './Component/Hoc';
import MapContainer from './Component/Map/Map';
import {Container} from 'react-bootstrap';



class App extends Component {
  render() {
    return (<div className='app'>
     <Header/>
      <Container>
      
       
        <Switch>
          <Route path="/Login" component={Data} />
          <Route path="/dashboard" component={Hoc(Main)} />
          <Route path="/dashboard/maps" component={Hoc(MapContainer)}/>
        </Switch>
        

     
      </Container>
      </div>
    );
  }
}

export default App;
