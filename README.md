# Way-Farer-Develop
A public bus transportation booking service

[![Build Status](https://travis-ci.org/mugishaje/Way-Farer-Develop.svg?branch=develop)](https://travis-ci.org/mugishaje/Way-Farer-Develop)

Way-Farer-Develop is a platform  that helps users find, rent and buy proerties eality

I have already upload the UI template for this project on github and if you want to have a look follow this [link](https://github.com/mugishaje/Way-Farer-Develop)

Here is a list of all API Endpoints that you will find:
* **GET/trips** Fetch all available trips
* **GET/trips/:tripId** fetches a specific trip basing on its id
* **delete/booking/:booking_id** deletes a boooking
* **POST/trips** Create a trip
* **GET/bookings** Fetch all bookings
* **post/bookings** creates a booking
* **patch/trips/:tripId/cancel** cancels a trip
* **post/signup** creates a user
* **post/signin** logs in a user

# Technology Tools used
* Server-side Framework: **Node/Express JS**
* Linting Library: **ESlint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha** with **Chai**

# Additional Tools
* JavaScript Es6 with **Babel** transpiler
* TravisCI for Continous Integration
* nyc for test coverage
* Heroku for Deployment

The url of the app on heroku is this one [https://baraka-way-farer-adc.herokuapp.com/](https://baraka-way-farer-adc.herokuapp.com/).

This is the list of all routes as on the **heroku deployment**:
* Gets all trips  [https://baraka-way-farer-adc.herokuapp.com/api/v1/trips](https://baraka-way-farer-adc.herokuapp.com/api/v1/trips)
* creates a trip  [https://baraka-way-farer-adc.herokuapp.com/api/v1/trips](https://baraka-way-farer-adc.herokuapp.com/api/v1/trips)
* Fetch a specific trip [https://baraka-way-farer-adc.herokuapp.com/api/v1/trips/tripId](https://baraka-way-farer-adc.herokuapp.com/api/v1/trips/tripId)
* Fetch all bookings [https://baraka-way-farer-adc.herokuapp.com/api/v1/bookings](https://baraka-way-farer-adc.herokuapp.com/api/v1/bookings)
* creates a booking [https://baraka-way-farer-adc.herokuapp.com/api/v1/bookings](https://baraka-way-farer-adc.herokuapp.com/api/v1/bookings)
* deletes a booking [https://baraka-way-farer-adc.herokuapp.com/api/v1/booking/booking_id]([https://baraka-way-farer-adc.herokuapp.com/api/v1/booking/booking_id)
* sign up [https://baraka-way-farer-adc.herokuapp.com/api/v1/auth/signup]([https://baraka-way-farer-adc.herokuapp.com/api/v1/auth/signup)
* sign in [https://baraka-way-farer-adc.herokuapp.com/api/v1/auth/signin]([https://baraka-way-farer-adc.herokuapp.com/api/v1/auth/signin)
* cancels a  trip [https://baraka-way-farer-adc.herokuapp.com/api/v1/trips/tripId/cancel](https://baraka-way-farer-adc.herokuapp.com/api/v1/trips/tripId/cancel)

For a better test you will need to use [POSTMAN](https://www.getpostman.com/)
# Setup Instruction
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en/)

For getting the files into your local machine open git bash and do git clone with repository url

```
$ git clone https://github.com/mugishaje/Way-Farer-Develop.git
```
Navigate to the folder containing all code files by typing cd folder_name

```
$ cd Way-Farer-Develop
```
Install dependincies as they appear in package.json file by

```
$ npm install
```
To start the server do

```
$ npm run dev-start
```
To run the test do

```
$ npm run test
```

