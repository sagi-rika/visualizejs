import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Worker from './plugins/worker';
import Editor from './components/Editor';

const App = ({ instrumented }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (instrumented) window.worker = Worker(instrumented, dispatch);
  }, [instrumented, dispatch]);
  return (
    <div className="App">
      <Editor />
    </div>
  );
};

const mapStateToProps = state => ({
  instrumented: state.code.instrumented
});

App.propTypes = {
  instrumented: PropTypes.shape({
    chunks: PropTypes.arrayOf(PropTypes.string),
    toString: PropTypes.func,
    inspect: PropTypes.func
  })
};

export default connect(mapStateToProps)(App);
