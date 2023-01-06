import React from "react";
import { Link } from "gatsby";

let NODE_NAME;
let BASENAME = "";
const languages = process.env.GATSBY_PUBLIC_MGNL_LANGUAGES.split(" ");

function changeLanguage(newLanguage, currentLanguage, pathname) {
	pathname = pathname.replace(new RegExp("/" + currentLanguage + "($|/)"), "/");

	if (languages[0] !== newLanguage) {
		if (pathname.indexOf(NODE_NAME) > -1) {
			pathname = pathname.replace(new RegExp(NODE_NAME), "/" + newLanguage + NODE_NAME);
		} else {
			pathname = "/" + newLanguage + pathname;
		}
	}

	return pathname;
}

function renderLink(item) {
	return (
		<React.Fragment key={item["@id"]}>
			<Link activeClassName="active" to={BASENAME + (item["@path"]?.replace(NODE_NAME, "") || "/")}>
				{item["@name"]}
			</Link>
			{item["@nodes"]?.length > 0 && item["@nodes"].map((nodeName) => renderLink(item[nodeName]))}
		</React.Fragment>
	);
}

function Navigation(props) {
	const { content, nodeName, currentLanguage, pathname } = props;

	NODE_NAME = nodeName;
	BASENAME = languages[0] === currentLanguage ? "" : "/" + currentLanguage;

	return (
		<nav>
			{renderLink(content, currentLanguage)}
			{languages.map((language) => (
				<Link activeClassName="active" key={language} to={changeLanguage(language, currentLanguage, pathname)}>
					{language}
				</Link>
			))}
		</nav>
	);
}

export default Navigation;
