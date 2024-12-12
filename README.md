# dl-final-pokedex

## Guide I followed:
https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

## Requirments

First you need to install:

pip3 install flask

pip3 install python-dotenv

## Overview

The overview of how this works is the following. In the model-api folder, the Flask backend is contained. It functions as an API, where all requests the front end doesn't understand get passed along to the backend via a proxy. If you look at package.json, you'll see a line that says "proxy": "http://localhost:5000" (5000 is the port Flask runs on by default).

So specifically, a request http://localhost:3000/model/time from our front end gets redirected to http://localhost:5000/model/time where Flask is able to service it. Currently it's just fetching the time in python, but that can be switched out for our pokedex logic.

## Possible issues

Upon first trying to get the react webpage to run I was getting this error:
"react-scripts: command not found"

I solved that via deleting package-lock.json and then running: npm install

I also later got this error: 
"Module not found: Error: Can't resolve 'web-vitals' in '/app/src'"

Which can be solved with: npm install --save-dev web-vitals

Also, this took me hours to figure out, but the .env file is critically important. The proxy does not work without it!

## How to Run

First, to start the react frontend: npm start

Once up, start the flask backend: npm run-script start-model-api

The current time (ie approx 1733931670.8567822) should display
