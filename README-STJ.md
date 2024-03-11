# [Contributing]

Install .venv

    python -m venv .venv

In VSCODE close & reopen terminal, then:

    pip install -r requirements.txt

## Build JS

Open terminal in ./src/js. Then:

    npm install
    npm run build

## Build package

    rm -rf dist && python setup.py sdist bdist_wheel

## Examples

Use VSCODE launch config *1a. examples/router_test.py*








## Tests

    nox -t test

You can run the tests with a headed browser.

    nox -t test -- --headed


[Contributing]: https://reactive-python.github.io/reactpy-router/contributing/