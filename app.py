from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title='Neerar.com')

@app.route('/cli')
def cli():
    return render_template('index.html', title='CLI')

if __name__ ==  '__main__':
    app.run(debug=True)
