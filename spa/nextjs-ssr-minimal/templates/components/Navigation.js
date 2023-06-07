import React from "react";
import Link from "next/link";
import { languages } from "../../utils";
import { useRouter } from "next/router";

let NODE_NAME;
let BASENAME = "";

function renderLink(item) {
  return (
    <React.Fragment key={item["@id"]}>
      <Link href={BASENAME + item["@path"].replace(NODE_NAME, "") || "/"}>{item["@name"]}</Link>
      {item["@nodes"].length > 0 && item["@nodes"].map((nodeName) => renderLink(item[nodeName]))}
    </React.Fragment>
  );
}

function Navigation(props) {
  const router = useRouter();
  const { nodeName, content, currentLanguage } = props;

  const pathname = router.asPath;
  NODE_NAME = nodeName;
  BASENAME = currentLanguage === languages[0] ? "" : "/" + currentLanguage;

  return (
    <nav>
      {renderLink(content, currentLanguage)}
      {languages.map((language, i) => (
          <Link key={language} style={{padding: 'initial' }}  href={(i === 0 ? "" : "/" + language) + pathname.replace("/" + languages[1], "")}>
            <button>{language}</button>
          </Link>

      ))}
    </nav>
  );
}

export default Navigation;
