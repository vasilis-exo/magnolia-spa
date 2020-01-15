import React from 'react';
import { Area } from 'react-magnolia';

const Contact = props => {
  const { main } = props;
  const boxStyle = {
    background: '#eaf7f5',
    padding: '20px'
  };

  return (
    <div className="Contact">
      <div className="box" style={boxStyle}>
        <h1>Nulla vitae elit libero, a pharetra augue.</h1>
      </div>
      {main && <Area {...main} />}
    </div>
  );
};

export default Contact;
