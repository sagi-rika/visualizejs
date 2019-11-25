import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { astWalk } from './utils/walk';
import Editor from './components/Editor';

const App = ({ tree }) => {
  useEffect(() => {
    if (tree) {
      astWalk(tree);
    }
  }, [tree]);

  return (
    <div className="App">
      <Editor />
    </div>
  );
};

App.propTypes = {
  tree: PropTypes.shape()
};

const mapStateToProps = state => ({
  tree: state.code.tree
});

export default connect(mapStateToProps)(App);
