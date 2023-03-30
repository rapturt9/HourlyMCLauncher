import React, { memo } from 'react';

const Logo = ({ size, pointerCursor }) => {
  return (
    <svg
      version="1.1"
      css={{ width: size, height: size }}
      x="0px"
      y="0px"
      viewBox="100 50 250 250"
      xmlSpace="preserve"
    >
      <polygon
        css={{ fill: '#e08119', cursor: pointerCursor ? 'pointer' : '' }}
        points="154,177 154,193 132,215 101,215 101,128 132,128 172,159 212,128 243,128 243,215 212,215 190,193 190,177 212,199 228,199 228,144 212,144 172,175 132,144 116,144 116,199 132,199 "
      />
    </svg>
  );
};

export default memo(Logo);
