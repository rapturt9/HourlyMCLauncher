import React from 'react';
import styled from 'styled-components';

const Logo = styled.svg`
  width: ${props => props.size}px;
  cursor: ${props => (props.pointer ? 'cursor' : 'pointer')};
  * {
    cursor: ${props => (props.pointer ? 'cursor' : 'pointer')};
    transition: 0.2s;
  }
  &:hover {
    *:not(.innerHorizontalLogoPath) {
      fill: ${({ theme }) => theme.palette.primary.dark};
    }
  }
`;

const HorizontalLogo = ({ size, pointer, onClick }) => {
  return (
    <Logo
      version="1.1"
      x="0px"
      pointer={pointer}
      y="0px"
      viewBox="0 300 1000 400"
      size={size}
      fill="none"
      xmlSpace="preserve"
      onClick={onClick}
    >
      <path
        style={{
          isCustomFont: 'none',
          fontFileUrl: 'none'
        }}
        vectorEffect="non-scaling-stroke"
        fill="#e08119"
        transform="translate(227.574 499.998) scale(2.9146)"
        d="M-18 10L-18 26 -40 48 -71 48 -71 -48 -40 -48 0 -8 40 -48 71 -48 71 48 40 48 18 26 18 10 40 32 56 32 56 -32 40 -32 0 8 -40 -32 -56 -32 -56 32 -40 32z"
      />
      <g fontFamily="Abel" fontSize={109} fill="#e08119">
        <path
          style={{
            isCustomFont: 'none',
            fontFileUrl: 'none',
            whiteSpace: 'pre'
          }}
          d="M-169.03 34.24h-6.87V-.62h-29.22v34.86h-6.86v-76.32h6.86v34.91h29.22v-34.91h6.87v76.32zM-110.35 19.29q0 3.3-1.25 6.22-1.25 2.93-3.43 5.11-2.19 2.18-5.11 3.44-2.93 1.25-6.23 1.25h-4.37q-3.29 0-6.22-1.25-2.93-1.26-5.11-3.44-2.18-2.18-3.43-5.11-1.26-2.92-1.26-6.22V-5.3q0-3.3 1.26-6.23 1.25-2.93 3.43-5.11t5.11-3.43q2.93-1.25 6.22-1.25h4.37q3.3 0 6.23 1.25 2.92 1.25 5.11 3.43 2.18 2.18 3.43 5.11t1.25 6.23v24.59zm-6.55.37V-5.68q0-1.96-.74-3.69-.75-1.73-2.02-3.01-1.28-1.28-3.01-2.02-1.73-.75-3.7-.75h-4.37q-1.96 0-3.69.75-1.73.74-3.01 2.02-1.28 1.28-2.02 3.01-.75 1.73-.75 3.69v25.34q0 1.97.75 3.7.74 1.73 2.02 3 1.28 1.28 3.01 2.03 1.73.74 3.69.74h4.37q1.97 0 3.7-.74 1.73-.75 3.01-2.03 1.27-1.27 2.02-3 .74-1.73.74-3.7zM-52.79 34.24h-2.18l-3.62-5.53q-2.23 3.03-5.59 4.81-3.35 1.79-7.34 1.79h-1.65q-3.3 0-6.23-1.25-2.93-1.26-5.11-3.44-2.18-2.18-3.43-5.11-1.25-2.92-1.25-6.22v-39.55h6.54v39.92q0 1.97.75 3.7.74 1.73 2.02 3 1.28 1.28 3.01 2.03 1.73.74 3.7.74h4.36q1.97 0 3.7-.74 1.73-.75 3.01-2.03 1.28-1.27 2.02-3 .75-1.73.75-3.7v-39.92h6.54v54.5zM-9.06-14.03h-6.55q-1.97 0-3.7.74-1.73.75-3 2.03-1.28 1.27-2.03 3-.74 1.73-.74 3.7v38.8h-6.55v-54.5h2.18l3.57 5.54q2.23-3.04 5.61-4.82 3.38-1.78 7.38-1.78h3.83v7.29zM16.46 34.24H9.91v-76.32h6.55v76.32zM76.21-20.26L48.64 56.06H42.3l9.69-26.5-17.67-49.82h6.55l14.21 41.3.21 2.82.21-2.82 14.16-41.3h6.55zM146.86 34.24H140v-52.32l-.48 3.25-17.73 49.07h-3.62l-17.88-49.07-.42-3.25v52.32H93v-76.32h3.57l23.15 62.59.21 2.82.21-2.82 23.1-62.59h3.62v76.32zM214.16 16.57q0 3.89-1.46 7.29-1.46 3.41-4.02 5.96-2.55 2.56-5.96 4.02-3.4 1.47-7.29 1.47H190q-3.88 0-7.32-1.47-3.43-1.46-5.98-4.02-2.56-2.55-4.02-5.96-1.47-3.4-1.47-7.29v-40.98q0-3.89 1.47-7.29 1.46-3.41 4.02-5.96 2.55-2.56 5.98-4.02 3.44-1.46 7.32-1.46h5.43q3.89 0 7.29 1.46 3.41 1.46 5.96 4.02 2.56 2.55 4.02 5.96 1.46 3.4 1.46 7.29v3.09l-6.86 1.06v-4.15q0-2.55-.96-4.76t-2.61-3.86q-1.65-1.65-3.86-2.61-2.2-.96-4.76-.96h-4.79q-2.55 0-4.76.96t-3.89 2.61q-1.67 1.65-2.63 3.86t-.96 4.76v40.98q0 2.56.96 4.76.96 2.21 2.63 3.89 1.68 1.68 3.89 2.63 2.21.96 4.76.96h4.79q2.56 0 4.76-.96 2.21-.95 3.86-2.63t2.61-3.89q.96-2.2.96-4.76v-4.15l6.86 1.12v3.03z"
          transform="translate(719.158 492.8)"
        />
      </g>
    </Logo>
  );
};

export default HorizontalLogo;
