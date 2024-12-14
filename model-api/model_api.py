import time
import os
from flask import Flask, request
import sys
import logging
UPLOAD_FOLDER = './upload'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/model/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/model/image', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "NO FILE PART BAD"
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return "NO USER SELECTED FILE BAD"
        if file:
            path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(path)
            return path
        return "BAD"
    return "This was a GET Request"
