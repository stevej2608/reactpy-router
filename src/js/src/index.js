import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";

const html = htm.bind(React.createElement);

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

  console.log('Link(prop=%s)', JSON.stringify(props))

  const handleClick = (event) => {
    event.preventDefault();

    console.log('Link.pushState to=%s', to)

    window.history.pushState({}, to, new URL(to, window.location));

    onClick({
      pathname: window.location.pathname,
      search: window.location.search,
    });

  };

  return html`<a href=${to} onClick=${handleClick} ...${props}>${children}</a>`;
}

/**
 * Same functionality as <Link/> but with an automatic mouse click thrown
 * in an no extra cost
 */

export function Navigate({ to="#", id="???", onClick=null,...props }) {

  console.log('Navigator(prop=%s)', JSON.stringify(props))

  const handleClick = (event) => {
    event.preventDefault();

    const loc = new URL(to, window.location)

    if (loc.href !== window.location['href']) {

      console.log('Navigator.pushState to=%s, log=%s', to, loc)

      window.history.pushState({}, to, loc);

      console.log('onClick pathname=%s, search=%s', window.location.pathname, window.location.search)

      onClick({
        pathname: window.location.pathname,
        search: window.location.search,
      });

    }

  };

  React.useEffect(() => {
      const timeoutId = setTimeout(() => {
        const el = document.getElementById(id);
        el.click()
        // handleClick()
      }, 200);
  
      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures the effect runs only once

  return html`<a href=${"#"} id=${id} onClick=${handleClick} />`;

}
