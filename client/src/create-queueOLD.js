import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './views/index.css';
import MusiqueQueue from './musique-queue';

class Create extends React.Component {
  /* Page that allows users to create a MusiqueQueue as the host */

  constructor(props) {
    super(props);
    this.createQueue = this.createQueue.bind(this);
    this.state = {
      partyCode: '',
      queueCreated: false,
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
    fetch('http://localhost:5000/party/addParty', {
      method: 'POST',
      body: JSON.stringify({"partyCode": this.state.partyCode}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json()
      .then(result => {
        this.setState({partyID: result, queueCreated: true});
      }
    ))
    .catch(err => console.log(err));
  }

  onCodeChange(e) {
    this.setState({partyCode: e.target.value});
  }

  // render() {
  //   if (this.state.queueCreated) {
  //     return (
  //         <MusiqueQueue id={this.state.partyID} />
  //     );
  //   } else {
  //     return (
  //       <div className='create transition-item'>
  //           <div className='back' onClick={this.goHome.bind(this)}>
  //               <FontAwesomeIcon icon={faArrowLeft} />
  //           </div>
  //           <h2>Create Queue</h2>
  //           <input type='text' className='code-input' placeholder='Create Join Code' onChange={this.onCodeChange.bind(this)}/>
  //           <div className='button accent-button' onClick={this.createQueue}>Create!</div>
  //       </div>
  //     )
  //   }
  // }

  render() {
    if (this.state.queueCreated) {
      return <Redirect to={{
            pathname: '/musique-queue',
            state: {partyID: this.state.partyID}
        }}/>;
    }
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
