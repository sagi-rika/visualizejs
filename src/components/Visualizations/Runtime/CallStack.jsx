import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Border, Label } from './Shared';

const CallStack = ({ stack }) => (
  <CallStackList>
    <Label>Callstack</Label>
    <FlexTransitionGroup>
      {stack.map(call => (
        <CSSTransition key={call.id} classNames="my-node" timeout={400}>
          <CallStackItem>{call.source}</CallStackItem>
        </CSSTransition>
      ))}
    </FlexTransitionGroup>
  </CallStackList>
);

const CallStackList = styled(Border)``;

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

CallStack.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.object)
};

export default CallStack;
