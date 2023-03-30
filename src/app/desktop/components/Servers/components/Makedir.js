import React, { Component } from 'react';
import { API } from 'aws-amplify';
import {
  Header,
  Segment,
  Grid,
  Button,
  Icon,
  Divider,
  Dimmer,
  Input
} from 'semantic-ui-react';
import '../App.scss';

class Makedir extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  createDirectory = async (name, path) => {
    const dir_data = { path, name };
    const params = {
      body: dir_data,
      headers: {
        'Content-Type': 'application/json'
      },
      queryStringParameters: {
        auth: this.props.auth,
        folder: this.props.folder
      }
    };
    const formattedResponse = { type: '', message: '' };
    try {
      const response = await API.post(
        'fileManagerApi',
        `/api/objects/${this.props.route}/dir`,
        params
      );
      if (response.statusCode != 200) {
        formattedResponse.type = 'danger';
        formattedResponse.message =
          'Could not create directory. Check API logs. ';
      } else {
        formattedResponse.type = 'success';
        formattedResponse.message = 'Directory created!';
      }
    } catch (error) {
      formattedResponse.type = 'danger';
      formattedResponse.message =
        'Could not create directory. Check API logs. ';
    }
    this.props.submit(formattedResponse);
  };

  onSubmit = () => {
    this.createDirectory(this.state.name, this.props.path);
  };

  render() {
    return (
      <div className="center ServerWrapper">
        <Segment>
          <Header as="h4">Directory Name</Header>
          <Input
            placeholder="enter a directory name"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <Button
            style={{ marginTop: '15px' }}
            fluid
            positive
            onClick={this.onSubmit}
          >
            Submit
          </Button>
        </Segment>
      </div>
    );
  }
}
export default Makedir;
