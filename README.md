# Minimal Headless SPA Demos

The new Visual SPA Editor allows authors to edit your SPA, reducing your ongoing maintenance duties. (win!) But you get to keep everything fully headless.

This demo shows you how to use the basic features for both React and Angular.

![The App](magnolia/_dev/README-screenshot-app.png)

## Pages and Components

The demo contains:

- Basic page template
- Contact page template

- Header component
- Paragraph component
- Image component
- List component
- Item component (available inside List component)
- Expander component

- Navigation component

# Setup

## Requirements

- Java (JDK)

- [Magnolia CLI](https://www.npmjs.com/package/@magnolia/cli) installed ([installation documentation](https://documentation.magnolia-cms.com/display/DOCS/Magnolia+CLI+v3))

## Install Magnolia with Magnolia CLI

In a terminal, navigate to the `magnolia` directory and run:

```
mgnl jumpstart -s
```

Choose `magnolia-community-demo-webapp` or `magnolia-dx-core-demo-webapp` as the version to download.

> Note: If you want to try the personalization feature - you will need `dx-core`. To get `dx-core` you will need an enterprise account, please contact Magnolia Sales team if you do not have one.
Additionally you will need the version 2.1.0 higher of the [personalization modules](https://docs.magnolia-cms.com/product-docs/6.2/Modules/List-of-modules/Personalization-module.html). 

(Magnolia is downloaded.)

## Add the demo light modules to Magnolia

Nothing to do here!
(The Magnolia instance is pre-configured to access the existing 'light-modules' directory.)

## Start Magnolia

From within the `magnolia` start Magnolia with:

```
mgnl start
```

Once the terminal shows `Server startup in X ms`

In your browser, open Magnolia at: http://localhost:8080/magnoliaAuthor/

## Accessing Magnolia

You can log in to Magnolia using the credentials `superuser/superuser`.
This will give you complete access to all content and configuration.

To access the apps that are mentioned in these instructions use the grid icon at the top of the page, to the right of the search bar.

## Configuring REST and DAM security

### DAM

In order for images to be displayed:
Open the Security app, open the `Roles` tab, edit the `anonymous` role, go to `Web access` tab, `Add new` with this path `/dam/*` set to GET.

![Image Access for Anonymous](magnolia/_dev/README-security-anonymous-dam.png)

# Deploy your SPA to Magnolia

Build and deploy the SPA to Magnolia to make it available for editing.

### React

Go to `/spa/react-minimal` on the terminal and run `npm install`, and then `npm run deploy:mgnl`.

Once built, check that the app is deployed to `magnolia/light-modules/react-minimal-lm/webresources/build`.

See the `.env` files for important configurations.

### Angular

Go to `/spa/angular-minimal` on the terminal and run `npm install`, and then `ng build --prod`.
(If you forget the '--prod', the paths to the js and css in the created index.html will be incorrect.)

Once built, check that the app is deployed to `magnolia/light-modules/angular-minimal-lm/webresources/build`.

See the files in `/src/environments` for important configurations.

### Vue

Go to `/spa/vue-minimal` on the terminal and run `npm install`, and then `npm run deploy:mgnl`.

Once built, check that the app is deployed to `magnolia/light-modules/vue-minimal-lm/webresources/dist`.

See the `.env` files for important configurations.

## Create some sample content

Either import some content, or create it manually.

### Import:

Use the 'Import' action (with nothing selected) and select the appropriate file from `/magnolia/_dev/content-to-import/`, either `website.react-minimal.yaml`, `website.angular-minimal.yaml` or `website.vue-minimal.yaml` .

### Manually:

Open the `Pages` app in Magnolia and add either

- A `React: Basic` page and name it `react-minimal`
- A `Angular: Basic` page and name it `angular-minimal`
- A `Vue: Basic` page and name it `vue-minimal`

> The page name is important as the SPA's are hardcoded to treat those names as the base of the app.

Then add components into the `Main` or `Extras` area of the page.
You can also add additional pages as children of that page.

## Running your SPA in development mode

### React

Build and start the headless React application inside `/spa/react-minimal` by running `npm start`.

### Angular

Build and start the headless Angular application inside `/spa/angular-minimal` by running `ng serve`.

### Vue

Build and start the headless Vue application inside `/spa/vue-minimal` by running `npm run serve`.

# Additional Information



## Security set up

For Magnolia version 6.2.5 and up see **Configure security** here [https://git.magnolia-cms.com/projects/DEMOS/repos/website-spa-demo/browse/README-local.md](https://git.magnolia-cms.com/projects/DEMOS/repos/website-spa-demo/browse/README-local.md).


By default, the author instance of Magnolia
(see: [Instances](https://docs.magnolia-cms.com/product-docs/Administration/Instances.html)) is restricted to authorised users.

For the purpose of this demo, we want to allow anonymous access to the REST endpoint describing the configured content.
(see: [Security](https://docs.magnolia-cms.com/product-docs/Administration/Security.html))

The endpoint is http://localhost:8080/magnoliaAuthor/.rest/pages.
Opening this while not logged in will produce the log in page.

### Content endpoint permissions

The app has anonymous access to Magnolia REST endpoints with no additional configuration because:

- "Web access" is allowed, because the restEndpoint files are under the `/delivery` path
- "Access contol list" access is allowed, beause the restEndponts have the `bypassWorkspaceAcls` property.

**NOTE** Allowing anonymous access may not be suitable for a production environment where you wish to keep data private.

### TemplateDefinitions Endpoint

If you want to debug the editing features when running the app outside of the Magnolia page editor, you will want permissions to the template-definitions endpoint:

Open the Security app, open the Roles tab, edit the `rest-anonymous` role, go to `Web access` tab, `Add new` with this path `/.rest/template-definitions*` set to GET.

(Perform similar steps if you would like to use the `template-annotations` endpoint.)


# Personalization Demo (Only available on DX-CORE)

Not available on Community Edition.

Currently, personalization feature demo is only available in `react-minimal` sample. 

[Overview of Magnolia Personalization](https://docs.magnolia-cms.com/product-docs/6.2/Features/Personalization.html)

## Demo Scenario

Show different content based on the age group of the visitor.
The information of the visitors age could come from anywhere, for example an external CDP, CRM, or Marketing automation system. 

For this simple demo, the visitor can enter thier age in a form on the page. The app stores their age as well as their age group (Child, Adult, Senior) in browser Session Storage. 

From then on, the app always includes an `X-Mgnl-Age` header (with the age group) in it's requests to the REST delivery endpoint.

Content authors have created content variants with different messages for each age group. They have selected an 'audience' for each variant based on the 'Age' trait configured on the system.

## Technical notes

- The trait is provisioned with `/light-modules/spa-lm/traits/x-mgnl-age.yaml`.
- The session value is set in `/spa/react-minimal/src/components/AgeForm.js`.
- The header is set in `/spa/react-minimal/src/helpers/PageLoader.js`.

## Setup - Create personalized content

Either import some content, or create it manually.

Open the `Pages` app in Magnolia and select the `react-minimal` page.

### Import:

Use the `Import` action, browse to `/magnolia/_dev/content-to-import/`, select `website.react-minimal.personalization.yaml` and import it.

### Manually:

Or instead of importing, 
- Use the `Add page` action.
- Choose the `React: Personalization` template and save.
- Create a component in the `Main` area.
- Use the `Add component variant` action and edit the component variant content.
- Use the `Choose audience` action.
- Under 'Choose traits of audience' click `Add`, pick the `Age (Minimal headless demo)` trait.
- In the new `Age` select box choose one of the ages.
- Repeat for other variants, ideally supplying one for the `Child`, `Adult`, and `Senior` traits.

## Usage

- Run the app outside of the Page Editor. (ie on the React dev server with http://localhost:3000) Enter your age to see personalized content.
- Use the Page Editor to edit the content of the variants. 
- Use the `Preview page` action to view *unpersonalized* content.
- Use the `Preview in tab` green button to see personalized content based on age form.
- Use the `Preview as visitor` to impersonate different users. For example use the `Add` action to add a user trait, like `Age`. 



