import React from 'react';
import styled from 'styled-components';

const StatusBar = ({ cursor }) => (
  <StatusBarWrap>
    {cursor.row && (
      <Para>
        Row: {cursor.row}, Column: {cursor.col}
      </Para>
    )}
  </StatusBarWrap>
);

const Para = styled.p`
  padding-left: 55px;
  color: #fff;
  font-size: 1.5rem;
`;

const StatusBarWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

export default StatusBar;
