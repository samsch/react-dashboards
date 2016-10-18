// @flow
import React from 'react';

const Layout = props => {
  if(props.type === 'row') {
    return (
      <div className="dashboard-row" style={{minHeight: props.height}}>
        {props.children.map(childLayout=>(
          <Layout key={childLayout.id} {...childLayout} widgets={props.widgets} />
        ))}
      </div>
    );
  }
  if(props.type === 'widget') {
    const Widget = (typeof props.widget === 'string') ? (props.widgets[props.widget]) : props.widget;
    const style = {
      flex: (props.size || 10) + ' 0 auto',
    };
    return (
      <div className="dashboard-widget" style={style} >
        <Widget {...props.props} />
      </div>
    );
  }
  throw new Error('Children must be give a type of "row" or "widget".');
};

const BlankWidget = props => (
  <div className="blank-wdiget">
    Nothing to see here...
  </div>
);

const createOffset = function (percentage) {
  return 'calc(' + percentage + '% + .5rem)';
};

const createWidth = function (percentage) {
  return 'calc(' + percentage + '% - 1rem)';
};

const absoluteLayout = (segments, widgets) => segments.map(segment => {
  const Widget = widgets[segment.id] || BlankWidget;
  return (
    <div key={segment.id} className="absolute-segment" style={{
        top: createOffset(segment.top),
        left: createOffset(segment.left),
        height: createWidth(segment.height),
        width: createWidth(segment.width),
      }}
    >
      <Widget />
    </div>
  );
});

const layout = (layout, widgets) => {
  switch(layout.mode) {
    case 'absolute':
      return absoluteLayout(layout.segments, widgets);
    case 'flex':
      return layout.children.map(layout=>(<Layout key={layout.id} {...layout} widgets={widgets} />));
    default:
      return 'Layout mode invalid';
  }
};

class Dashboard extends React.PureComponent {
  static defaultProps: {
    widgets: {},
  }
  render () {
    const view = layout(this.props.layout, this.props.widgets);
    return (
      <div className={'component-dashboard ' + this.props.layout.mode}>
        {view}
      </div>
    );
  }
}
Dashboard.propTypes = {
  widgets: React.PropTypes.object,
  layout: React.PropTypes.shape({
    mode: React.PropTypes.string.isRequired,
    segments: React.PropTypes.array,
    row: React.PropTypes.array,
  }),
};
Dashboard.defaultProps = {
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
        id: 'topCenter',
        top: 0,
        left: 33.33,
        height: 50,
        width: 33.33,
      },
      {
        id: 'topRight',
        top: 0,
        left: 66.67,
        height: 50,
        width: 33.33,
      },
      {
        id: 'bottomLeft',
        top: 50,
        left: 0,
        height: 50,
        width: 62,
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
  widgets: {},
};

export default Dashboard;
