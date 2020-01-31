export function removeExtension(path) {
    let newPath = path;
    if (path.indexOf('.') > -1) {
        newPath = path.substr(0, path.lastIndexOf('.'));
    }
    return newPath;
}

export function inAuthor() {
    return window.parent.mgnlRefresh !== undefined
}

