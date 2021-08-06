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
  useParams
} from "react-router-dom";
import store from './store/store.js'
import { Provider } from 'react-redux'
export default function App() {
  
  return (
    <div> 
    <Router>
      <a href="/"><h1>VINBRAIN</h1></a>
        <Switch>
          <Route  path="/edit/:filterMode/:page/:index">
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
  const { filterMode,page,index } = useParams();
  return EditPage(filterMode,page,index);
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