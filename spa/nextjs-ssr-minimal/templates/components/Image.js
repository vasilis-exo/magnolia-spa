import React from 'react';

const Image = props => 

<img className="Image" src={process.env.NEXT_PUBLIC_MGNL_HOST + props.image['@link']} alt="Etiam Purus" />


export default Image;
