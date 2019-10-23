import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
// import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PageTransition from 'react-router-page-transition';

import './views/index.css';

import Create from './create-queue.js';
import Join from './join-queue.js';
// import Routes from './routes.js';

class Home extends React.Component {
  goToCreate() {
      this.props.history.push({
        pathname: '/create-queue'
      });
  }

  goToJoin() {
      this.props.history.push({
        pathname: '/join-queue'
      });
  }

  render() {
    return (
      <div className='home transition-item'>
          HOME PAGE!
          <Router>
              <div onClick={this.goToCreate.bind(this)} className='button'>Create</div>
              <div onClick={this.goToJoin.bind(this)} className='button'>Join</div>
          </Router>
      </div>
    )
  }
}


class App extends React.Component {
  /* class that is in charge of routing on home page to join or create queues */
  render() {
    return (
      <Router>
          <Route
            render={({ location }) => (
              <PageTransition timeout={500}>
                  <Switch location={location}>
                      <Route exact path='/' component={Home} />
                      <Route path='/create-queue' component={Create} />
                      <Route path='/join-queue' component={Join} />
                  </Switch>
              </PageTransition>
            )}/>
      </Router>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

export default Home;
