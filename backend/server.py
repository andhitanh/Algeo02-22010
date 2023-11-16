from flask import Flask, jsonify, json, request
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename 
from models import Dataset, db
import os
import urllib.request

# Initializing flask app
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
with app.app_context():
    db.create_all()

UPLOAD_FOLDER = '../img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

ma=Marshmallow(app)
 
class ImageSchema(ma.Schema):
    class Meta:
        fields = ('id','title')
image_schema = ImageSchema(many=True)

# Route for seeing a data
@app.route('/api')
def getData():
    return {
        'id': 4,
        'title': "TEST",
        'name': "hi"
    }

@app.route('/upload', methods=['POST'])
def upload_image():
    #checks the existence of file
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'File is not requested',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    files = request.files.getlist('files[]')
      
    errors = {}
    success = False 
      
    #iterate for the file in request files
    for file in files:      
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            destpath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(destpath)
 
            newFile = Dataset(img=filename,hue=10,sat=11,val=12,contrast=13,homogeneity=14,entropy=20)
            db.session.add(newFile)
            db.session.commit()
 
            success = True
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
         
    if success and errors:
        errors['message'] = 'File successfully uploaded'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'successs'
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    return resp

@app.route('/images', methods=['GET'])
def get_image():
    result_images = Dataset.query.all()
    results = image_schema.dump(result_images)
    return jsonify(results)

# Running app
if __name__ == '__main__':
    app.run(debug=True)