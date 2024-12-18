# dl-final-pokedex

## Requirments

pip3 install flask

pip3 install python-dotenv

pip3 install torch torchvision

# Flask and Proxy Overview

The Flask backend is self contained within the model-api folder. The rest of the file structure comprises the frontend and entirety of the React app. The backend functions as an API, where all requests the front end doesn't understand get passed along to the backend via a proxy. If you look at package.json, you'll see a line that says "proxy": "http://127.0.0.1:5000", (5000 is the port Flask runs on by default).

For example, a request http://localhost:3000/model/classify from the front end gets redirected to http://localhost:5000/model/classify where the Flask backend then services it, returning a pokemon classification.

# How to Run

First, to start the flask backend: npm run-script start-model-api

Once up, start the react frontend: npm start
