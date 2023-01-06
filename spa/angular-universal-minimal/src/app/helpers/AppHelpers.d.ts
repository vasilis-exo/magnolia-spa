export function getLanguages(): Array<string>;

export function getCurrentLanguage(location: Location): string;

export function removeCurrentLanguage(
  string: string,
  currentLanguage: string
): string;

export function changeLanguage(newLanguage: string, location: Location): string;

export function getRouterBasename(location: Location): string;

export function getVersion(path: string): URLSearchParams;
