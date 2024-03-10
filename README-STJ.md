# Contributing

    python -m venv .venv

In VSCODE close & reopen terminal.

    pip install -r requirements.txt

Build JS, open terminal in ./src/js. Then:

    npm install
    npm run build


    nox -t test

You can run the tests with a headed browser.

    nox -t test -- --headed




See [Contributing](https://reactive-python.github.io/reactpy-router/contributing/)