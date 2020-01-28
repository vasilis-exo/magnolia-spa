// In this sample code, we use this file to configure server URLs

const SERVER = 'http://localhost:8080';
const SERVER_PATH = '/magnoliaAuthor';
//const SERVER_PATH = '';

const ENVIRONMENT = {
    server: SERVER,
    serverPath: SERVER_PATH,
    restUrlBase: `${SERVER + SERVER_PATH}/.rest/delivery/pages`,
    templateDefinitionBase: `${SERVER + SERVER_PATH}/.rest/templateDefinition/v1`,
    
    damUrl: SERVER + SERVER_PATH,
    staticFilePath: `${SERVER + SERVER_PATH}/.resources/webresources/static`
};

export default ENVIRONMENT;