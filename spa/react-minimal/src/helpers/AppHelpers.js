export function removeExtension(path) {
    let newPath = path;
    if (path.indexOf('.') > -1) {
        newPath = path.substr(0, path.lastIndexOf('.'));
    }
    return newPath;
}

/**
 * Is in the actual editor
 */
export function inAuthor() {
    return true;
    const ia = Boolean(window.parent && window.parent.mgnlRefresh);
    return ia;
}

/**
 * Is running on Magnolia server, either in editor or on public instance.
 */
export function onMagnolia() {
    //TODO, this should somehow actually detect if running in a magnolia instance.
    //Maybe just check path for existance of 'magnolia', or rely on an environment variable.
    const ia = Boolean(window.parent && window.parent.mgnlRefresh);
    return ia;
}

export function getAPIBase() {
    let M;
    if (Boolean(process.env.REACT_APP_MGNL_IS_PREVIEW)){
      M = process.env.REACT_APP_MGNL_BASE_AUTHOR;
    } else{
      M = process.env.REACT_APP_MGNL_BASE_PUBLIC;
    }
    let API_BASE = process.env.REACT_APP_MGNL_HOST + M ;
    return API_BASE;
}

