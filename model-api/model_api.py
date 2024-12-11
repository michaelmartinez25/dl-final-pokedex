import time
from flask import Flask

app = Flask(__name__)

@app.route('/model/time')
def get_current_time():
    return {'time': time.time()}