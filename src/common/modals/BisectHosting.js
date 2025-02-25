import React, { memo } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import BisectHostingLogo from '../../ui/BisectHosting';
import ga from '../utils/analytics';

const BisectHosting = () => {
  return (
    <Modal
      css={`
        height: 150px;
        width: 500px;
        font-size: 10px;
        line-height: 1.8;
      `}
      title="Click the plus sign and add a server"
    >
      <Container>
        <h2
          css={`
            margin-top: 20px;
          `}
        >
          The visit [server name].hourlymc.com on minecraft java{' '}
        </h2>
      </Container>
    </Modal>
  );
};

export default memo(BisectHosting);

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.palette.text.primary};
`;
