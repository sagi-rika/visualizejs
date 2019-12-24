import React from 'react';
import PropTypes from 'prop-types';
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

StatusBar.propTypes = {
  cursor: PropTypes.shape({
    row: PropTypes.number,
    col: PropTypes.number
  })
};

export default StatusBar;
