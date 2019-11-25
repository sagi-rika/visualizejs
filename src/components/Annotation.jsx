import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import error from '../assets/img/error.png';
import warning from '../assets/img/warning.png';
import info from '../assets/img/info.png';

const Annotation = ({ row, text, column, type }) => {
  let annotationImg;
  switch (type) {
    case 'error':
      annotationImg = error;
      break;
    case 'warning':
      annotationImg = warning;
      break;
    case 'info':
      annotationImg = info;
      break;
    default:
      annotationImg = '';
  }

  return (
    <>
      {annotationImg ? (
        <Div>
          <Img src={annotationImg} alt={type} title={type} />
        </Div>
      ) : (
        <Label>{type}</Label>
      )}
      <Label>{isNaN(row) ? row : row + 1}</Label>
      <Label>{column}</Label>
      <Text>{text}</Text>
    </>
  );
};

Annotation.propTypes = {
  row: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};

const Div = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.5rem;
  height: 2.5rem;
`;

const Label = styled.label`
  text-align: center;
  padding: 1rem 1.5rem;
`;

const Text = styled.p`
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 1rem 1.5rem;
`;

export default Annotation;
