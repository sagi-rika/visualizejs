import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const ProgressBar = ({ time }) => <Progress time={time} />;

const keyFrameExampleOne = keyframes`
  0% {
    translateX: -100%;
  }
  100% {
    translateX: 0%;
  }
`;

const Progress = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 50%;
  height: 2rem;
  overflow: hidden;
  translatex: -100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: orange;
    animation: ${keyFrameExampleOne} ${({ time }) => time / 1000}s ease-in-out;
  }
`;

ProgressBar.propTypes = {
  time: PropTypes.number.isRequired
};

export default ProgressBar;
