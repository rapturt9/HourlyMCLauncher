import React, { memo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { faGear } from 'fortawesome-solid-latest';
import axios from 'axios';

const api = 'https://25gpipzky9.execute-api.us-east-1.amazonaws.com/prod/';

const StatusContainer = ({ server, accessToken, sts, openModal, user }) => {
  const [status, setStatus] = useState('stopped');
  const [hover, setHover] = useState(false);
  const [gear, setGear] = useState(false);
  // const currentAccount = useSelector(_getCurrentAccount);
  // const { accessToken } = currentAccount;
  function MouseOver(event) {
    setHover(true);
  }
  function MouseOut(event) {
    setHover(false);
  }

  function GearOver(event) {
    setGear(true);
  }
  function GearOut(event) {
    setGear(false);
  }

  useEffect(() => {
    setStatus(sts);
  }, [sts]);

  const startServer = async () => {
    try {
      const res = await axios.post(
        api,
        {},
        {
          params: {
            mcAccessToken: accessToken,
            SUBDOMAIN: `${server}.hourlymc.com`,
            SERVICE: `minecraft-server-${server}`,
            CLUSTER: 'minecraft',
            REGION: 'us-east-1',
            type: 'start',
            user
          }
        }
      );
      console.log(res);
      if (res.data.message === 'Updated desiredCount to 1') {
        setStatus('launching');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const stopServer = async () => {
    try {
      const res = await axios.post(
        api,
        {},
        {
          params: {
            mcAccessToken: accessToken,
            SUBDOMAIN: `${server}.hourlymc.com`,
            SERVICE: `minecraft-server-${server}`,
            type: 'stop',
            user
          }
        }
      );
      console.log(res);
      if (res.data.message === 'Updated desiredCount to 0') {
        setStatus('stopped');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const statusMap = {
    stopped: ['Stopped', '#AA4A44', startServer, faPlay],
    launching: ['Starting', '#e08119', null, null],
    stopping: ['Stopping', '#e04119', null, null],
    creating: ['Creating', '#19e0c9', null, null],
    deleting: ['Deleting', '#731919', null, null],
    started: ['Ready', '#4CBB17', stopServer, faStop]
  };

  if (status === '') {
    return null;
  }
  return (
    <div
      className="ServerWrapper"
      onMouseOver={MouseOver}
      onFocus={MouseOver}
      onMouseOut={MouseOut}
      onBlur={MouseOut}
      css={`
        width: 100px;
        height: 100px;
        background-color: ${statusMap[status][1]};
        margin: 10px;
        position: relative;
        display: inline-block;
      `}
      onClick={statusMap[status][2]}
    >
      <p
        css={`
          text-align: center;
          vertical-align: middle;
          line-height: 100px;
          position: absolute;
          margin: 0;
          margin-top: 18px;
          width: 100px;
          font-size: 20px;
        `}
        style={{ marginTop: '40px' }}
      >
        {statusMap[status][0]}
      </p>
      <p
        css={`
          text-align: center;
          vertical-align: middle;
          line-height: 100px;
          position: absolute;
          margin: 0;
          margin-top: 38px;
          width: 100px;
          font-size: 13px;
        `}
        style={{ marginTop: '75px' }}
      >
        {server}
      </p>
      <FontAwesomeIcon
        onMouseOver={GearOver}
        onFocus={GearOver}
        onMouseOut={GearOut}
        onBlur={GearOut}
        size="1x"
        icon={faGear}
        onClick={event => {
          event.stopPropagation();
          openModal();
        }}
        css={`
          position: absolute;
          margin-top: 10px;
          margin-left: 10px;
        `}
      />
      {statusMap[status][3] && (
        <FontAwesomeIcon
          size="2x"
          icon={statusMap[status][3]}
          className={hover & !gear ? 'fa-beat-fade' : ''}
          css={`
            position: absolute;
            margin-top: 10px;
            margin-left: 64px;
            --fa-beat-scale: 2;
          `}
        />
      )}
    </div>
  );
};

export default StatusContainer;
