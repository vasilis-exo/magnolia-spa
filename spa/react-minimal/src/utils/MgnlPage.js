import React from 'react';
import {Page} from '@magnolia/react-renderer';
import config  from '../magnolia.config';


const MgnlPage = props => {
  // debugger;
  // if (!props){
  //   return null;
  // }

  const {content} = props;
  const templateId = content['mgnl:template'];
  console.log("templateId:" + templateId)
  const template = config[templateId];

  return (
  <Page {...props} >
    {template ? React.createElement(template, content) : <p>-</p>}
  </Page> 
  )

}

export default MgnlPage;
