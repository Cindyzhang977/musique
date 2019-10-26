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
    // this.getNumUsers = this.getNumUsers.bind(this);
    this.state = {
      songAdded: '',
      partyCode: '',
      size: '',
    }
  }

  goHome() {
      this.props.history.push({
        pathname: '/'
      });
  }

  componentDidMount() {
    this.setState({partyCode: this.props.location.state.partyCode});
    this.setState({size: this.props.location.state.size});
    // this.getNumUsers();
  }

  /* posts song to database NEED TO REFINE */
  enqueue() {
    fetch('http://localhost:5000/party/update/', { //endpoint
      method: 'POST',
      body: JSON.stringify({'songID': this.state.songAdded}),
    })
    .then(res => res.json())
    .then(console.log('song queued!'))
    .catch(err => console.log(err));
  }

  onInputChange(e) {
    this.setState({songAdded: e.target.value});
  }

  /* fetches the number of users currently logged in to the queue */
  // getNumUsers() {
  //   fetch('http://localhost:5000/queue/getParty', { //endpoint
  //     method: 'POST',
  //     body: JSON.stringify({'partyCode': this.state.partyCode}),
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //   .then(res => res.json()
  //     .then(result => {
  //         // this.setState({numUsers: result.size});
  //         console.log(result); //HEEELLPPPPPPP
  //       }).catch(err => console.log(err)),)
  //   .catch(err => console.log(err));
  // }

  render() {
    return (
      <div className='queue-page-container'>
          <div className='queue-nav'>
              <h2>musique</h2>
              <div>PartyCode: {this.state.partyCode} NumUsers: {this.state.size}</div>
              <div className='button' onClick={this.goHome.bind(this)}>Log out</div>
          </div>
          <div className='queue-main-page'>
              <div className='curr-song'> Current Song </div>

              <Queue />

              <div className='add-music'>
                  <input type='text' placeholder='queue musique' id='song-input' onChange={this.onInputChange.bind(this)} />
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
