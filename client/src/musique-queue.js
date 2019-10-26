import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './views/musique-queue.css';

class MusiqueQueue extends React.Component {
  /* full MusiqueQueue page with ability to plus songs to queue */

  constructor(props) {
    /* props: partyCode from Create */
    super(props);
    this.enqueue = this.enqueue.bind(this);
    this.state = {
      songAdded: '',
      partyCode: '',
    }
  }

  componentDidMount() {
    this.setState({partyCode: this.props.location.state.partyCode});
  }

  /* posts song to database */
  enqueue() {
    fetch('http://localhost:5000/queue/update/', { //endpoint
      method: 'POST',
      body: JSON.stringify({'songID': this.state.songAdded}),
    })
    .then(res => res.json())
    .then(console.log('song queued!'));
  }

  onInputChange(e) {
    this.setState({songAdded: e.target.value});
  }

  render() {
    return (
      <div className='queue-page-container'>
          <div className='queue-nav'>
              <h2>musique</h2>
              <div>PartyCode: {this.state.partyCode}</div>
              <div className='button'>Log out</div>
          </div>
          <div className='queue-main-page'>
              <div className='curr-song'> Current Song </div>

              <Queue />

              <div className='add-music'>
                  <input type='text' placeholder='queue musique' onChange={this.onInputChange.bind(this)}/>
                  <div className='plus-button' onClick={this.enqueue}>
                      <FontAwesomeIcon icon={faPlus} className='plus-icon'/>
                  </div>
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
