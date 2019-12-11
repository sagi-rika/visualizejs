import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const CallStack = ({ stack }) => (
  <Border>
    <Label>Callstack</Label>
    <TransitionGroup>
      {stack.reverse().map(call => (
        <CSSTransition key={call.id} classNames="my-node" timeout={400}>
          <CallStackItem>{call.source}</CallStackItem>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </Border>
);

const Border = styled.div`
  position: relative;
  font-family: 'Poppins', sans-serif;
  padding: 0.6rem;
  border: 1px dashed #ccc;
  border-radius: 8px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
`;

const CallStackItem = styled.div`
  text-align: center;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px dotted #ccc;
  border-radius: 4px;
  font-size: 1.7rem;
`;

const Label = styled.label`
  position: absolute;
  top: 1rem;
  left: 2rem;
  opacity: 0.5;
`;

CallStack.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.object)
};

export default CallStack;
