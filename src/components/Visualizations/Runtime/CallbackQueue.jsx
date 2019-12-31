import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Border, Label } from './Shared';

const CallbackQueue = ({ queue }) => (
  <CallbackQueueList>
    <Label>Callstack</Label>
    <FlexTransitionGroup>
      {queue.map(callback => (
        <CSSTransition key={callback.id} classNames="my-node" timeout={400}>
          <CallStackItem>{callback.source}</CallStackItem>
        </CSSTransition>
      ))}
    </FlexTransitionGroup>
  </CallbackQueueList>
);

const CallbackQueueList = styled(Border)``;

const FlexTransitionGroup = styled(TransitionGroup)`
  display: flex;
  flex-flow: column-reverse nowrap;
`;

const CallStackItem = styled.div`
  text-align: center;
  padding: 0.8rem;
  margin: 0.5rem 0;
  border: 1px dotted #ccc;
  border-radius: 4px;
  font-size: 1.7rem;
`;

CallbackQueue.propTypes = {
  queue: PropTypes.arrayOf(PropTypes.object)
};

export default CallbackQueue;
