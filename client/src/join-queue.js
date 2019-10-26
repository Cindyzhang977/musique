import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './views/index.css';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.joinQueue = this.joinQueue.bind(this);
    this.state = {
      partyCode: '',
      joinSuccess: false,
      size: '',
    }
  }

  goHome() {
      this.props.history.push({
        pathname: '/'
      });
  }

  onCodeChange(e) {
    this.setState({partyCode: e.target.value});
  }

  joinQueue() {
    //tries to get the party code entered from back end
    fetch('http://localhost:5000/party/getParty', { //endpoint
      method: 'POST',
      body: JSON.stringify({'partyCode': this.state.partyCode}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json()
      .then(result => {
          this.setState({joinSuccess: (result.partyCode === this.state.partyCode)});
          this.setState({size: result.size});
          console.log(result.size);
          //indicate error when code is invalid
          if (!this.state.joinSuccess) {
            document.getElementById('invalid-code').style.display = "block";
          }
        }))
    .catch(err => console.log(err));
  }

  render() {
    if (this.state.joinSuccess) {
      return <Redirect to={{
            pathname: '/musique-queue',
            state: { partyCode: this.state.partyCode,
                     size : this.state.size}
        }}/>;
    }

    return (
      <div className='join transition-item'>
          <div className='back' onClick={this.goHome.bind(this)}>
              <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h2>Join Queue</h2>
          <input className='code-input' type='text' placeholder='Enter Code' onChange={this.onCodeChange.bind(this)} />
          <div id='invalid-code'>* Invalid Code *</div>
          <div className='button accent-button' onClick={this.joinQueue}>Join!</div>
      </div>
    )
  }
}

export default Join;
