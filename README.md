# motiv [![Build Status](https://travis-ci.org/motiv-fitness/motiv.svg?branch=dev)](https://travis-ci.org/motiv-fitness/motiv)

What's your Motiv?


# Motiv

Ever find it difficult to keep track of what your diet is and how you are exercising? [BetterU](http://www.betteru.pro/) is a new web application that combines your input with our extensive set of data visualization and recording tools to accurately depict trends, helping you manage your health. 


## Developer Documentation

### Tools Used:

* React
* Redux
* React-router
* jQuery
* Babel
* Bookshelf
* Node
* Express
* MySQL
* JSON Web Tokens
* EJS
* Mocha
* Karma
* Travis CI

### To Install or Contribute to Motiv:

* Fork the repo
* Clone down locally to your machine
* Navigate into project root folder

```
npm install
```

* Fill out and rename the .sample-env file to .env


* Run the server from the respective folder

```
cd server
npm run start
```

* Visit the localhost address indicated.


### Front-end

BetterU utilizes AngularJS to render the front-end. Built-in Angular factories were used to manage state. Additionally, ui-router was implemented to enable application routing. 

All API calls are made in the corresponding factory file associated for the type of data that it is maintaining.

Our chat feature utilizes the Socket.IO library and our data visualizations are created with Chartist.

### Back-end

BetterU’s custom RESTFul API is built with Node.js and Express. Data management is handled by Bookshelf and MySQL.

## BetterU Team

* [Justin Chen](https://github.com/justinpchen94)
* [Ariel Cook](https://github.com/arielMKS)
* [Denny Jun](https://github.com/dennyjun)
* [Jason Lee](https://github.com/jasonjunglee)
