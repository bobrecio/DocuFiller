from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    firstname = request.form.get("firstname", "")
    lastname = request.form.get("lastname", "")
    address = request.form.get("address", "")
    email = request.form.get("email", "")
    phone = request.form.get("phone", "")
    data = {
        'firstname': firstname,
        'lastname': lastname,
        'address': address,
        'email': email,
        'phone': phone
    }
    jsonPayload = json.dumps(data)
    url = 'https://vjccd4gsqc.execute-api.us-east-1.amazonaws.com/beta'
    response = requests.post(url, data=jsonPayload)

    return render_template('success.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)