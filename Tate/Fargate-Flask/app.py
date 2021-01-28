from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/submit', methods=['POST'])
def submit():
    first = request.form.get("firstname", "")
    last = request.form.get("lastname", "")
    street = request.form.get("street", "")
    city = request.form.get("city", "")
    state = request.form.get("state", "")
    zipcode = request.form.get("zip", "")
    email = request.form.get("email", "")
    phone = request.form.get("phone", "")
    data = [
        {
        'name': {
            'first': first,
            'last': last,
        },
        'address': {
            'street': street,
            'city': city,
            'state': state,
            'zipcode': zipcode
        },
        'email': email,
        'phone': phone
        }
    ]
    jsonPayload = json.dumps(data)
    url = 'https://6p1v3f2z2j.execute-api.us-east-1.amazonaws.com/work'
    response = requests.post(url, data=jsonPayload)

    return render_template('success.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
