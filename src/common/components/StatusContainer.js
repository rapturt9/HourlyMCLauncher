import React, { memo, useState, useEffect } from 'react';
import { FontAwesomeIcon } from 'fortawesome-latest';
import { faArrowRotateRight, faPlay, faStop } from 'fortawesome-solid-latest';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { _getCurrentAccount } from '../utils/selectors';

const StatusContainer = ({ api }) => {
  const [status, setStatus] = useState('');
  const [hover, setHover] = useState(false);
  const currentAccount = useSelector(_getCurrentAccount);
  const { accessToken } = currentAccount;
  console.log(currentAccount);

  function MouseOver(event) {
    setHover(true);
  }
  function MouseOut(event) {
    setHover(false);
  }

  const getStatus = async () => {
    try {
      const res = await axios.get(api);
      console.log(res);
      setStatus(res.data.status);
    } catch (err) {
      console.log(err);
    }
  };

  const startServer = async () => {
    try {
      const res = await axios.post(
        api,
        {},
        {
          params: {
            mcAccessToken: accessToken
          }
        }
      );
      console.log(res);
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
            mcAccessToken: accessToken
          }
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const statusMap = {
    stopped: ['minecraft', '#AA4A44', startServer, faPlay],
    launching: ['Starting', '#e08119', getStatus, faArrowRotateRight],
    started: ['Ready', '#4CBB17', stopServer, faStop]
  };

  useEffect(getStatus, []);

  if (status === '') {
    return null;
  }
  return (
    <div
      onMouseOver={MouseOver}
      onFocus={MouseOver}
      onMouseOut={MouseOut}
      onBlur={MouseOut}
      css={`
        width: 100px;
        height: 100px;
        background-color: ${statusMap[status][1]};
        position: relative;
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
          margin-top: 30px;
          width: 100px;
          font-size: 20px;
        `}
      >
        {statusMap[status][0]}
      </p>
      <FontAwesomeIcon
        size="2x"
        icon={statusMap[status][3]}
        className={hover ? 'fa-beat-fade' : ''}
        css={`
          position: absolute;
          margin-top: 10px;
          margin-left: 15px;
          --fa-beat-scale: 2;
        `}
      />
    </div>
  );
};

export default StatusContainer;
