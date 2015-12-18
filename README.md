# basic-angular-polymer-project
This repository can be used to set up a basic web project using
- [AngularJS](https://angularjs.org/)
- [Bootstrap](http://getbootstrap.com/)
- [polymer](https://www.polymer-project.org/1.0/)
- [gulp](http://gulpjs.com/)

## Requirements
To use this package you need [NodeJS](https://nodejs.org) and [Bower](https://bower.io) to set up / install the necessary libraries and files.

## Quick start

###Clone
* Clone the repo: `git clone https://github.com/Quaese/basic-angular-polymer-project.git`.

###Install/Setup
Install [NodeJS](https://nodejs.org) modules  
```
npm install
```
Install libraries with [Bower](https://bower.io)  
```
bower install
```
##Gulp
After the installation process the **default** gulp tast should be started. That task builds all minified files and starts a
watch task.
```
gulp
```
There are some more **gulp tasks**
- `gulp less` - compiles LESS files to CSS
- `gulp compress-less` - compiles LESS files to CSS and minifies these files
- `gulp minify-css` -  minifies CSS files
- `gulp minify-sourcemaps-css` - minifies CSS files and includes the sourcemaps
- `gulp compress-js` - minifies JavaScript files
- `gulp compress-sourcemaps-js` - minifies JavaScript files and includes the sourcemaps
- `gulp watch-less` - watches LESS files and starts compiling and minifying if a change event fires
- `gulp watch-js` - watches JavaScript files and starts minifying if a change event fires
- `gulp build` - minifies all files
- `gulp default` - executes **build**, **watch-less** and **watch-js**

For more information and **help** type
```
gulp help
```