import React from 'react';
import ENVIRONMENT from '../environment';

const Image = props => 
    
<img className="Image" src={ENVIRONMENT.damRawUrl + props.image['@link']} alt="Etiam Purus" />


export default Image;
