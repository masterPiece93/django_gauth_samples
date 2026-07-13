from flask import Flask, jsonify, request, render_template
from environs import Env

app = Flask(__name__, static_url_path='/ui')
env = Env()
env.read_env()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/markdownView', methods=['GET'])
def markdown_view():
    return render_template('markdownViewer.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
