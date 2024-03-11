# the version is statically loaded by setup.py
__version__ = "0.1.3"

from . import simple
from .core import create_router, link, Navigate, route, router_component, use_params, use_query
from .types import Route, RouteCompiler, RouteResolver

__all__ = (
    "create_router",
    "link",
    "Navigate",
    "route",
    "route",
    "Route",
    "RouteCompiler",
    "router_component",
    "RouteResolver",
    "simple",
    "use_params",
    "use_query",
)
