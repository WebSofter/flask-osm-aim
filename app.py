import os

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
  return render_template('index.html', data={})


@app.errorhandler(500)
def internal_server_error(e):
    print('yes')    
    return 'It works!', 500

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(host='127.0.0.1', port=port, debug=True)
