import React from 'react';
import Link from 'next/link';

let NODE_NAME;

function renderLink(item) {
  return (
    <>
      <Link href={item['@path'].replace(NODE_NAME, '') || '/'}>
        <a>{item['@name']}</a>
      </Link>
      {item['@nodes'].length > 0 && item['@nodes'].map((nodeName) => renderLink(item[nodeName]))}
    </>
  );
}

function Navigation(props) {
  const { content, nodeName } = props;

  NODE_NAME = nodeName;

  return <nav>{renderLink(content)}</nav>;
}

export default Navigation;
