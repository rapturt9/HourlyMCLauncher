import React, { Component } from 'react';
import { Amplify } from 'aws-amplify';
import './index.scss';
import App from './App';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

class Server extends Component {
  render() {
    return (
      <div>
        <App />
      </div>
    );
  }
}

export default Server;
