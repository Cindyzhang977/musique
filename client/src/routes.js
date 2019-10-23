// import React from "react";
// import {Route, Link, Switch, withRouter, BrowserRouter as Router, Redirect} from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
//
// import './views/index.css';
//
// import Home from './index.js';
// import Create from './create-queue.js';
// import Join from './join-queue.js';
//
// function Routes({ location }) {
//   console.log(location);
//   return (
//     <TransitionGroup>
//         <CSSTransition
//           key={location.key}
//           timeout={{ enter: 300, exit: 300 }}
//           classNames={'fade'}>
//               <Switch location={location}>
//                   <Route exact path="/" component={Home} />
//                   <Route path="/create-queue" component={Create} />
//                   <Route path="/join-queue" component={Join} />
//               </Switch>
//         </CSSTransition>
//     </TransitionGroup>
//   );
// }
//
// export default withRouter(Routes);
