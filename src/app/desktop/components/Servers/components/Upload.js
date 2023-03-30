import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Header, Segment, Button, Progress } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';
import '../App.scss';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlLoaded: false,
      fileToUpload: null,
      totalChunks: 0,
      currentChunk: 0,
      max: 95,
      uploading: false,
      chunkSize: 1000000 // bytes
    };
  }

  componentDidUpdate() {
    console.log(this.state);
    console.log(
      Math.round((100 * this.state.currentChunk) / this.state.totalChunks)
    );
  }

  afterComplete = (status, message) => {
    const formattedResponse = { type: '', message: '' };
    if (status == true) {
      formattedResponse.type = 'success';
      formattedResponse.message = message;
      this.props.emit(formattedResponse);
    } else {
      formattedResponse.type = 'danger';
      formattedResponse.message = message;
      this.props.emit(formattedResponse);
    }
  };

  blobToBase64 = blob => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',').pop());
      reader.readAsDataURL(blob);
    });
  };

  deleteFile = async () => {
    const requestParams = {
      queryStringParameters: {
        path: this.props.path,
        name: this.state.fileToUpload.name,
        auth: this.props.auth,
        folder: this.props.folder
      }
    };
    try {
      await API.del(
        'fileManagerApi',
        `/api/objects/${this.props.route}`,
        requestParams
      );
    } catch (error) {
      console.log(error);
    }
  };

  uploadChunk = async chunkData => {
    const requestParams = {
      queryStringParameters: {
        path: this.props.path,
        filename: this.state.fileToUpload.name,
        auth: this.props.auth,
        folder: this.props.folder
      },
      headers: {
        'Content-Type': 'application/json'
      },
      body: chunkData
    };
    let response = await API.post(
      'fileManagerApi',
      `/api/objects/${this.props.route}/upload`,
      requestParams
    );
    let chunkStatus = false;
    if (response.statusCode == 200) {
      chunkStatus = true;
    } else {
      // Retry request
      response = await API.post(
        'fileManagerApi',
        `/api/objects/${this.props.route}/upload`,
        requestParams
      );
      if (response.statusCode == 200) {
        chunkStatus = true;
      } else {
        chunkStatus = false;
      }
    }
    return chunkStatus;
  };

  checkIfFileExists = () => {
    const thisfileNames = this.props.files.map(obj => obj.Name);
    if (thisfileNames.indexOf(this.state.fileToUpload.name) > -1) {
      console.log(this.state.fileToUpload.name, thisfileNames);
      this.afterComplete(false, 'File already exists.');
    } else {
      this.upload(0, 0);
    }
  };

  // this whole function needs to be cleaned up, notably reduce duplicate code by breaking out into functions - works well for now though
  upload = async (chunkIndex, chunkOffset) => {
    const promisedSetState = newState =>
      new Promise(resolve => this.setState(newState, resolve));
    await promisedSetState({ currentChunk: chunkIndex });
    // first if block is for the first call to upload, e.g. when the button is clicked
    if (chunkIndex == 0 && chunkOffset == 0) {
      this.props.uploadStarted();
      const fileSize = this.state.fileToUpload.size;
      const chunk = this.state.fileToUpload.slice(0, this.state.chunkSize + 1);
      const chunkData = {};
      await promisedSetState({
        totalChunks: Math.ceil(fileSize / this.state.chunkSize),
        uploading: true
      });

      chunkData.dzchunkindex = 0;
      chunkData.dztotalfilesize = fileSize;
      chunkData.dzchunksize = this.state.chunkSize;
      chunkData.dztotalchunkcount = this.state.totalChunks;
      chunkData.dzchunkbyteoffset = 0;
      chunkData.content = await this.blobToBase64(chunk);

      const chunkStatus = await this.uploadChunk(chunkData);
      if (!chunkStatus) {
        // Check if not a 200 response code
        // Delete partially uploaded file.
        this.deleteFile();
        this.afterComplete(
          false,
          'File was unable to be uploaded successfully. Check API logs.'
        );
      } else if (this.state.totalChunks == 1 || this.state.totalChunks < 1) {
        await promisedSetState({ uploading: false });
        this.afterComplete(true, 'File uploaded successfully!');
      } else {
        const nextChunkIndex = 1;
        const nextChunkOffset = this.state.chunkSize + 1;
        this.upload(nextChunkIndex, nextChunkOffset);
      }
    }

    // this case is hit recursively from the first call
    else {
      // check to see if the current chunk is equal to total chunks, if so we send the last bytes and return complete
      if (chunkIndex == this.state.totalChunks - 1) {
        const fileSize = this.state.fileToUpload.size;
        const chunk = this.state.fileToUpload.slice(chunkOffset);
        const chunkData = {};

        chunkData.dzchunkindex = chunkIndex;
        chunkData.dztotalfilesize = fileSize;
        chunkData.dzchunksize = this.state.chunkSize;
        chunkData.dztotalchunkcount = this.state.totalChunks;
        chunkData.dzchunkbyteoffset = chunkOffset;
        chunkData.content = await this.blobToBase64(chunk);

        const chunkStatus = await this.uploadChunk(chunkData);

        if (!chunkStatus) {
          // Check if not a 200 response code
          // Delete partially uploaded file.
          this.deleteFile();
          this.afterComplete(
            false,
            'File was unable to be uploaded successfully. Check API logs.'
          );
        } else {
          this.uploading = false;
          this.afterComplete(true, 'File uploaded successfully!');
        }
      }
      // in this case there are chunks remaining, so we continue to upload chunks
      else {
        const fileSize = this.state.fileToUpload.size;
        const end = Math.min(chunkOffset + this.state.chunkSize, fileSize);
        const chunk = this.state.fileToUpload.slice(chunkOffset, end);
        const chunkData = {};

        chunkData.dzchunkindex = chunkIndex;
        chunkData.dztotalfilesize = fileSize;
        chunkData.dzchunksize = this.state.chunkSize;
        chunkData.dztotalchunkcount = this.state.totalChunks;
        chunkData.dzchunkbyteoffset = chunkOffset;
        chunkData.content = await this.blobToBase64(chunk);

        const chunkStatus = await this.uploadChunk(chunkData);

        if (!chunkStatus) {
          // Check if not a 200 response code
          // Delete partially uploaded file.
          this.deleteFile();
          this.afterComplete(
            false,
            'File was unable to be uploaded successfully. Check API logs.'
          );
        } else {
          const nextChunkIndex = chunkIndex + 1;
          const nextChunkOffset = end;
          this.upload(nextChunkIndex, nextChunkOffset);
        }
      }
    }
  };

  handleUpload = e => {
    console.log(e);
    this.setState({ fileToUpload: e.target.files[0] });
  };

  render() {
    return (
      <div className="center ServerWrapper">
        <Segment>
          <InputFile
            input={{
              id: 'input-control-id',
              onChange: this.handleUpload
            }}
          />
          {this.state.fileToUpload && (
            <p style={{ color: 'black' }}>{this.state.fileToUpload.name}</p>
          )}
          {this.state.uploading && (
            <Progress
              percent={Math.round(
                (100 * this.state.currentChunk) / this.state.totalChunks
              )}
              color="green"
            />
          )}
          <Button
            style={{ marginTop: '15px' }}
            fluid
            onClick={this.checkIfFileExists}
          >
            Upload
          </Button>
        </Segment>
      </div>
    );
  }
}
export default Upload;
