import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Annotation from '../Annotation';

Modal.setAppElement('#root');

const annotationTypeVals = {
  error: 0,
  warning: 1,
  info: 2
};

const AnnotationsModal = ({ annotations, opened, onClose }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#fdf5e3'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }
  };

  return (
    <Modal isOpen={opened} onRequestClose={onClose} style={customStyles} closeTimeoutMS={150}>
      <Header>Fix your errors first, silly.</Header>
      <Grid rows={annotations.length}>
        <Annotation row="Row" type="Type" column="Col" text="Text" />
        {annotations
          .sort((a, b) => annotationTypeVals[a.type] - annotationTypeVals[b.type])
          .map(annotation => (
            <Annotation key={annotation.row + annotation.col + annotation.raw} {...annotation} />
          ))}
      </Grid>
    </Modal>
  );
};

AnnotationsModal.propTypes = {
  annotations: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      raw: PropTypes.string.isRequired
    })
  ),
  opened: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

const Grid = styled.div`
  display: grid;
  grid-template-rows: ${({ rows }) => `repeat(${rows}, auto)`};
  grid-template-columns: repeat(4, auto);
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;

  & > * {
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
  }
`;

const Header = styled.h2`
  font-size: 2.5rem;
  line-height: 1.6;
  font-weight: 300;
`;

export default AnnotationsModal;
