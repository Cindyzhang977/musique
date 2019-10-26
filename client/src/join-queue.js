import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './views/index.css';

class Join extends React.Component {
  goHome() {
      this.props.history.push({
        pathname: '/'
      });
  }

  render() {
    return (
      <div className='join transition-item'>
          <div className='back' onClick={this.goHome.bind(this)}>
              <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h2>Join Queue</h2>
          <input className='code-input' type='text' placeholder='Enter Code' />
          <div className='button accent-button'>Join!</div>
      </div>
    )
  }
}

export default Join;
