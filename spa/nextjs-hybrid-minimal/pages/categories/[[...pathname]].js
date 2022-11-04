import { EditablePage } from "@magnolia/react-editor";
import Navigation from "../../templates/components/Navigation";

import { config, getProps } from "../../utils";

export async function getServerSideProps(context) {
	return await getProps(context.resolvedUrl);
}

export default function SSRPathname(props) {
	const { page = {}, pagenav = {}, templateAnnotations = {}, magnoliaContext, nodeName } = props;
	global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;
	// In Pages app wait for template annotations before rendering EditablePage
	const shouldRenderEditablePage = page && (magnoliaContext.isMagnolia ? templateAnnotations : true);

	return (
		<div className={magnoliaContext.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
			{pagenav && (
				<Navigation content={pagenav} nodeName={nodeName} currentLanguage={magnoliaContext.currentLanguage} />
			)}
			{shouldRenderEditablePage && (
				<EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />
			)}
		</div>
	);
}
