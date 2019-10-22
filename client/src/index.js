import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from "react-transition-group";

import './views/index.css';

import Create from './create-queue.js';
import Join from './join-queue.js';
import Routes from './routes.js';

class Home extends React.Component {
  render() {
    return (
      <div>
          HOME PAGE!
          <Router>
              <Link to='/create-queue' className='button'>Create</Link>
              <Link to='/join-queue' className='button'>Join</Link>
              <Routes />
          </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);

export default Home;
