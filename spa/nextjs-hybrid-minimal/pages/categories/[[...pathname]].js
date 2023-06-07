import { EditablePage } from "@magnolia/react-editor";
import Navigation from "../../templates/components/Navigation";

import { config, getProps } from "../../utils";

export async function getServerSideProps(context) {
	return await getProps(context.resolvedUrl);
}

export default function SSRPathname(props) {
	const { page = {}, pagenav = {}, templateAnnotations = {}, magnoliaContext, nodeName } = props;
	return (
		<div className={magnoliaContext.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
			{pagenav && (
				<Navigation content={pagenav} nodeName={nodeName} currentLanguage={magnoliaContext.currentLanguage} />
			)}
			{page && (
				<EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />
			)}
		</div>
	);
}
