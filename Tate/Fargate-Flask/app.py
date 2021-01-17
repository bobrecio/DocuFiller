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
<<<<<<< HEAD:Tate/Fargate-Flask/app.py

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
=======
>>>>>>> fd03b5e84bdc8d43ccb9b90b419548e52f6a8832:Tate/DocuFillerPython/app.py
