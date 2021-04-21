/* eslint-disable no-console */

/* Get the path of an item relative to it's page.

For example if a component is /myproject/mypage/area/comp2,
then it will return just /area/comp2.
*/
export function getRelativePath(path, serverPath, rootCmsPath, inPageEditor) {
  if (inPageEditor) {
    console.log(`NAV: inPageEdigtor:${serverPath}${path}`);
    return serverPath + path;
  }
  console.log('NAV: Not in page editor.');
  // Just strip off the pathOfPage. We assume it is the correct path root.
  const relativePath = path.substr(rootCmsPath.length);
  return relativePath;
}

export function getLink(path, serverPath, rootCmsPath, inPageEditor) {
  let link = getRelativePath(path, serverPath, rootCmsPath, inPageEditor);
  if (inPageEditor) {
    // link += rootCmsPath;
    link += '.html';
  }
  return link;
}

export function removeExtension(path) {
  let newPath = path;
  if (path.indexOf('.') > -1) {
    newPath = path.substr(0, path.lastIndexOf('.'));
  }
  return newPath;
}

export function getRootPath(path) {
  const paths = removeExtension(path).split('/');
  if (paths.length < 2) {
    return path;
  }
  return `/${paths[1]}`;
}

export function getVersion(path) {
  return new URLSearchParams(path).get('mgnlVersion');
}













//OLDER

export function getLanguages() {
  return process.env.VUE_APP_MGNL_LANGUAGES.split(' ');
}

export function removeCurrentLanguage(string, currentLanguage) {
  return string.replace(new RegExp('/' + currentLanguage + '($|/)'), '/');
}

export function getCurrentLanguage() {
  const languages = getLanguages();

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (new RegExp('/' + language + '($|/)').test(window.location.pathname)) {
      return language;
    }
  }

  return languages[0];
}

export function changeLanguage(newLanguage) {
  const nodeName = process.env.VUE_APP_MGNL_SITE_PATH;
  const languages = getLanguages();
  let pathname = window.location.pathname;
  const currentLanguage = getCurrentLanguage();
  pathname = removeCurrentLanguage(pathname, currentLanguage);

  if (languages[0] !== newLanguage) {
    if (pathname.indexOf(nodeName) > -1) {
      pathname = pathname.replace(new RegExp(nodeName), '/' + newLanguage + nodeName);
    } else {
      pathname = '/' + newLanguage + pathname;
    }
  }

  return pathname + window.location.search;
}

export function getRouterBasename() {
  const nodeName = process.env.VUE_APP_MGNL_SITE_PATH;
  const languages = getLanguages();
  var pathname = window.location.pathname;

  if (pathname.indexOf(nodeName) > -1) {
    return pathname.replace(new RegExp(nodeName + '.*'), '') + nodeName;
  }

  const currentLanguage = getCurrentLanguage();

  return languages[0] === currentLanguage ? '/' : '/' + currentLanguage;
}











