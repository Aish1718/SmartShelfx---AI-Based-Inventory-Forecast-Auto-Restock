from app import create_app

app = create_app()

@app.route('/')
def index():
    return {
        'service': 'SmartShelfX AI Forecasting Service',
        'version': '1.0.0',
        'status': 'running'
    }

@app.route('/health')
def health():
    return {'status': 'healthy'}, 200

if __name__ == '__main__':
    app.run(
        host=app.config['HOST'],
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )