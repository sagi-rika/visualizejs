import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CallStack = ({ stack }) => (
  <Border>
    {stack.reverse().map(call => (
      <div key={call.id}>{call.source}</div>
    ))}
  </Border>
);

const Border = styled.div`
  border: 1px dotted #ccc;
  border-radius: 8px;
  height: 100%;
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
`;

CallStack.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.object)
};

export default CallStack;
