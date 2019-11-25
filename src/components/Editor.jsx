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
import Modal from './Modals/AnnotationsModal';

class Editor extends React.Component {
  state = {
    code: '',
    annotations: [],
    isOpen: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
      return false;
    }
    return true;
  }

  onValidate = annotations => {
    this.setState({
      annotations: [...annotations]
    });
  };

  closeModal = () => this.setState({ isOpen: false });

  onChange = newCode => {
    this.setState({ code: newCode });
  };

  exec = () => {
    const { run } = this.props;
    const { code, annotations } = this.state;
    if (annotations.filter(annotation => ['error', 'warning'].includes(annotation.type)).length) {
      this.setState({ isOpen: true });
      return;
    }
    run(code);
  };

  render() {
    const { code, annotations, isOpen } = this.state;

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
          onValidate={this.onValidate}
          style={{
            height: '100%',
            width: '100%',
            background: '#222'
          }}
          setOptions={{
            copyWithEmptySelection: true,
            fontFamily: '"Fira code", "Fira Mono", monospace !important',
            printMargin: 80,
            showPrintMargin: false
          }}
          onLoad={this.onLoad}
          commands={[
            {
              name: 'run',
              exec: this.exec,
              bindKey: { win: 'Alt-Return', mac: 'Command-Return' }
            },
            {
              name: 'beautify',
              exec: () => {
                const { code: uglyCode } = this.state;
                const beautifulCode = Beautify(uglyCode, {
                  indent_size: 2,
                  space_after_anon_function: true,
                  space_after_named_function: true
                });
                this.setState({
                  code: beautifulCode
                });
              },
              bindKey: { win: 'Alt-J', mac: 'Alt-Shift-F' }
            }
          ]}
        />
        <Modal annotations={annotations} opened={isOpen} onClose={this.closeModal} />
      </EditorWrapper>
    );
  }
}

const EditorWrapper = styled.div`
  height: 100vh;
  width: 50vw;
`;

const mapDispatchToProps = dispatch => ({
  run: code => dispatch(actions.run(code))
});

Editor.propTypes = {
  run: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Editor);
