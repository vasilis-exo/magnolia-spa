import React from 'react';
import Link from 'next/link';

function renderLink(item) {
  return (
    <>
      <Link href={item['@path']}>
        <a>{item['@name']}</a>
      </Link>
      {item['@nodes'].length > 0 && item['@nodes'].map((nodeName) => renderLink(item[nodeName]))}
    </>
  );
}

function Navigation(props) {
  const { content } = props;

  return <nav>{renderLink(content)}</nav>;
}

export default Navigation;
