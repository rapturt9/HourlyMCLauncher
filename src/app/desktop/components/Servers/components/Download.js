import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { Header, Segment, Button, Progress } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';
import '../App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { add as add7z } from 'node-7z';
import path from 'path';
import fs from 'fs';
import { get7zPath } from '../../../utils';
import { openModal } from '../../../../../common/reducers/modals/actions';

const os = require('os');

const downloadFile = async (archiveName, zipDestPath, filesArray) => {
  const sevenZipPath = await get7zPath();
  const zipCreation = add7z(
    path.join(zipDestPath, `${archiveName}.zip`),
    filesArray,
    {
      $bin: sevenZipPath,
      $raw: ['-tzip'],
      $spawnOptions: { cwd: zipDestPath, shell: true }
    }
  );
  await new Promise((resolve, reject) => {
    zipCreation.on('end', () => {
      resolve();
    });
    zipCreation.on('error', err => {
      reject(err.stderr);
    });
  });
};

const Download = props => {
  const dispatch = useDispatch();
  let state = {
    href: 'data:application/octet-stream;base64,',
    chunkBlobs: [],
    dzchunkindex: null,
    dzchunkbyteoffset: null,
    totalChunks: null,
    downloadDone: false,
    max: 95
  };
  const [chunkindex, setChunkindex] = useState(0);
  useEffect(() => {
    downloadFile();
  }, []);
  /* useEffect(() => {
    console.log(state);
    if (state.downloadDone === false) {
      downloadFile();
    }
  }, [state]); */

  const updateState = obj => {
    console.log(state);
    const stateObj = state;
    for (const k in obj) {
      stateObj[k] = obj[k];
    }
    state = stateObj;
    setChunkindex(state.dzchunkindex);
    if (state.downloadDone === false) {
      downloadFile();
    }
    // stateObj.update += 1;
    // setState(stateObj);
  };

  const downloadChunk = async requestParams => {
    try {
      const response = await API.get(
        'fileManagerApi',
        `/api/objects/${props.route}/download`,
        requestParams
      );
      return response;
    } catch (error) {
      const formattedResponse = {
        type: 'danger',
        message: 'Download did not complete successfully. Check API logs.'
      };
      props.downloadCompleted(formattedResponse);
    }
  };

  const downloadFile = async () => {
    if (state.dzchunkindex == null && state.dzchunkbyteoffset == null) {
      props.downloadStarted();
      const requestParams = {
        queryStringParameters: {
          path: props.path,
          filename: props.filename,
          auth: props.auth,
          folder: props.folder
        }
      };

      const chunk = await downloadChunk(requestParams);

      const offset = chunk.dzchunkbyteoffset;
      const chunkIndex = chunk.dzchunkindex;

      const chunkData = chunk.chunk_data;
      try {
        const chunkblob = await (await fetch(state.href + chunkData)).blob();
        const chunkBlobs = state.chunkBlobs.slice();
        chunkBlobs[chunkIndex] = chunkblob;
        updateState({
          totalChunks: chunk.dztotalchunkcount,
          chunkBlobs,
          dzchunkindex: chunkIndex,
          dzchunkbyteoffset: offset
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      const requestParams = {
        queryStringParameters: {
          path: props.path,
          filename: props.filename,
          dzchunkindex: state.dzchunkindex,
          dzchunkbyteoffset: state.dzchunkbyteoffset
        }
      };

      const chunk = await downloadChunk(requestParams);

      const offset = chunk.dzchunkbyteoffset;
      const chunkIndex = chunk.dzchunkindex;
      console.log(chunk);
      console.log(chunkIndex);
      const totalChunks = chunk.dztotalchunkcount;

      if (chunkIndex === totalChunks) {
        updateState({ downloadDone: true });

        const finalBlob = new Blob(state.chunkBlobs);
        console.log(finalBlob);
        const arrayBuffer = await finalBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // fs.createWriteStream('downloads/').write(buffer);
        const userHomeDir = os.homedir();
        const fullpath = `${userHomeDir}/Downloads/${props.filename}`;
        console.log(fullpath);
        fs.writeFile(fullpath, buffer, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });
        console.log('downloaded all');
        // const link = document.createElement('a');
        /*
        link.href = window.URL.createObjectURL(finalBlob);
        link.download = props.filename;

        link.click(); */

        const formattedResponse = {
          type: 'success',
          message: 'File is now in Downloads folder!'
        };
        props.downloadCompleted(formattedResponse);
        /* dispatch(
          openModal('InstanceExportCurseForge', { instanceName: 'Fabric 1.19' })
        ); */
      } else {
        const chunkData = chunk.chunk_data;

        const chunkblob = await (await fetch(state.href + chunkData)).blob();

        const chunkBlobs = state.chunkBlobs.slice();
        chunkBlobs[chunkIndex] = chunkblob;

        updateState({
          dzchunkindex: chunkIndex,
          dzchunkbyteoffset: offset,
          chunkBlobs
        });
      }
    }
  };
  return (
    <div className="center ServerWrapper">
      <Segment>
        <Header as="h4">Downloading file: {props.filename}</Header>
        <Progress
          percent={Math.round(((chunkindex + 1) / state.totalChunks) * 100)}
          color="blue"
        />
      </Segment>
    </div>
  );
};
export default Download;
