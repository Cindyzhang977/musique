import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './views/musique-queue.css';

class MusiqueQueue extends React.Component {
  /* full MusiqueQueue page with ability to plus songs to queue */

  constructor(props) {
    super(props);
    this.enqueue = this.enqueue.bind(this);
  }

  /* posts song to database */
  enqueue() {
    // fetch('/server/signup-submit', { //endpoint
    //   method: 'POST',
    //   body: JSON.stringify(json),
    // })
    // .then(console.log(JSON.stringify(json)))
  }

  render() {
    return (
      <div className='queue-main-page'>
          <div className='curr-song'> Current Song </div>

          <Queue />

          <div className='add-music'>
              <input type='text' placeholder='queue musique' />
              <div className='plus-button' onClick={this.enqueue}>
                  <FontAwesomeIcon icon={faPlus} className='plus-icon'/>
              </div>
          </div>
      </div>
    )
  }
}

class Queue extends React.Component {
  /* The queue container for all the songs that are queued */
  render() {
    return (
      <div className='queue'>
          QUEUE
      </div>
    )
  }
}

export default MusiqueQueue;
