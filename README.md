# aurelia-materialize-electron

Project created with aurelia/materialize/electron.

- [aurelia](http://aurelia.io)
- [aurelia-cli](https://github.com/aurelia/cli)
- [aurelia-i18n](https://github.com/aurelia/i18n)
- [aurelia-validation](https://github.com/aurelia/validation)
- [aurelia-materialize-bridge](https://github.com/aurelia-ui-toolkits/aurelia-materialize-bridge)
- [electron](http://electron.atom.io/)
- [electron-builder](https://github.com/electron-userland/electron-builder)


## Install

Clone this project and cd into cloned folder.

```bash
git clone https://github.com/Ullfis/aurelia-materialize-electron.git
cd aurelia-materialize-electron
```

Install dependencies

```bash
npm install
```

## Prepare materialize-css

```bash
npm run materialize
```

In windows cmd, run this command instead:

```bash
npm run materializewin
```

## Run

Compile and start with electron:

```bash
au run [--env [dev|stage|prod]] [--watch]
```

## Release

Build

```bash
au build --env prod
```

Copy files to release, build unpacked folder and create install file

```bash
au release --env prod
```

Copy files to release and build unpacked folder. Useful to test.

```bash
au release
```
