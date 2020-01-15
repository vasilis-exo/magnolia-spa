## Requirements

- [Magnolia CLI](https://www.npmjs.com/package/@magnolia/cli) installed ([installation documentation](https://documentation.magnolia-cms.com/display/DOCS/Magnolia+CLI+v3))
- Magnolia account (Contact an account or customer success manager)
- [magnolia-services-licence-1.0.2](https://nexus.magnolia-cms.com/service/local/repositories/magnolia.incubator.releases/content/info/magnolia/magnolia-services-licence/1.0.2/magnolia-services-licence-1.0.2.jar) module
- [magnolia-headless-rendering-1.0.5](https://nexus.magnolia-cms.com/service/local/repositories/magnolia.incubator.releases/content/info/magnolia/rendering/magnolia-headless-rendering/1.0.5/magnolia-headless-rendering-1.0.5.jar) module

> You will need your Magnolia account credentials to download modules.

## Install Magnolia DX Core with Magnolia CLI

Navigate to a folder you would like to keep your Magnolia instance within (we will refer to this as
"MAGNOLIA_INSTANCE_FOLDER" within this document) and run:

```
mgnl jumpstart
```

Chose `magnolia-dx-core-webapp` as the version to install.

> You will need your Magnolia account credentials to install this version. Enter them when prompted.

Copy `magnolia-services-licence-1.0.2` and `magnolia-headless-rendering-1.0.5` to:

```
<MAGNOLIA_INSTANCE_FOLDER>/apache-tomcat/webapps/magnoliaAuthor/WEB-INF/lib/
```

## Add the demo light modules to Magnolia

Clone this project to a folder of your choice.

Create a symbolic link to this repository folder from within:

```
<MAGNOLIA_INSTANCE_FOLDER>/light-modules/
```

This will allow Magnolia to access the templates and config we have provided in both the React and Vue demo projects

## Start Magnolia

From within your `MAGNOLIA_INSTANCE_FOLDER` start Magnolia with:

```
mgnl start
```

In your browser open Magnolia at:

```
http://localhost:8080/magnoliaAuthor/
```

> You will need you Magnolia DX Core license to access the instance. Enter the licence key and owner when prompted.

## Accessing Magnolia
You can log in to Magnolia using the credentials superuser/superuser.
This will give you complete access to all content and configuration.

To access the apps that are mentioned in these instructions use the grid icon at the top of the page, to the right
of the search bar.

## Base URL set up

In order to generate absolute URLs, Magnolia must know the domain on which it is running.

### Configuring the base URL 
Open the Configuration app, expend the `server` node and set the property `defaultBaseUrl` to the URL of
your Magnolia instance (double click the text to edit).

In this case use, `http://localhost:8080/magnoliaAuthor/`

## Security set up

By default, the author instance of Magnolia
(see: [Instances](https://documentation.magnolia-cms.com/display/DOCS61/Instances)) is restricted to authorised users.

For the purpose of this demo, we want to allow anonymous access to the REST endpoint describing the configured content.
(see: [Security](https://documentation.magnolia-cms.com/display/DOCS61/Security))

The endpoint is http://localhost:8080/magnoliaAuthor/.rest/pages.
Opening this while not logged in will produce the log in page.

### Configuring security
1. Open the "Security" app by clicking its icon.

1. Open the "Roles" tab inside the Security app and double click the "rest-anonymous" role to open it for editing.

1. Under the "Access control lists" tab, scroll down to "Website" and set the options to: ```Read-only```, ```Selected and sub nodes``` and enter a single slash, ```/```, in the text field.

1. Under the "Web access" tab, add a new entry granting `Get` access to `/.rest/pages*`.

1. Save your changes and try again with the endpoint URL. You should now see some JSON output.

**NOTE** Allowing anonymous access may not be suitable for a production environment where you wish to keep data private.

## CORS set up

By default, Magnolia does not add any [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers to its responses.

However, as applications running on different ports are considered to be different origins and Magnolia will be on
port 8080 with the example React application on port 3000, CORS must be configured.

Magnolia allows you to configure any number of
[Java servlet filters](https://www.oracle.com/technetwork/java/filters-137243.html) that can manipulate the HTTP
request/response and with a Magnolia-provided AddHeadersFilter we can set a generic "use anywhere" CORS header for the purpose of this demo.

**NOTE** As with the security config, such a wide-ranging approach to CORS may not be appropriate in production.

The AddHeadersFilter can be configured manually as [described in the documentation](https://documentation.magnolia-cms.com/display/DOCS61/Filters#Filters-AddingHTTPheaders)
or via the [supplied Groovy script](add-cors-filter.groovy).

### Configuring CORS
1. Log in to Magnolia and open the Groovy app. (Grouped under "Dev")
1. Click "Add script"
1. Copy and paste the supplied script into the script field.
1. Click the "Run" button.

You should now see some simple, catch-all CORS headers in your responses. If this is not enough, you can edit the properties provided.

As every request must go through the filter chain, this will add the headers to the REST endpoint's responses. This can be restricted to certain paths and types by use of the bypasses and voter mechanisms you will see in the existing filters and as documented.

## JavaScript front-end set up

Each demo contains:

- Default page template
- Contact page template
- Header component
- Paragraph component
- Image component
- List component
- Item component (available inside List component)

To see the headless rendering system in use, we must create some example content.

### Configuring React

1. In the Pages app create a page called `spa-lm` with the `React: Default page` template.

1. In the Pages app, beneath `spa-lm`, create a page called `contact` with the `React: Contact page` template.

1. Add some components to the spa-lm page. 

1. Build and start the React application inside `webresources-src` by first running `npm install` and then `npm start`.

1. View your Magnolia-managed content via http://localhost:3000/spa-lm.

> Source code for the app can be found in `webresources-src`.
> Once built, resulting files need to be moved to the `webresources` folder.

### Configuring Vue.js

1. In the Pages app create a page called `vue-demo` with the `Vue: Default page` template.

1. In the Pages app, under `vue-demo`, create a page called `contact` with the `Vue: Contact page` template.

1. Add some components to the vue-demo page.

1. Build and start the Vue.js application inside `webresources-src` by first running `npm install` and then
`npm run-script serve`.

1. View your Magnolia-managed content via http://localhost:8081/vue-demo

> Source code for the app can be found in `webresources-src`.
> Once built, resulting files need to be moved to the `webresources` folder.
