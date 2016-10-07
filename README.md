
# Alpha warning!

This project is only just being started. It is not yet properly configured to be used as an npm module, nor is it available via npm.

Pull requests, ideas, suggestions, and help are all welcome!

A short list of things which are out of place, missing, or extra, that need fixed before an initial publish to npm:
- PictureWidget is just for test/demo purposes. It will be moved into a demo directory eventually.
- There is no release build configuration setup. Right now an ejected create-react-app project just builds the demo from /src/index.js.
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
