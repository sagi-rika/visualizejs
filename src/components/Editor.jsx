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
import StatusBar from './StatusBar';

class Editor extends React.Component {
  state = {
    code: `function myFn(test) {
  console.log(test);
  const a = 2;
}
const myVar = 'Test String!';
myFn(myVar);`,
    annotations: [],
    isOpen: false,
    cursor: {}
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.state) === JSON.stringify(nextState) &&
      JSON.stringify(this.props) === JSON.stringify(nextProps)
    ) {
      return false;
    }
    return true;
  }

  onValidate = annotations => {
    let { isOpen } = this.state;
    if (!annotations.length) isOpen = false;

    this.setState({
      annotations: [...annotations],
      isOpen
    });
  };

  closeModal = () => this.setState({ isOpen: false });

  onChange = newCode => {
    this.setState({ code: newCode });
  };

  exec = () => {
    const { instrument } = this.props;
    const { code, annotations } = this.state;
    if (annotations.filter(annotation => ['error', 'warning'].includes(annotation.type)).length) {
      this.setState({ isOpen: true });
      return;
    }
    instrument(code);
  };

  render() {
    const { code, annotations, isOpen, cursor } = this.state;
    const { activeLineMarker } = this.props;

    return (
      <EditorWrapper>
        <AceEditor
          mode="javascript"
          value={code}
          theme="tomorrow_night_bright"
          onChange={this.onChange}
          onCursorChange={({ cursor }) =>
            this.setState({ cursor: { row: cursor.row + 1, col: cursor.column } })
          }
          name="UNIQUE_ID_OF_DIV"
          fontSize={15}
          tabSize={2}
          enableBasicAutocompletion
          enableLiveAutocompletion
          onValidate={this.onValidate}
          markers={[activeLineMarker]}
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
        <StatusBar cursor={cursor} />
      </EditorWrapper>
    );
  }
}

const EditorWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 50vw;
`;

const mapStateToProps = state => ({
  activeLineMarker: state.code.activeLine
});

const mapDispatchToProps = dispatch => ({
  instrument: code => dispatch(actions.instrument(code))
});

Editor.propTypes = {
  instrument: PropTypes.func.isRequired,
  activeLineMarker: PropTypes.shape({
    startRow: PropTypes.number,
    startColumn: PropTypes.number,
    endRow: PropTypes.number,
    endColumn: PropTypes.number
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
