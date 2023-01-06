import { environment } from "src/environments/environment";

export function getLanguages() {
  return environment.languages;
}

export function getCurrentLanguage(location) {
  const languages = getLanguages();

  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (new RegExp("/" + language + "($|/)").test(location.pathname)) {
      return language;
    }
  }

  return languages[0];
}

export function removeCurrentLanguage(string, currentLanguage) {
  return string.replace(new RegExp("/" + currentLanguage + "($|/)"), "/");
}

export function changeLanguage(newLanguage, location) {
  const nodeName = environment.rootPath;
  const languages = getLanguages();
  let pathname = location.pathname;
  const currentLanguage = getCurrentLanguage(location);
  pathname = removeCurrentLanguage(pathname, currentLanguage);

  if (languages[0] !== newLanguage) {
    if (pathname.indexOf(nodeName) > -1) {
      pathname = pathname.replace(
        new RegExp(nodeName),
        "/" + newLanguage + nodeName
      );
    } else {
      pathname = "/" + newLanguage + pathname;
    }
  }

  return pathname;
}

export function getRouterBasename(location) {
  const nodeName = environment.rootPath;
  const languages = getLanguages();
  var pathname = location.pathname;

  if (pathname.indexOf(nodeName) > -1) {
    return pathname.replace(new RegExp(nodeName + ".*"), "") + nodeName;
  }

  const currentLanguage = getCurrentLanguage(location);

  return languages[0] === currentLanguage ? "/" : "/" + currentLanguage;
}

export function getVersion(path) {
  return new URLSearchParams(path).get("mgnlVersion");
}
