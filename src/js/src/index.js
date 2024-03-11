import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";

const html = htm.bind(React.createElement);

class ID {
  static _id = 0;

  static gen(id='component') {
    const count = ++ID._id
    return id + '-' + count
  }

}

export function bind(node) {
  return {
    create: (type, props, children) =>
      React.createElement(type, props, ...children),
    render: (element) => {
      ReactDOM.render(element, node);
    },
    unmount: () => ReactDOM.unmountComponentAtNode(node),
  };
}

export function History({ onChange }) {
  // capture changes to the browser's history
  React.useEffect(() => {
    const listener = () => {
      onChange({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  });
  return null;
}

export function Link({ to, onClick, children, ...props }) {
  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, to, new URL(to, window.location));
    onClick({
      pathname: window.location.pathname,
      search: window.location.search,
    });
  };

  // return html`<a href=${to} onClick=${handleClick} ...${props}>${children}</a>`;

  // This is a quick fix to allow links(...) to support
  // composite html. It will still fail if the composite
  // supplied is comprised of nested reactpy @components

  var element = html`<a href=${to} onClick=${handleClick} ...${props}
    >DUMMY</a
  >`;

  try {
    var _children = children;

    if (typeof children !== "string" && children instanceof String == false) {
      if (children.type === "") {
        _children = children.props.children;
      }
    }

    element = React.cloneElement(element, element.props, _children);
  } catch (error) {
    console.log("Link failed %s", error.message);
  }

  return element;
}

/**
 * Same functionality as <Link/> but with an automatic mouse click thrown
 * in an no extra cost
 */

export function Navigate({ to="#", onClick=null,...props }) {

  const handleClick = () => {

    const loc = new URL(to, window.location)

    if (loc.href !== window.location['href']) {
      window.history.pushState({}, to, loc);
      onClick({
        pathname: window.location.pathname,
        search: window.location.search,
      });

    }

  };

  React.useEffect(handleClick, []);

  return html`<div id=${ID.gen('navigate')} />`;

}
