import React from "react";
import { EditablePage } from "@magnolia/react-editor";
import Navigation from "../templates/components/Navigation";
import Basic from "../templates/pages/Basic";
import Contact from "../templates/pages/Contact";
import Headline from "../templates/components/Headline";
import Image from "../templates/components/Image";
import Paragraph from "../templates/components/Paragraph";
import Expander from "../templates/components/Expander";
import List from "../templates/components/List";
import Item from "../templates/components/Item";
import { EditorContextHelper } from "@magnolia/react-editor";
import "../styles/globals.css";

const nodeName = process.env.NODE_NAME;
const config = {
	componentMappings: {
		"gatsby-minimal-lm:pages/basic": Basic,
		"gatsby-minimal-lm:pages/contact": Contact,

		"spa-lm:components/headline": Headline,
		"spa-lm:components/image": Image,
		"spa-lm:components/paragraph": Paragraph,
		"spa-lm:components/expander": Expander,
		"spa-lm:components/list": List,
		"spa-lm:components/listItem": Item,
	},
};

// Use different defaultBaseUrl to point to public instances
const languages = process.env.GATSBY_PUBLIC_MGNL_LANGUAGES.split(" ");
const defaultBaseUrl = process.env.GATSBY_PUBLIC_MGNL_HOST;
const pagesApi = defaultBaseUrl + "/.rest/delivery/pages/v1";
const templateAnnotationsApi = defaultBaseUrl + "/.rest/template-annotations/v1";
const pagenavApi = defaultBaseUrl + "/.rest/delivery/pagenav/v1";

function createPathWithQuery(path, query) {
	Object.entries(query).forEach(([key, value]) => {
		path += path.indexOf("?") > -1 ? "&" : "?";
		path += `${key}=${value}`;
	});

	return path;
}

export async function getServerData(context) {
	const resolvedUrl = createPathWithQuery("/" + context.params["*"], context.query);

	const magnoliaContext = EditorContextHelper.getMagnoliaContext(resolvedUrl, nodeName, languages);

	let props = {
		nodeName,
		magnoliaContext,
	};

	// Fetching page content
	const pagesRes = await fetch(pagesApi + magnoliaContext.nodePath + magnoliaContext.search);
	props.page = await pagesRes.json();

	// Fetching page navigation
	const pagenavRes = await fetch(pagenavApi + nodeName);
	props.pagenav = await pagenavRes.json();
	// Fetch template annotations only inside Magnolia WYSIWYG
	if (magnoliaContext.isMagnolia) {
		const templateAnnotationsRes = await fetch(templateAnnotationsApi + magnoliaContext.nodePath);
		props.templateAnnotations = await templateAnnotationsRes.json();
	}

	global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

	return {
		status: 200,
		headers: {},
		props: props,
	};
}

export default function Pathname({ serverData, location }) {
	const { page = {}, pagenav = {}, templateAnnotations = {}, magnoliaContext, nodeName } = serverData;

	return (
		<div className={magnoliaContext.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
			{pagenav && (
				<Navigation
					content={pagenav}
					nodeName={nodeName}
					languages={languages}
					currentLanguage={magnoliaContext.currentLanguage}
					pathname={location.pathname}
				/>
			)}
			{page && (
				<EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />
			)}
		</div>
	);
}
