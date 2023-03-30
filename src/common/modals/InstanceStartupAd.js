import React, { memo, useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Modal from '../components/Modal';
import { closeModal, openModal } from '../reducers/modals/actions';
import StatusContainer from '../components/StatusContainer';

const InstanceStartupAd = ({ instanceName }) => {
  const apis = ['https://0jxufrrim3.execute-api.us-east-1.amazonaws.com/prod/'];

  return (
    <Modal
      css={`
        height: 250px;
        width: 80%;
        overflow-x: hidden;
      `}
      title={`Starting up ${instanceName}`}
    >
      <div
        css={`
          display: flex;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        `}
      >
        <span
          css={`
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
            margin-top: 20px;
          `}
        >
          Your local instance is starting...
          <LoadingOutlined
            css={`
              margin-left: 30px;
              font-size: 50px;
            `}
          />
        </span>
        {/* <ServerComponent /> */}
      </div>
      {/* <div
        css={`
          text-align: center;
          background-color: #e0c09d;
          margin-left: -20px;
          margin-right: -20px;
          margin-top: 20px;
          height: 100%;
          padding: 10px;
        `}
      >
        {apis.map(api => (
          <StatusContainer api={api} />
        ))}
        </div> */}
    </Modal>
  );
};

export default memo(InstanceStartupAd);
