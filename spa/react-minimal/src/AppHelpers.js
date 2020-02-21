export function removeExtension(path) {
    let newPath = path;
    if (path.indexOf('.') > -1) {
        newPath = path.substr(0, path.lastIndexOf('.'));
    }
    return newPath;
}

export function inAuthor() {
    //TODO, this should use the 'inEditor' library context value in the future.
    const ia = Boolean(window.parent);
    return ia;
}

