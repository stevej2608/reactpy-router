from typing import Any, cast
from reactpy import component, html, run
from reactpy.types import VdomDict
from reactpy_router import link, route, simple
from .icon import Icon_Dashboard, ICON

# reactpy-router <Link /> with ICON

@component
def SideBarItem(text:str, icon: ICON, to:str):

    def to_vdom_dict(comp: ICON) -> VdomDict:
        icon_comp = comp()
        return cast(VdomDict, icon_comp.type())

    return link(
        html.div(
            to_vdom_dict(icon),
            html.span(text)
        ),
        to=to
    )


@component
def AppMain():

    @component
    def root():
        return html.div(
            html.h2('ROOT'),
            SideBarItem("Page A", icon=Icon_Dashboard, to="/a")

        )

    @component
    def page_a():
        return html.div(
            html.h2('Page A'),
            link("[Home]", to="/")
        )

    return simple.router(
        route("/", root()),
        route("/a", page_a()),
    )

# python -m examples.router_test
#
# Internally app is run by Uvicorn/starlette
#

if __name__ == "__main__":
    run(AppMain)
