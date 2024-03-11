from typing import Callable
from reactpy import component
from reactpy.core.component import Component
from reactpy.svg import svg, path

# pylint: disable=line-too-long

ICON = Callable[..., Component]

@component
def Icon_Dashboard():
    return svg({'width': '1.5em', 'height': '1.5em', 'fill': 'currentColor', 'viewBox': '0 0 20 20', 'xmlns': 'http://www.w3.org/2000/svg'},
        path({'d': 'M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'}),
        path({'d': 'M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'})
    )
