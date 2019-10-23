import React from 'react';

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
          <div className='back' onClick={this.goHome.bind(this)}>back</div>
          <h2>Create Queue</h2>
          <input type='text' placeholder='Create Join Code' />
          <div className='button accent-button'>Create!</div>
      </div>
    )
  }
}

export default Create;
