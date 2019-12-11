import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CallStack from './CallStack';

const BackgroundVisualization = ({ stack }) => (
  <Wrapper>
    <CallStack stack={stack} />
  </Wrapper>
);

const mapStateToProps = state => ({
  stack: state.callStack.stack
});

const Wrapper = styled.div`
  height: 100vh;
  width: 50%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 3rem;
`;

BackgroundVisualization.propTypes = {
  stack: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(BackgroundVisualization);
