import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AceEditor from 'react-ace';
import * as actions from '../store/actions';

import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/snippets/javascript';
import 'ace-builds/src-min-noconflict/theme-tomorrow_night_bright';
import 'ace-builds/src-min-noconflict/ext-language_tools';

class Editor extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { code } = this.props;
    if (code !== nextProps.code) {
      return false;
    }
    return true;
  }

  onChange = newValue => {
    const { updateCode } = this.props;
    updateCode(newValue);
  };

  render() {
    return (
      <EditorWrapper>
        <AceEditor
          mode="javascript"
          theme="tomorrow_night_bright"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: true
          }}
          fontSize={15}
          tabSize={2}
          enableBasicAutocompletion
          enableLiveAutocompletion
          style={{
            height: '100%',
            width: '100%'
          }}
          setOptions={{
            copyWithEmptySelection: true
          }}
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
