# 📜 COOEE Exam

> Boilerplate from https://github.com/covalence-io/barebones-react-typescript-express#-purpose

## 📁 Table of Contents

-   [👟 Running the Project](#-running-the-project)
-   [💬 Server](#-server)
-   [💻 Client](#-client)
    -   [🙌 Styling the App](#-styling-the-app)
-   [🗄️ Configuration Files](#%EF%B8%8F-configuration-files)


## 👟 Running the Project

If you already know the process of cloning a repository then follow the normal process and use the script `npm run dev` to get up and going!

If you're new or are interested in the steps and their purpose, then let's dive on in!

&nbsp;

First:

```bash
git clone https://github.com/covalence-io/barebones-react-typescript-express.git
```

&nbsp;

Second:

```bash
npm install
```

-   Note that sometimes you'll see security vulnerabilities. These will come and go and thankfully are easy to fix. `npm audit fix` can do so by updating an out-of-date package to a new version. However, alot of these free packages are written in the spare time of other developers and you're at the mercy of waiting for them to fix the vulnerability.

&nbsp;

Third:

```bash
npm run dev
```

-   This script will utilize `nodemon` to auto-restart your Express server, meaning any server side code you write and save will trigger a recompile, rebundle, and re-run of the server! No need to stop and restart it over and over again.
-   Notice in the `package.json` that `dev` runs `"npm-run-all --parallel watch:*"` as the actual command. It's what fires up 1) `webpack` to compile and bundle our code and 2) run `nodemon` when the server finishes building!
    -   The `npm-run-all` lets us run run multiple npm-scripts in parallel or sequentialy.
    -   `--parallel` means we run two npm-scripts at the same time.
    -   `watch:*` references any other script starting with `watch:`, check out the two in our `package.json`! They are `watch:build` and `watch:server`.
        -   `watch:build` will tell webpack to compile and bundle our `src/client` folder as all of our React app and output it to `public/js/app.js`. It will also follow the same process for `src/server` and output it to `dist/server.js`
        -   `watch:server` watches the `dist/server.js` for changes and that's how it auto-restarts the server! Unfortunately you'll have to refresh your browser to see any React app changes.

&nbsp;

**The server will start on port 3000 (http://localhost:3000)**

&nbsp;

Optionally:

```bash
npm run start
```

We will use this script in production. We don't need all the auto-restart stuff from the `watch:*` scripts we discussed up above. Just start the server and be done with it.

-   This assumes you have a `dist/server.js` and `public/js/app.js` already built.

&nbsp;

## 💬 Server

The server build process compiles the TypeScript files found in `src/server` into a single bundled JavaScript file (`server.js`) located in the `dist` directory, which is created for us during the process.

This will be where we code all things relating to our database, whether SQL or NoSQL. It's where we'll include all of our REST API routes. All of our back-end utilities. While there are tricks to share its code, we **will not be sharing** any code from our `src/server` folder into `src/client`. If you find yourself wanting to import anything directly to your client code _from_ your server code. ✋ Stop ✋ and rethink how you're trying to solve this problem. For all intents and purposes back-end and front-end are entirely separate realms of existence.

&nbsp;

## 💻 Client

The client build process compiles the TypeScript files found in `src/client` into a single bundled JavaScript file (`app.js`) located in the `public/js/` directory, which is created for us during the process.

This will be where we code all things related to our React app and what a user will see and interact with in the browser. That's it. If it needs to ask for any information on the back-end, you will 99% of the time do so via a `fetch` request that hits one of your REST API endpoints.

&nbsp;

#### 🙌 Styling the App

The `src/client` configuration will also build the SASS files found at `src/client/scss` directory. The `index.tsx` imports the `app.scss` file which already includes an import for Bootstrap v4. Notice how the Bootstrap import in the `src/client/scss/app.scss` file is at the _bottom_ of the file. This is because our expected overrides are expected above that import.

Thankfully, you can write normal CSS just as you like! Add class selectors, element selecotrs, and id selectors. There are, however, several SASS tricks you can research on Google, Stack Overflow, Youtube, and etc. Covalence thanks to Matt Landers has two entry-level videos discussing SASS and its advantages over regular CSS:

-   [Let's Get Sassy](https://youtu.be/s9mkU-a0nPo) which is an intro to SASS as a concept, its advantages over regular CSS, how to add it to a project (remember you don't need to do that here), and some tricks to using it.
-   [Overriding Bootstrap Variables](https://youtu.be/QP3fG31CdMg) which goes over the basics of ... overriding Bootstrap variables! You'll notice this boilerplate already provides a basic example of that:

```sass
// First override some or all individual color variables
$primary: #25408f;
$secondary: #8f5325;
$success: #3e8d63;
$info: #13101c;
$warning: #945707;
$danger: #d62518;
$light: #f8f9fa;
$dark: #343a40;

// Then add them to your custom theme-colors map, together with any additional colors you might need
$theme-colors: (
  primary: $primary,
  secondary: $secondary,
  success: $success,
  info: $info,
  warning: $warning,
  danger: $danger,
  light: $light,
  dark: $dark,
  // add any additional color below
);
```

This takes the **all** Bootstrap variables _anywhere_ you use it and replaces it with a new color code! Add `bg-primary`, `text-primary`, and `border-primary` to some elements in your TSX and notice how the regular deep blue Bootstrap color is now replaced by our custom one. You can override all the color-specific keywords using this to add your own custom feel to your React Bootstrap app!

&nbsp;

## 🗄️ Configuration Files

-   `.gitignore` is what we use to **not** push certain files or folders to GitHub. This starts with our dependencies and production bundles being ignored. Feel free to add any file that contains sensitive information away from GitHub using this. A common addition would be a `.env` file, for example, that contains our 3rd Party API Keys.

-   `package-lock.json` is automatically generated whenever you run a command that modifies `node_modules` or `package.json`. It describes the exact modification that was made, such that subsequent installs (like you cloning this boilerplate and installing modules! 😊) are able to generate identical modifications, regardless of intermediate dependency updates.

-   `package.json` you've seen this one a lot, it's the basic "metadata" relevant to the project and it is used for managing the project's dependencies, scripts, version and a whole lot more.

-   `README.md` the markdown file that displays here in GitHub that you're reading right now. And what I probably use as my "lecture" notes during my videos!

-   `tsconfig.client.json` the TypeScript rules our TSC compiler will follow and allow when building our React app. There are several options to play with to standarize `import` statements, allow the use of `any` (don't do this though lol), but make sure not to remove `"jsx": "react",` by mistake or it won't know what you're trying to write in those `.tsx` files!

-   `tsconfig.server.json` the same as above, basically, except for our server code. We tell it to include the types for `node` and `express` so it can help us write the basics of our server with improved intellisense support and less manual strong typing. Basically it makes our TSC "infer" some of the basic server types for us automatically.

-   `webpack.config.js` the rules, loaders, and plugins our entire build process follows.