from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def home():
	return render_template('index.html')

@app.route('/sw.js', methods=['GET'])
def sw():
	return app.send_static_file('sw.js')


app.run(debug=True)