import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './views/index.css';

class Create extends React.Component {
  /* Page that allows users to create a MusiqueQueue as the host */

  constructor(props) {
    super(props);
    this.createQueue = this.createQueue.bind(this);
    this.state = {
      code: '',
      partyID: '',
    }
  }

  goHome() {
      this.props.history.push({
        pathname: '/'
      });
  }

  /* creates a party that has the partyCode and an empty queue */
  createQueue() {
    // sends partyCode to backend
    fetch('http://localhost:5000/queue/add', { //endpoint
      method: 'POST',
      body: JSON.stringify({"partyCode": this.state.code}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json()
      .then(result => {
          this.setState({partyID: result});
          console.log("Stored: " + result);
        }))
    .catch(err => console.log(err));

    // get id for the party from backend
    /*fetch('http://localhost:5000/queue/latestID', { //endpoint
      method: 'GET',
    })
    .then(res => res.json()
      .then(result => {
          this.setState({partyID: result});
          console.log(this.state.partyID);
        }))
    .catch(err => console.log(err));*/
  }

  onCodeChange(e) {
    this.setState({code: e.target.value});
  }

  render() {
    return (
      <div className='create transition-item'>
          <div className='back' onClick={this.goHome.bind(this)}>
              <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h2>Create Queue</h2>
          <input type='text' className='code-input' placeholder='Create Join Code' onChange={this.onCodeChange.bind(this)}/>
          <div className='button accent-button' onClick={this.createQueue}>Create!</div>
      </div>
    )
  }
}

export default Create;
