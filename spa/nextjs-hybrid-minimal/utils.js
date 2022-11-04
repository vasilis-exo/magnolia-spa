import { EditorContextHelper } from "@magnolia/react-editor";
import Basic from "./templates/pages/Basic";
import Contact from "./templates/pages/Contact";
import Headline from "./templates/components/Headline";
import Image from "./templates/components/Image";
import Paragraph from "./templates/components/Paragraph";
import Expander from "./templates/components/Expander";
import List from "./templates/components/List";
import Item from "./templates/components/Item";

export const nodeName = process.env.NEXT_APP_MGNL_SITE_PATH;
export const pagesApi = process.env.NEXT_APP_MGNL_API_PAGES;
export const templateAnnotationsApi = process.env.NEXT_APP_MGNL_API_TEMPLATES;
export const pagenavApi = process.env.NEXT_APP_MGNL_API_NAV;
export const languages = process.env.NEXT_PUBLIC_MGNL_LANGUAGES.split(" ");

export const config = {
	componentMappings: {
		"nextjs-hybrid-minimal-lm:pages/ssr-categories": Basic,
		"nextjs-hybrid-minimal-lm:pages/ssg-basic": Basic,
		"nextjs-hybrid-minimal-lm:pages/ssg-contact": Contact,

		"spa-lm:components/headline": Headline,
		"spa-lm:components/image": Image,
		"spa-lm:components/paragraph": Paragraph,
		"spa-lm:components/expander": Expander,
		"spa-lm:components/list": List,
		"spa-lm:components/listItem": Item,
	},
};

export async function getProps(resolvedUrl) {
	const magnoliaContext = EditorContextHelper.getMagnoliaContext(resolvedUrl, nodeName, languages);
	delete magnoliaContext.version;
	//
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

	global.mgnlInPageEditor = props.isPagesAppEdit;

	return {
		props,
	};
}
