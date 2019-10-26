import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './views/index.css';

class Create extends React.Component {
  goHome() {
      this.props.history.push({
        pathname: '/'
      });
  }

  render() {
    return (
      <div className='create transition-item'>
          <div className='back' onClick={this.goHome.bind(this)}>
              <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <h2>Create Queue</h2>
          <input type='text' className='code-input' placeholder='Create Join Code' />
          <div className='button accent-button'>Create!</div>
      </div>
    )
  }
}

export default Create;
