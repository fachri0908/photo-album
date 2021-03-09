import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Pages/Home'
import User from './Pages/User'
import Album from './Pages/Album'
import Photo from './Pages/Photo'
import {userList} from './helpers/api'
import './styles/main.css'
import Favorite from './Pages/Favorites';

function App() {

  useEffect(() => {
    if(!sessionStorage.getItem('users')){
      userList().then((res:any) =>{
        sessionStorage.setItem('users',JSON.stringify(res.data))
      }).catch(()=>{
        alert('failed to fetch user')
      })
    }
  }, []);
  return (
    <Router>
        <Switch>
          <Route exact path="/album/:albumId">
            <Album />
          </Route>
          <Route exact path="/user/:userId">
            <User />
          </Route>
          <Route exact path="/photo/:photoId">
            <Photo />
          </Route>
          <Route exact path="/favorite">
            <Favorite />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
