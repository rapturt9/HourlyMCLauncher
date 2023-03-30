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
  Message
} from 'semantic-ui-react';
import { faTrashCan, faX } from 'fortawesome-solid-latest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Download from './components/Download';
import Upload from './components/Upload';
import Makedir from './components/Makedir';

class FileSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      editEnabled: false,
      filename: null,
      files: [],
      dirs: [],
      navObjects: [
        {
          text: this.props.folder,
          to: {
            name: 'filesystem',
            query: { path: `/mnt/efs/${this.props.folder}` }
          },
          active: true
        }
      ],
      showAlert: false,
      alertMessage: null,
      alertType: null,
      route: 'fs-0c7e511645c632828',
      show: null
    };
  }

  componentDidMount() {
    console.log('mounted');
    this.retrieveObjects();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.folder);
    if (this.props.folder !== prevProps.folder) {
      this.setState(
        {
          active: false,
          editEnabled: false,
          filename: null,
          files: [],
          dirs: [],
          navObjects: [
            {
              text: this.props.folder,
              to: {
                name: 'filesystem',
                query: { path: `/mnt/efs/${this.props.folder}` }
              },
              active: true
            }
          ],
          showAlert: false,
          alertMessage: null,
          alertType: null,
          route: 'fs-0c7e511645c632828',
          show: null
        },
        this.retrieveObjects
      );
    }
    // this.retrieveObjects();
  }

  operationStart = () => {
    this.setState({ active: true });
  };

  refresh = response => {
    this.setState({
      dirs: [],
      show: null,
      files: [],
      active: false,
      alertMessage: response.message,
      alertType: response.type,
      showAlert: false
    });
    this.retrieveObjects();
    /* this.$refs['download'].hide()
        this.$refs['upload'].hide()
        this.$refs['makedir'].hide() */
  };

  norefresh = response => {
    this.setState({
      dirs: [],
      show: null,
      files: [],
      active: false,
      alertMessage: response.message,
      alertType: response.type,
      showAlert: false
    });
  };

  navigateBack = i => {
    const navObjects = this.state.navObjects.slice();
    while (i > 0) {
      if (navObjects.length > 1) {
        navObjects.pop();
      }
      i -= 1;
    }
    navObjects[navObjects.length - 1].active = true;
    this.setState({ navObjects, dirs: [], files: [] }, () => {
      this.retrieveObjects();
    });
  };

  listObjects = objects => {
    console.log(objects);
    const { files } = objects;
    const thisfiles = [];
    for (let file = 0, fileLen = files.length; file < fileLen; file++) {
      const tmp_item = { Name: files[file] };
      thisfiles.push(tmp_item);
    }
    // todo: need to fix this typo in the api response
    const directories = objects.directiories;
    const thisdirs = [];
    for (let dir = 0, dirLen = directories.length; dir < dirLen; dir++) {
      const tmp_item = { Directory: directories[dir] };
      thisdirs.push(tmp_item);
    }
    this.setState({ files: thisfiles, dirs: thisdirs }, () => {
      console.log(this.state);
    });
  };

  deleteFile = async name => {
    const requestParams = {
      queryStringParameters: {
        path: this.state.navObjects[this.state.navObjects.length - 1].to.query
          .path,
        name,
        auth: this.props.auth,
        folder: this.props.folder
      }
    };
    const formattedResponse = { type: '', message: '' };
    try {
      const response = await API.del(
        'fileManagerApi',
        `/api/objects/${this.state.route}`,
        requestParams
      );
      if (response.statusCode !== 200) {
        formattedResponse.type = 'danger';
        formattedResponse.message =
          'File was unable to be deleted successfully. Check API logs.';
      } else {
        formattedResponse.type = 'success';
        formattedResponse.message = 'File deleted successfully!';
      }
    } catch (error) {
      formattedResponse.type = 'danger';
      formattedResponse.message =
        'File was unable to be deleted successfully. Check API logs.';
    }
    this.refresh(formattedResponse);
  };

  addDirectoryObject = directory => {
    const thisnavObjects = this.state.navObjects.slice();
    thisnavObjects[thisnavObjects.length - 1].active = false;
    const existingPath =
      thisnavObjects[thisnavObjects.length - 1].to.query.path;
    const newPath = `${existingPath}/${directory}`;
    console.log(newPath);
    const newDirObject = {
      text: directory,
      to: { name: 'filesystem', query: { path: newPath } },
      active: true
    };
    thisnavObjects.push(newDirObject);
    this.setState({ navObjects: thisnavObjects, dirs: [], files: [] }, () => {
      this.retrieveObjects();
    });
  };

  retrieveObjects = async () => {
    console.log('retrieveObjects');
    const thisnavObjects = this.state.navObjects;
    const requestParams = {
      queryStringParameters: {
        path: thisnavObjects[thisnavObjects.length - 1].to.query.path,
        auth: this.props.auth,
        folder: this.props.folder
      }
    };
    console.log(requestParams);
    try {
      const response = await API.get(
        'fileManagerApi',
        `/api/objects/${this.state.route}`,
        requestParams
      );
      this.listObjects(response);
    } catch (error) {
      const formattedResponse = {
        type: 'danger',
        message: 'Unable to list filesystem objects. Check API logs.'
      };
      console.log(formattedResponse);
      this.norefresh(formattedResponse);
    }
  };

  render() {
    const { path } =
      this.state.navObjects[this.state.navObjects.length - 1].to.query;
    return (
      <div className="ServerWrapper">
        <Segment>
          {this.state.alertMessage && (
            <Message
              success={this.state.alertType === 'success'}
              negative={this.state.alertType === 'success'}
              content={this.state.alertMessage}
            />
          )}
          <Header as="h1">
            Server {this.props.folder}{' '}
            <FontAwesomeIcon
              style={{ float: 'right', color: 'black' }}
              icon={faX}
              onClick={this.props.exit}
            />
          </Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <div>
                    <Header as="h2" style={{ display: 'inline-block' }}>
                      Navigation
                    </Header>
                    <Button
                      icon
                      labelPosition="right"
                      color="orange"
                      style={{ display: 'inline-block', float: 'right' }}
                      onClick={() => {
                        this.setState({ show: 'makedir' });
                      }}
                    >
                      <Icon name="folder" />
                      Create Directory
                    </Button>
                    <Segment>
                      {this.state.navObjects.map((navObject, i) => {
                        if (i < this.state.navObjects.length - 1) {
                          return (
                            <a
                              key={navObject.text}
                              css={`
                                display: 'inline-block';
                              `}
                              onClick={() => {
                                this.navigateBack(
                                  this.state.navObjects.length - i - 1
                                );
                              }}
                            >
                              /{navObject.text}
                            </a>
                          );
                        }
                        return (
                          <a
                            key={navObject.text}
                            css={`
                              display: 'inline-block';
                            `}
                          >
                            /{navObject.text}
                          </a>
                        );
                      })}
                    </Segment>
                    <Divider />
                    <Header as="h3" style={{ marginTop: '-6px' }}>
                      Directory
                    </Header>
                    <Divider />
                    <Grid padded>
                      {this.state.dirs.map(({ Directory }, i) => (
                        <Grid.Row
                          style={
                            i % 2 === 0
                              ? { backgroundColor: '#EEE' }
                              : { backgroundColor: '#FFF' }
                          }
                          basic
                          key={i}
                        >
                          <Grid.Column>
                            <a
                              onClick={() => {
                                this.addDirectoryObject(Directory);
                              }}
                            >
                              {Directory}
                            </a>
                          </Grid.Column>
                        </Grid.Row>
                      ))}
                    </Grid>
                  </div>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <Header as="h2" style={{ display: 'inline-block' }}>
                    Files
                  </Header>
                  <Button
                    icon
                    labelPosition="right"
                    color="orange"
                    style={{ display: 'inline-block', float: 'right' }}
                    onClick={() => {
                      this.setState({ show: 'upload' });
                    }}
                  >
                    <Icon name="upload" />
                    Upload File
                  </Button>
                  <Divider />
                  <Header as="h3" style={{ marginTop: '-6px' }}>
                    Name
                  </Header>
                  <Divider />
                  <Grid padded>
                    {this.state.files.map(({ Name }, i) => (
                      <Grid.Row
                        style={
                          i % 2 === 0
                            ? { backgroundColor: '#EEE', color: 'black' }
                            : { backgroundColor: '#FFF', color: 'black' }
                        }
                        basic
                        key={i}
                      >
                        <Grid.Column>
                          {Name}{' '}
                          <Icon
                            name="long arrow alternate down"
                            color="orange"
                            onClick={() => {
                              this.setState({
                                filename: Name,
                                show: 'download'
                              });
                            }}
                          />
                          <FontAwesomeIcon
                            style={{ float: 'right', color: '#DC143C' }}
                            icon={faTrashCan}
                            onClick={() => {
                              this.deleteFile(Name);
                            }}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    ))}
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Dimmer
            active={this.state.show}
            page
            onClickOutside={() => {
              this.setState({ show: null });
            }}
          >
            {this.state.show === 'makedir' ? (
              <Makedir
                auth={this.props.auth}
                folder={this.props.folder}
                path={path}
                route={this.state.route}
                submit={this.refresh}
              />
            ) : this.state.show === 'download' ? (
              <Download
                auth={this.props.auth}
                folder={this.props.folder}
                path={path}
                route={this.state.route}
                downloadStarted={this.operationStart}
                downloadCompleted={this.refresh}
                filename={this.state.filename}
              />
            ) : this.state.show === 'upload' ? (
              <Upload
                auth={this.props.auth}
                folder={this.props.folder}
                path={path}
                route={this.state.route}
                emit={this.refresh}
                uploadStarted={this.operationStart}
                files={this.state.files}
              />
            ) : null}
          </Dimmer>
        </Segment>
      </div>
    );
  }
}

export default FileSystem;
