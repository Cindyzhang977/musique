import React from 'react';
import { Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './views/musique-queue.css';

class MusiqueQueue extends React.Component {
  /* full MusiqueQueue page with ability to plus songs to queue */

  constructor(props) {
    /* props: <id> from Create/Join */
    super(props);
    this.enqueue = this.enqueue.bind(this);
    this.state = {
      songAdded: '',
      partyCode: '',
      size: '',
      queue: [],
      goHome: false,
      partyID:'',
    }
  }

  goHome() {
      var currSize = 0;
      //return the most current size of queue
      fetch('http://localhost:5000/party/' + this.state.partyID, { //endpoint
        method: 'GET',
      })
      .then(res => res.json()
        .then(result => {
          fetch('http://localhost:5000/party/update/' + this.state.partyID, {
            method: 'POST',
            body: JSON.stringify({"partyCode": this.state.partyCode,
                                  "size": result.size}),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
          .catch(err => console.log(err));
        }))
      .catch(err => console.log(err));

      this.setState({goHome: true});
  }

  componentDidMount() {
    //fetch for PartyCode and size and queue
    fetch('http://localhost:5000/party/' + this.props.location.state.partyID, { //endpoint
      method: 'GET',
    })
    .then(res => res.json()
      .then(result => {
        this.setState({partyCode: result.partyCode,
                      size: result.size,
                      queue: result.queue,
                      partyID: this.props.location.state.partyID});
      })
    )
    .catch(err => console.log(err));
  }

  /* posts song to database */
  enqueue() {
    // TODO: Use Spotify WEB API to find all props needed for Song class (id, name, artist, url?)
    fetch('http://localhost:5000/party/addSong/', {
      method: 'POST',
      body: JSON.stringify({'songID': this.state.songAdded, 'partyCode': this.state.partyCode}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json()
        .then(result => this.setState({queue: result.queue}))
        .catch(err => console.log(err)))
    .catch(err => console.log(err));
  }

  onInputChange(e) {
    this.setState({songAdded: e.target.value});
  }

  render() {
    if (this.state.goHome) {
      return <Redirect to='/' />;
    }

    return (
      <div className='queue-page-container'>
          <div className='queue-nav'>
              <h2>musique</h2>
              <div>PartyCode: {this.state.partyCode} NumUsers: {this.state.size}</div>
              <div className='button' onClick={this.goHome.bind(this)}>Log out</div>
          </div>
          <div className='queue-main-page'>
              <div className='curr-song'> Current Song </div>

              <Queue songs={this.state.queue} />

              <div className='add-music'>
                  <input type='text' placeholder='queue musique' id='song-input' onChange={this.onInputChange.bind(this)} />
                  <div className='plus-button' onClick={this.enqueue}>
                      <FontAwesomeIcon icon={faPlus} className='plus-icon' />
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

class Queue extends React.Component {
  constructor(props) {
    //props: list of songs from MusiqueQueue
    super(props);
  }

  /* The queue container for all the songs that are queued */
  render() {
    return (
      <div className='queue'>
          {this.props.songs.map((item, index) => {
              return <div key={index} className='song'>{item}</div>
              //<Song name={item.name} artist={item.artist} id={item.id}/>
          })}
      </div>
    )
  }
}

export default MusiqueQueue;
