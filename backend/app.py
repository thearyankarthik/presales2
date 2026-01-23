from flask import Flask
from flask_cors import CORS



from controllers.call_logs_controller import call_logs_bp


app = Flask(__name__)
CORS(app)

# Registering Blueprints from the controllers folder

app.register_blueprint(call_logs_bp, url_prefix="/api/calls")



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
