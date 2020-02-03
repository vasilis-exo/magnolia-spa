# Workarounds until React Library is published and fixed.

Clone React library locally, build it locally, - and point directly to it from the React project package.json
https://git.magnolia-cms.com/projects/MODULES/repos/frontend-helpers/browse/packages/react-renderer


React library has a bug. For now - all areas, from all components, need to also be 
declared in the page template.
https://jira.magnolia-cms.com/browse/MGNLFE-20


# Biggest differences to Services library.
* Get the 6.2 snapshot using '-s', 'mgnl jumpstart -s'.
* You always get the template definitions from a new templateDefinitions endpoint.



# This README is a work in progress

## Requirements

- Java (JDK)

- [Magnolia CLI](https://www.npmjs.com/package/@magnolia/cli) installed ([installation documentation](https://documentation.magnolia-cms.com/display/DOCS/Magnolia+CLI+v3))

## Install Magnolia with Magnolia CLI

In a terminal, navigate to the 'magnolia directory (we will refer to this as
"MAGNOLIA_INSTANCE_FOLDER" within this document) and run:

```
mgnl jumpstart
```

Chose `magnolia-community-demo-webapp` as the version to install.


## Add the demo light modules to Magnolia

Nothing to do here!
The Magnolia instance is pre-configured to access the existing 'light-modules' directory.

## Start Magnolia

From within your `MAGNOLIA_INSTANCE_FOLDER` start Magnolia with:

```
mgnl start
```

In your browser open Magnolia at:

```
http://localhost:8080/magnoliaAuthor/
```

## Accessing Magnolia
You can log in to Magnolia using the credentials superuser/superuser.
This will give you complete access to all content and configuration.

To access the apps that are mentioned in these instructions use the grid icon at the top of the page, to the right of the search bar.

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

1. In the Pages app create a page called 'react-sample' with the `React: Basic page` template.

1. In the Pages app, beneath 'react-sample', create a page called `contact` with the `React: Contact page` template.

1. Add some components to the spa-lm page. 

1. Build and start the React application inside `/spa/react-minimal` by first running `npm install` and then `npm start`.

1. View your Magnolia-managed content via http://localhost:3000/.

1. Deploy the React app to the magnolia light-development directory by running `npm run deploy`.
> Once built, resulting files are moved to the `/magnolia/light-modules/react-minimal-lm/webresources/react-minimal` folder.
