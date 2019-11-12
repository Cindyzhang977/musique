import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PageTransition from 'react-router-page-transition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './views/index.css';

import Create from './create-queue.js';
import Join from './join-queue.js';
import MusiqueQueue from './musique-queue.js';
// import Routes from './routes.js';

class Home extends React.Component {
  /* home page with musique description */
  constructor(props) {
    super(props);
    const spotifyParams = this.getHashParams();
    this.state = {
      tabOpen: spotifyParams.access_token ? <Create changeTabOpen={this.changeTabOpen.bind(this)} /> : 
      <CreateJoinTab changeTabOpen={this.changeTabOpen.bind(this)} />,
      //<CreateJoinTab changeTabOpen={this.changeTabOpen.bind(this)} /> : <Create changeTabOpen={this.changeTabOpen.bind(this)} />}),
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  changeTabOpen(newTab) {
    if (newTab === 'join') {
      this.setState({tabOpen: <Join changeTabOpen={this.changeTabOpen.bind(this)} />});
    } else if (newTab === 'create') {
      this.setState({tabOpen: <Create changeTabOpen={this.changeTabOpen.bind(this)} />});
    } else if (newTab === 'home') {
      this.setState({tabOpen: <CreateJoinTab changeTabOpen={this.changeTabOpen.bind(this)} />});
    } else if (newTab === 'login') {
      this.setState({tabOpen: <Login changeTabOpen={this.changeTabOpen.bind(this)} />});
    }
  }

  render() {
    /* BUG - cannot referesh page */
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
            {this.state.tabOpen}
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
          <div onClick={() => {this.props.changeTabOpen('login')}} className='button'>Create</div>
          <div onClick={() => {this.props.changeTabOpen('join')}} className='button accent-button'>Join</div>
      </div>
    )
  }
}

class Login extends React.Component {
  /* side tab that has the create and join buttons, rendered with teh home page by default */
  render() {
    return (
      <div className='login-tab'>
          <div className='back' onClick={() => {this.props.changeTabOpen('home')}}>
              <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          
          <div onClick={() => {window.location.href = 'http://localhost:5000/spotify/login'}} className='button'>Login</div>
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
