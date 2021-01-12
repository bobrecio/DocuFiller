from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    firstname = request.form.get("firstname", "")
    lastname = request.form.get("lastname", "")
    address = request.form.get("address", "")
    return render_template('success.html')