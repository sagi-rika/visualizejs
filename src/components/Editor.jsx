import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import _ from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/snippets/javascript';
import 'ace-builds/src-min-noconflict/theme-tomorrow_night_bright';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-beautify';
import AceEditor from 'react-ace';
import Beautify from 'js-beautify';

import * as actions from '../store/actions';

class Editor extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { code } = this.props;
    if (code !== nextProps.code) {
      return true;
    }
    return false;
  }

  onChange = newValue => {
    const { updateCode } = this.props;
    updateCode(
      Beautify(newValue, {
        indent_size: 2,
        space_after_anon_function: true,
        space_after_named_function: true
      })
    );
  };

  render() {
    const { code } = this.props;

    return (
      <EditorWrapper>
        <AceEditor
          mode="javascript"
          value={code}
          theme="tomorrow_night_bright"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          fontSize={15}
          tabSize={2}
          enableBasicAutocompletion
          enableLiveAutocompletion
          style={{
            height: '100%',
            width: '100%'
          }}
          setOptions={{
            copyWithEmptySelection: true,
            fontFamily: '"Fira code", "Fira Mono", monospace',
            printMargin: 80,
            showPrintMargin: false
          }}
          debounceChangePeriod={1000}
          onLoad={this.onLoad}
        />
      </EditorWrapper>
    );
  }
}

const EditorWrapper = styled.div`
  height: 100vh;
  width: 50vw;
`;

const mapStateToProps = state => ({
  code: state.code.code
});

const mapDispatchToProps = dispatch => ({
  updateCode: newCode => dispatch(actions.updateCode(newCode))
});

Editor.propTypes = {
  code: PropTypes.string.isRequired,
  updateCode: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
