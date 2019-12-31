import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ScaleLoader } from 'react-spinners';

import { Border, Label } from './Shared';

const WebApis = ({ apis }) => (
  <WebApiList>
    <Label>Web Apis</Label>
    <FlexTransitionGroup>
      {Object.entries(apis).map(([id, data]) => (
        <CSSTransition key={id} classNames="my-node" timeout={400}>
          <WebApi time={data.delay}>
            <p>{data.code}</p>
            <ScaleLoader sizeUnit="px" color="#FFA500" size={30} loading />
          </WebApi>
        </CSSTransition>
      ))}
    </FlexTransitionGroup>
  </WebApiList>
);

const WebApiList = styled(Border)`
  margin-left: 2rem;
  justify-content: flex-start;
  align-items: center;
`;

const FlexTransitionGroup = styled(TransitionGroup)`
  width: 85%;
  display: flex;
  flex-flow: column nowrap;
  padding-top: 1rem;
`;

const moveRight = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
`;

const WebApi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 0 2rem;
  margin: 0.5rem 0;
  border: 1px dotted #ccc;
  border-radius: 100px;
  font-size: 1.7rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(255, 165, 0);
    transform: translateX(-100%);
    animation: ${({ time }) => time / 1000}s ${moveRight} forwards ease-in;
    z-index: -1;
  }

  &::after {
    content: "${({ time }) => `${time / 1000}s` || 'Unknown'}";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(255, 165, 0);
    opacity: 0;
    transition: 0.3s ease-out;
    color: #fff;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export default WebApis;
