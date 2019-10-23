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
          <div className='home-description'>
              <h1>musique</h1>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
              Aldus PageMaker including versions of Lorem Ipsum.
              </p>
          </div>
          <div className='create-join-tab'>

              <div onClick={this.goToCreate.bind(this)} className='button'>Create</div>
              <p className='button-description'>
              Create a musique queue now! Enter a code that you create and pass that code 
              along to others that will share the queue.
              </p>
              <div onClick={this.goToJoin.bind(this)} className='button'>Join</div>
              <p className='button-description'>
              Join a musique queue now! Enter a code form the host, and add music to the
              queue so that there is never awkward silence.
              </p>
          </div>
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
