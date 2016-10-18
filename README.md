
# Alpha warning!

This project is only just being started. It is not yet ~~properly configured to be used as an npm module, nor is it~~ available via npm.

Pull requests, ideas, suggestions, and help are all welcome!

A short list of things which are out of place, missing, or extra, that need fixed before an initial publish to npm:
- PictureWidget is just for test/demo purposes. It will be moved into a demo directory eventually.
- ~~There is no release build configuration setup. Right now an ejected create-react-app project just builds the demo from /src/index.js.~~ [Build instructions!](#contributing-and-development)
- SIGNIFICANT FUNCTIONALITY
- Documentation for the SIGNIFICANT FUNCTIONALITY

# React Dashboard

React Dashboards is a small framework for displaying user-configurable, multi-widget layouts. The goal is to be very easy to get started with ("batteries-included"), but to also allow a high level of customization.

Eventually, you will install react-dashboards with something like `npm install --save @samsch/react-dashboards`. If the project really takes off, it might get transfered to a top level npm name such as `react-dashboards`.

For now, you can install via npm with `npm install --save git+https://git@github.com/samsch/react-dashboards.git`.

Then use it like this:
```js
const Dashboard = require('react-dashboards');

const dashboardLayout = [ ... ];
const dashboardWidgets = { ... };

const MyComponent = props => (
  <div>
    <Dashboard layout={dashboardLayout} widgets={dashboardWidgets} />
  </div>
);
```

# Contributing and development

To build for npm, use `npm run build-npm`. That will run babel against the js/jsx files in `srv/Dashboard/`, with the compiled output landing in `lib/`.

To start the development server, run `npm start`. This server is based off of and mostly comprised of the scripts ejected from create-react-app. The entry point is `src/index.js`. It is configured to support sass files as well as css files.

## Currently implemented layout system

You can pass a `widgets` prop with properties [topLeft, topCenter, topRight, bottomLeft, bottomRight], and values that are components. The components will be rendered into the five locations.

You can also pass a `layout` prop, which requires a `mode` property. Currently, `absolute` and `flex` are defined, with flex being similar to the previous iteration (and using widget property names which represent the widgets rather than point to a location). I think going forward, these layout systems will be pulled into "plugins" to keep the library modular. The flex model may be dropped for now, as the absolute model gives the structured layout I'm interested in. The only problem with the absolute model currently is dealing with large variations in screen size.

The Dashboard has a default absolute layout setup for when you don't pass one in (giving you the usable property names listed above).

The absolute layout looks like this:
```js
layout: {
  mode: 'absolute',
  segments: [
    {
      id: 'topLeft',
      top: 0,
      left: 0,
      height: 50,
      width: 33.33,
    },
    {
      id: 'bottomRight',
      top: 50,
      left: 62,
      height: 50,
      width: 38,
    },
  ],
},
```
You would usually have more locations, but this gives the idea. The current model will take the numbers and use those as percentages with .5rem added (using css `calc()`) for top/left and 1rem subtracted for width/height. I think it might be good to have a config property which removes the `calc()` part of this for older browser support, if it doesn't add too much complexity. However, the only major browsers which calc doesn't work on anymore are IE<9 and Android <4.4 (unless UC browser is considered major, which doesn't have any support for calc).

Widgets will look something like:
```js
{
  topRight: TextWidget,
  bottomRight: props => <div>Super basic widget</div>,
}
```

The idea later on will be to allow passing in an array of components, and arranging them against the locations with drag and drop.

## Ideas for layout + widget configuration

There are a couple competing layout strategies I have in mind. In all case "widgets" are really just React components.

### Pass in simple layout and widgets

Possibly the easiest to implement is simply passing in a layout array and widgets object to the Dashboard, where the widgets object is just a map of id->widgets, and layout looks something like this:
```js
[
  {
    type: 'row',
    children: [
      {
        type: 'widget',
        widget: 'aWidget',
        size: 5,
      },
      //more widgets...
    ],
  },
  //more rows...
]
```

### Pass a structured/set layout and map of widgets

This implementation would have the user pass in a layout template which would define a set of locations which widgets can occupy, and a map of widgets to locations.

The layout template would likely be an opaque var imported from react-dashboards for users just getting started. The actual structure might be something like:
```js
{
  layoutSystem: 'flex',
  structure: [
    //Children of structure are rows.
    [
      //Children of rows are widget mount points.
      {
        id: 'topLeft',
        size: 2,
      },
      {
        id: 'topCenter',
        size: 5,
      },
      {
        id: 'topRight',
        size: 2,
      },
    ],
    [
      {
        id: 'bottomLeft',
        size: 1,
      },
      {
        id: 'bottomRight',
        size: 1,
      },
    ],
  ],
}
```
Then once you have a layout, the widgets could be passed in as an array -- which would fill each row and column in order -- or as a mapping (which could be generated and saved) like this:
```js
{
  topLeft: SomeComponent,
  topCenter: props => <ChartWidget data={dataStream} />, //Easy way to save/pass props.
  topRight: AnotherComponent,
  bottomLeft: connect(selector)(ContainerComponent),
  bottomRight: props => <div><ul><li><a href="">Links</a></li></ul></div>,
}
```

### Other possibilities

It would be great to support the easiest way to get going possible. For right now, I think passing in a layout structure, with a default structure build in, is the best basic use case.

However, I also want this to be a powerful tool for those who want customization power. And for that, I think eventually react-dashboards should support both of the above layout configuration methods, and possible a way to mix them.

Ideally, feedback from basic and advanced users will drive the best way to configure the app.

# Create React App README

This project was initially setup with create-react-app. For the time being, I've moved the parts of the README which would still be useful to [CREATE_REACT_APP.md](/CREATE_REACT_APP.md). Most likely this will all be removed or replaced before a version 1 of Dashboards launches.
