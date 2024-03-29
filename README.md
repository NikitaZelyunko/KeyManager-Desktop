# KeyManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Running on external devices(from browser)

If you want to use this app on external devices, you need to open the app in a secure context.
Chrome does not allow the cryptographic API in unsecured contexts, which is required for this application to work. In other words, the application must open using the https protocol.
Create certificates in any way you know and provide the https protocol to the assembled application.
For example, a script for local testing might look like this: `"ng:serve-ssl": "ng serve -c web --host=192.168.31.75 --ssl --ssl-cert ../../Certificates/localhost.crt --ssl-key ../../Certificates/localhost.key",`.

## Use docker for local network development

In order to deploy an application accessible by domain name, there is a `docker.compose-pwa-share.yaml` file in the containers/pwa-share folder. It contains the configuration of the application server and DNS server. Also in this folder there is an example of configuration files for the DNS server. The `key-manager-pwa-share.com.zone` file will need to be edited and the IP address of the host in which the containers will be launched must be entered. After this, you will need to enter the following commands in the console (`run from the root folder of the application`):
`docker compose --project-directory . --file containers/pwa-share/docker.compose-pwa-share.yaml build`
and then like this:
`docker compose --project-directory . --file containers/pwa-share/docker.compose-pwa-share.yaml watch`
Then, in order for the site to open in a secure context (https), you need to get the generated certificate from the container; it is located in the application folder. This certificate must be trusted on each device on which you want to use the application.
