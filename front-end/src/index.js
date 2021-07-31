import React from "react";
import ReactDOM from "react-dom";
import Home from "./home.js";
import CreatePage from "./create.js"
import EditPage from"./edit.js"
import './form.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import store from './app/store'
import { Provider } from 'react-redux'
export default function App() {
  
  return (
    <div> 
    <Router>
      <a href="/"><h1>VINBRAIN</h1></a>
        <Switch>
          <Route  path="/edit/id/:id">
            <Edit />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/">
              <Home />
          </Route>
          <Route path="/**">
              <Error />
          </Route> 
        </Switch>
    </Router>
    </div>
    )
}
function Edit(){
  const { id } = useParams();
  return EditPage(id);
  //if(!Number.isInteger(id)) return <p>Something went wrong</p>
  return <p>editing patient #{id}</p>
}
function Create(){
  return <CreatePage/>;
}
function Error(){
  return <a href="/" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
}
ReactDOM.render(
    <Provider store={store}>
      <App/>
      </Provider>,
 document.getElementById('root')
);