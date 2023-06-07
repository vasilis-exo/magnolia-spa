import { EditorContextHelper } from "@magnolia/react-editor";
export const languages = process.env.NEXT_PUBLIC_MGNL_LANGUAGES.split(' ');
export const nodeName = process.env.NEXT_APP_MGNL_SITE_PATH;
export const pagesApi = process.env.NEXT_APP_MGNL_API_PAGES;
export const templateAnnotationsApi = process.env.NEXT_APP_MGNL_API_TEMPLATES;
export const pagenavApi = process.env.NEXT_APP_MGNL_API_NAV;


export async function getProps(resolvedUrl) {
  const magnoliaContext = EditorContextHelper.getMagnoliaContext(resolvedUrl, nodeName, languages);
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

  global.mgnlInPageEditor = magnoliaContext.isMagnoliaEdit;

  return {
    props,
  };
}
