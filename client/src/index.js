import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PageTransition from 'react-router-page-transition';

import './views/index.css';

import Create from './create-queue.js';
import Join from './join-queue.js';
import MusiqueQueue from './musique-queue.js';
// import Routes from './routes.js';

class Home extends React.Component {
  /* home page with musique description */

  render() {
    return (
      <div className='home transition-item'>
          <div className='home-description'>
              <h1>musique</h1>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
              </p>
          </div>
          <div className='home-tab'>
          <Router>
              <TransitionGroup>
                  <CSSTransition
                    key={window.location.key}
                    timeout={{ enter: 300, exit: 300 }}
                    classNames={'fade'}>
                        <Switch location={window.location}>
                            <Route exact path="/" component={CreateJoinTab} />
                            <Route path="/create-queue" component={Create} />
                            <Route path="/join-queue" component={Join} />
                        </Switch>
                  </CSSTransition>
              </TransitionGroup>
          </Router>
          </div>
      </div>
    )
  }
}

class CreateJoinTab extends React.Component {
  /* side tab that has the create and join buttons, rendered with teh home page by default */

  render() {
    return (
      <div className='create-join-tab'>
          <Link to='/create-queue' className='button'>Create</Link>
          <Link to='/join-queue' className='button accent-button'>Join</Link>
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
                      // <Route path='/create-queue' component={Create} />
                      // <Route path='/join-queue' component={Join} />
                      <Route path='/musique-queue' component={MusiqueQueue} />
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
