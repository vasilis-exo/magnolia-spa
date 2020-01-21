import React from 'react';
import ENVIRONMENT from '../environment';

const Image = props => 
    
<img className="Image" src={ENVIRONMENT.server + props.image['@link']} alt="Etiam Purus" />


export default Image;
