# This README is a work in progress

![The App](_dev/README-screenshot-app.png)

# Workarounds until React Library is published and fixed.

## Install helper libraries locally.
Clone frontend-helpers project library locally.
https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/)

Point the dependency in package.json of the react library (frontend-helpers/packages/react-editor/package.json) at *local* template annotations:
`    "@magnolia/template-annotations": "../template-annotations"`

`npm install ` and `npm run build` in the 'template-annotations' directory, and then in the 'react-editor' directory.

## Point SPA project at the local library.

Point the dependency in package.json of the react SPA project (spa/react-minimal/package.json) to the locally installed react-editor package:
 `   "@magnolia/react-editor": "[YOUR FULL PATH]/frontend-helpers/packages/react-editor/",`

## Notes

React library has a bug. For now - all areas, from all components, need to also be 
declared in the page template.
https://jira.magnolia-cms.com/browse/MGNLFE-20


# If you previously used the Professional Services PoC library.

You may have previously used the javascript libraries, and custom Java from Magnolia Professional Services department. If so, you may be interested in what has changed in the production implementation.

### Biggest differences to Services PoC library.

* Get the 6.2 snapshot using '-s', 'mgnl jumpstart -s'. (You don't need to drop in any additional JARS)
* You always get the template definitions from a new templateDefinitions endpoint.
* Page Template definitions must specify the exact resources to include (no wildcards), this means that create-react-app projects need to be configured to create the same filenames everytime. (Have a look at the 'deploy' npm script to see how this is done now.)
* The Page component from the libraries does not automatically instantiate 'mapped' frontend component, you need to do it in your project code. 


# Now, Get Started for Real!

## Requirements

- Java (JDK)

- [Magnolia CLI](https://www.npmjs.com/package/@magnolia/cli) installed ([installation documentation](https://documentation.magnolia-cms.com/display/DOCS/Magnolia+CLI+v3))

## Clone this repository
(Do it!)

## Install Magnolia with Magnolia CLI

In a terminal, navigate to the `magnolia` directory (we will refer to this as
"MAGNOLIA_INSTANCE_FOLDER" within this document) and run:

```
mgnl jumpstart -s
```

Choose `magnolia-community-demo-webapp` as the version to download.

(Magnolia is downloaded.)

## Add the demo light modules to Magnolia

Nothing to do here!
(The Magnolia instance is pre-configured to access the existing 'light-modules' directory.)

## Start Magnolia

From within your `MAGNOLIA_INSTANCE_FOLDER` start Magnolia with:

```
mgnl start
```

Once the terminal shows `Server startup in X ms`

In your browser, open Magnolia at:

```
http://localhost:8080/magnoliaAuthor/
```

## Accessing Magnolia
You can log in to Magnolia using the credentials `superuser/superuser`.
This will give you complete access to all content and configuration.

To access the apps that are mentioned in these instructions use the grid icon at the top of the page, to the right of the search bar.


### Configuring REST and DAM security
Note: the app will have anonymous access to Magnolia REST endpoints with no additional configuration because:
1. "Web access" is allowed, because the restEndpoint files are under the /delivery path
1. "Access contol list" access is allowed, beause the restEndponts have the `bypassWorkspaceAcls` property.

The primary endpoint is http://localhost:8080/magnoliaAuthor/.rest/delivery/pages/v1.
Opening this while not logged in will produce the log in page.

In order for image assets from the dam to be loaded and displayed, open the Security app, open the `Roles` tab, edit the `Anonymous` role, go to `Web access` tab, `Add new` with this path `/dam/*` set to GET.

![Image Access for Anonymous](_dev/README-security-anonymous-dam.png)


**NOTE** Allowing anonymous access may not be suitable for a production environment where you wish to keep data private.

## JavaScript front-end set up

Each demo contains:

- Basic page template
- Contact page template
- Header component
- Paragraph component
- Image component
- List component
- Item component (available inside List component)
- Expander component

To see the headless rendering system in use, we must create some example content.

### Configuring React

Build and deploy the React app to Magnolia to make it available for editing. Go to  `/spa/react-minimal` on the terminal and run `npm install` and then `npm run deploy`.

Once built, the app is deployed to `magnolia/light-modules/react-minimal-lm/webresources/`.

In the Pages app, either use the 'Import' action (with nothing selected) and select the file in `/magnolia/content-importer/website.react-sample.yaml`, or create new content with the following steps.

1. In the Pages app create a page called '*_react-sample_*' with the `React: Basic page` template.

1. In the Pages app, beneath 'react-sample', create a page called `contact` with the `React: Contact page` template.

1. Add some components to the pages. 

Build and start the headless React application inside `/spa/react-minimal` by running `npm start`.

View your Magnolia-managed content via http://localhost:3000/.






# MORE


## CORS set up

Because you installed the `magnolia-community-demo-webapp` bundle, CORS is already configured. Read on to learn how to configure it:
----
By default, Magnolia does not add any [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers to its responses.

However, since Magnolia will be on port 8080 with the React dev server is on port 3000, CORS must be configured.

Magnolia allows you to configure any number of
[Java servlet filters](https://www.oracle.com/technetwork/java/filters-137243.html) that can manipulate the HTTP
request/response and with a Magnolia-provided AddHeadersFilter we can set a generic "use anywhere" CORS header for the purpose of this demo.

**NOTE** As with the security config, such a wide-ranging approach to CORS may not be appropriate in production.

The AddHeadersFilter can be configured manually as [described in the documentation](https://documentation.magnolia-cms.com/display/DOCS61/Filters#Filters-AddingHTTPheaders)
or via the [supplied Groovy script](add-cors-filter.groovy).

## Security set up

By default, the author instance of Magnolia
(see: [Instances](https://documentation.magnolia-cms.com/display/DOCS61/Instances)) is restricted to authorised users.

For the purpose of this demo, we want to allow anonymous access to the REST endpoint describing the configured content.
(see: [Security](https://documentation.magnolia-cms.com/display/DOCS61/Security))

The endpoint is http://localhost:8080/magnoliaAuthor/.rest/pages.
Opening this while not logged in will produce the log in page.
