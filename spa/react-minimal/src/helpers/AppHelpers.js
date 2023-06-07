import { EventEmitter } from 'events';

export const events = new EventEmitter();

export function getAPIBase() {
  let M;
  if (Boolean(process.env.REACT_APP_MGNL_IS_PREVIEW)) {
    M = process.env.REACT_APP_MGNL_BASE_AUTHOR;
  } else {
    M = process.env.REACT_APP_MGNL_BASE_PUBLIC;
  }
  let API_BASE = process.env.REACT_APP_MGNL_HOST + M;
  return API_BASE;
}

export function getLanguages() {
  return process.env.REACT_APP_MGNL_LANGUAGES.split(' ');
}