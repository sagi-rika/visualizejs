import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CallStack from './CallStack';
import WebApis from './WebApis';

const BackgroundVisualization = ({ stack, apis }) => (
  <>
    <Wrapper>
      <CallStack stack={stack} />
      <WebApis apis={apis} />
    </Wrapper>
  </>
);

const mapStateToProps = state => ({
  stack: state.callStack.stack,
  apis: state.webApis.apis
});

const Wrapper = styled.div`
  display: flex;
  height: 70%;
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
