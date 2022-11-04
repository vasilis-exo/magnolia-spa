import { EditablePage } from "@magnolia/react-editor";
import Navigation from "../../templates/components/Navigation";
import { nodeName, languages, config, pagenavApi, getProps } from "../../utils";

function getStaticPath(node, paths) {
	if (node["mgnl:template"].startsWith("nextjs-hybrid-minimal-lm:pages/ssg")) {
		let pathname = node["@path"].replace(nodeName, "");

		pathname = pathname.split("/");

		pathname.shift();

		languages.forEach((language, i) => {
			let i18nPathname = JSON.parse(JSON.stringify(pathname));

			if (i !== 0) i18nPathname.unshift(language);

			paths.push({ params: { pathname: i18nPathname } });
		});
	}

	node["@nodes"].forEach((nodeName) => getStaticPath(node[nodeName], paths));
}

export async function getStaticPaths() {
	let paths = [];

	const navRes = await fetch(pagenavApi + nodeName);
	const nav = await navRes.json();

	getStaticPath(nav, paths);

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	let resolvedUrl = context.params.pathname ? "/" + context.params.pathname.join("/") : "";
	if (context.preview) {
		const query = context.previewData.query;
		resolvedUrl = query.slug + resolvedUrl + "?mgnlPreview=" + query.mgnlPreview + "&mgnlChannel=" + query.mgnlChannel;
	}
	return await getProps(resolvedUrl);
}

export default function SSGPathname(props) {
	const { nodeName, page = {}, pagenav = {}, templateAnnotations = {}, magnoliaContext } = props;
	global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;
	return (
		<div className={magnoliaContext.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
			{pagenav && (
				<Navigation content={pagenav} nodeName={nodeName} currentLanguage={magnoliaContext.currentLanguage} />
			)}
			{page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}
		</div>
	);
}
