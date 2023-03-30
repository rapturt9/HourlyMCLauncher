import React, { useRef, useState, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLongArrowAltRight,
  faLongArrowAltUp,
  faLongArrowAltDown
} from '@fortawesome/free-solid-svg-icons';
import backgroundVideo from '../../../common/assets/onboarding.webm';
import { _getCurrentAccount } from '../../../common/utils/selectors';
import BisectHosting from '../../../ui/BisectHosting';
import KoFiButton from '../../../common/assets/ko-fi.png';
import { openModal } from '../../../common/reducers/modals/actions';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.palette.colors.darkBlue};
  overflow: hidden;
`;

const scrollToRef = ref =>
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

const last = 2;
const Home = () => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [initScrolled, setInitScrolled] = useState(true);
  const account = useSelector(_getCurrentAccount);

  // const firstSlideRef = useRef(null);
  const secondSlideRef = useRef(null);
  const thirdSlideRef = useRef(null);
  /* const forthSlideRef = useRef(null);
  const fifthSlideRef = useRef(null); */
  const executeScroll = type => {
    if (currentSlide + type < 0 || currentSlide + type > 5) return;
    setCurrentSlide(currentSlide + type);
    switch (currentSlide + type) {
      case 0:
        scrollToRef(firstSlideRef);
        break;
      case 1:
        scrollToRef(secondSlideRef);
        break;
      case 2:
        scrollToRef(thirdSlideRef);
        break;
      case 3:
        scrollToRef(forthSlideRef);
        break;
      case 4:
        scrollToRef(fifthSlideRef);
        break;
      default:
        scrollToRef(secondSlideRef);
        break;
    }
  };

  useEffect(() => {
    /* setTimeout(() => {
      setInitScrolled(true);
      executeScroll(1);
    }, 4800); */
  }, []);

  return (
    <Background>
      {/* <div
        ref={firstSlideRef}
        css={`
          height: 100%;
          width: 100%;
          background: ${props => props.theme.palette.grey[700]};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${props => props.theme.palette.text.primary};
        `}
      >
        <div
          css={`
            font-size: 40px;
            font-weight: 800;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <video
            autoPlay
            muted
            css={`
              height: 100vh;
            `}
          >
            <source src={backgroundVideo} type="video/webm" />
          </video>
        </div>
  </div> */}
      <div
        ref={secondSlideRef}
        css={`
          height: 100vh;
          width: 100vw;
          background: ${props => props.theme.palette.grey[700]};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${props => props.theme.palette.text.primary};
        `}
      >
        <div
          css={`
            font-size: 30px;
            font-weight: 700;
            text-align: center;
            padding: 0 120px;
          `}
        >
          {account.selectedProfile.name}, welcome to HourlyMCLauncher!
        </div>
      </div>
      <div
        ref={thirdSlideRef}
        css={`
          height: 100vh;
          width: 100vw;
          background: ${props => props.theme.palette.grey[700]};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${props => props.theme.palette.text.primary};
        `}
      >
        <div
          css={`
            font-size: 30px;
            font-weight: 600;
            text-align: center;
            margin: 20% 10%;
          `}
        >
          You can add local minecraft instances and spin up servers from the
          launcher <br />
          Simply choose a server name when creating it and visit
          [servername].hourlymc.com to join the server when ready
        </div>
      </div>
      {/* <div
        ref={forthSlideRef}
        css={`
          height: 100%;
          width: 100%;
          background: ${props => props.theme.palette.grey[800]};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={`
            font-size: 30px;
            font-weight: 600;
            text-align: center;
            margin: 20%;
          `}
        >
          Or you can also support us through Ko-Fi.
          <div
            css={`
              margin: 40px;
            `}
          >
            <a href="https://ko-fi.com/gdlauncher">
              <img src={KoFiButton} alt="Ko-Fi" />
            </a>
          </div>
        </div>
      </div>
      <div
        ref={fifthSlideRef}
        css={`
          height: 100%;
          width: 100%;
          background: ${props => props.theme.palette.grey[700]};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={`
            font-size: 30px;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin: 20%;
          `}
        >
          Also, don&apos;t forget to join us on Discord! This is where our
          community is!
          <iframe
            css={`
              margin-top: 40px;
            `}
            src="https://discordapp.com/widget?id=398091532881756161&theme=dark"
            width="350"
            height="410"
            allowTransparency="true"
            frameBorder="0"
            title="discordFrame"
          />
</div>
      </div> */}
      {currentSlide !== 0 && currentSlide !== 1 && initScrolled && (
        <div
          css={`
            position: fixed;
            right: 20px;
            top: 40px;
            transition: 0.1s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            font-size: 40px;
            cursor: pointer;
            width: 70px;
            height: 40px;
            color: ${props => props.theme.palette.text.icon};
            &:hover {
              background: ${props => props.theme.action.hover};
            }
          `}
          onClick={() => executeScroll(-1)}
        >
          <FontAwesomeIcon icon={faLongArrowAltUp} />
        </div>
      )}
      {currentSlide !== 0 && initScrolled && (
        <div
          css={`
            position: fixed;
            right: 20px;
            bottom: 20px;
            transition: 0.1s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
            font-size: 40px;
            cursor: pointer;
            width: 70px;
            height: 40px;
            color: ${props => props.theme.palette.text.icon};
            &:hover {
              background: ${props => props.theme.action.hover};
            }
          `}
          onClick={() => {
            if (currentSlide === last) {
              dispatch(push('/home'));
            } else {
              executeScroll(1);
            }
          }}
        >
          <FontAwesomeIcon
            icon={
              currentSlide === last ? faLongArrowAltRight : faLongArrowAltDown
            }
          />
        </div>
      )}
    </Background>
  );
};

export default memo(Home);
