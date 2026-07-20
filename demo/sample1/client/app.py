from flask import Flask, jsonify, request, render_template
from environs import Env

app = Flask(__name__, static_url_path='/ui')
env = Env()
env.read_env()

@app.route('/', methods=['GET'])            # Component 1: Home page route
def index():                                # Controller function for the home page
    return render_template('index.html')

@app.route('/markdownView', methods=['GET'])    # Component 2: Markdown viewer route
def markdown_view():                            # Controller function for the markdown viewer
    return render_template('markdownViewer.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
