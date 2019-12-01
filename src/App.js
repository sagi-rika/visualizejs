import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { astWalk } from './utils/walk';
import Editor from './components/Editor';

const App = () => {
  return (
    <div className="App">
      <Editor />
    </div>
  );
};

App.propTypes = {
  code: PropTypes.string
};

const mapStateToProps = state => ({
  code: state.code.code
});

export default connect(mapStateToProps)(App);
