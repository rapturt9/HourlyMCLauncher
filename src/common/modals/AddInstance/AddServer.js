/* eslint-disable */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import path from 'path';
import fse from 'fs-extra';
import { promises as fs } from 'fs';
import { extractAll } from '../../../app/desktop/utils';
import { ipcRenderer } from 'electron';
import { Button, Input } from 'antd';
import { _getTempPath } from '../../utils/selectors';
import { useSelector } from 'react-redux';
import { getAddon } from '../../api';
import { downloadFile } from '../../../app/desktop/utils/downloader';
import { CURSEFORGE, FABRIC, FORGE, VANILLA } from '../../utils/constants';
import { transparentize } from 'polished';
import axios from 'axios';
import { _getCurrentAccount } from '../../utils/selectors';

const api = 'https://25gpipzky9.execute-api.us-east-1.amazonaws.com/prod/';

const Import = ({
  setModpack,
  setVersion,
  importZipPath,
  setImportZipPath,
  setOverrideNextStepOnClick
}) => {
  const currentAccount = useSelector(_getCurrentAccount);
  const { accessToken } = currentAccount;
  const auth = currentAccount.accessToken;
  const user = currentAccount.selectedProfile.id;
  
  const [localValue, setLocalValue] = useState(null);
  const tempPath = useSelector(_getTempPath);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function createServer () {
    console.log(localValue);
    setLoading(true);
    const res = axios.post(
      api,
      {},
      {
        params: {
          mcAccessToken: accessToken,
          SUBDOMAIN: `${localValue}.hourlymc.com`,
          SERVICE: `minecraft-server-${localValue}`,
          CLUSTER: 'minecraft',
          REGION: 'us-east-1',
          type: 'create',
          user
        }
      }
    ).then(res=>{
      console.log(res);
    });
  }

  return (
    <Container>
      <div>
        {loading ? "Server is provisioning. It takes around 4 minutes to create and start the server. Connect to [server name].hourlymc.com":"Type the server name which will be the subdomain of the server"}
        <div
          css={`
            display: flex;
            margin-top: 20px;
          `}
        >
          <Input
            disabled={loading}
            placeholder=""
            value={localValue}
            onChange={e => setLocalValue(e.target.value)}
            css={`
              width: 400px !important;
              margin-right: 10px !important;
            `}
          />
          <Button disabled={loading} type="primary" onClick={createServer}>
            Submit
          </Button>
        </div>
        <div
          show={error}
          css={`
            opacity: ${props => (props.show ? 1 : 0)};
            color: ${props => props.theme.palette.error.main};
            font-weight: 700;
            font-size: 14px;
            padding: 3px;
            height: 30px;
            margin-top: 10px;
            text-align: center;
            border-radius: ${props => props.theme.shape.borderRadius};
            background: ${props =>
              transparentize(0.7, props.theme.palette.grey[700])};
          `}
        >
          {error && 'There was an issue while creating the server.'}
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Import);

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 30px;
`;
