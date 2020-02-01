
const HOST = 'http://localhost:8080';
const MAGNOLIA_BASE = '/magnoliaAuthor';
const APP_BASE = '/react-sample';

const ENVIRONMENT = {
    host: HOST,
    magnoliaBase: MAGNOLIA_BASE,
    appBase: APP_BASE,

    contentUrl: `${HOST + MAGNOLIA_BASE}/.rest/delivery/pages/v1`,
    templateDefinitionUrl: `${HOST + MAGNOLIA_BASE}/.rest/templateDefinition/v1`,
    damRawUrl: HOST,
    navUrl: `${HOST + MAGNOLIA_BASE}/.rest/delivery/pagenav/v1`,
    staticFileUrl: `${HOST + MAGNOLIA_BASE}/.resources/webresources/static`
};

export default ENVIRONMENT;