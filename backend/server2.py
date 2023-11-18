from flask import *
from flask_cors import CORS
from werkzeug.utils import secure_filename 
import os
import cv2
from PIL import Image
import urllib.request
import src.CBIRTekstur as CTexture
import src.getrgb as CWarna
import src.matrix as HSVConverter

# Initializing flask app
app = Flask(__name__)
CORS(app)

pth = os.getcwd()
UPLOAD_FOLDER = os.path.join(pth,'dataset')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def cleandb():
    for root, dirs, files in os.walk(app.config['UPLOAD_FOLDER']):
        for file in files:
            os.remove(os.path.join(root, file))

# Route for seeing a data
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/post', methods = ['POST'])
def upload():
    if request.method == 'POST':  
        # Clear previous dataset before uploading
        cleandb()     
        errors = {}
        success = False 

        searchPath=os.path.join(app.config['UPLOAD_FOLDER'],'search')
        searchFile=request.files['searchImg']
        files = request.files.getlist('dbImgs')

        # Validate benchmark image 
        if searchFile and allowed_file(searchFile.filename):
            filename = secure_filename(searchFile.filename)
            searchFile.save(os.path.join(searchPath,filename))
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp

        # Validate dataset images
        for dbImgs in files:
            if dbImgs and allowed_file(dbImgs.filename):
                filename = secure_filename(dbImgs.filename)
                dbImgs.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
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
            #return resp
            #DISINI HARUS NGECEK STATE DARI BUTTON (mmf aku masih bingung caranya how)
            return redirect(url_for('CBIR',type='Warna')) #nanti redirect sambil pass argument warna atau tekstur
        else:
            resp = jsonify(errors)
            resp.status_code = 500
            return resp

@app.route('/search<type>', methods=['GET'])
def CBIR(type):
    imgArr=[]
    searchPth=os.path.join(app.config['UPLOAD_FOLDER'],'search')
    for root, dirs, files in os.walk(searchPth):
        searchPth1=os.path.join(searchPth,files[0])
    if type=='Tekstur':
        texSearch=CTexture.Tekstur(Image.open(searchPth1),searchPth1)
        searchVec=texSearch.CBIRTekstur()
        for root, dirs, files in os.walk(app.config['UPLOAD_FOLDER']):
            for file in files:
                img=Image.open(os.path.join(root, file))
                texture=CTexture.Tekstur(img,os.path.join(root, file))
                HSV=texture.CBIRTekstur()
                val=texture.cosSimil(searchVec,HSV)
                if val>0.60:
                    temp=dict({'path':os.path.join(root, file),'val':str(val*100)+'%'})
                    imgArr.append(temp)
            break   
    else:
        colSearch=CWarna.ColorDescriptor(bins=8)
        searchVec=colSearch.describe(cv2.imread(searchPth1))
        searchVec=HSVConverter.HSVConverter.countHSV(searchVec)
        for root, dirs, files in os.walk(app.config['UPLOAD_FOLDER']):
            for file in files:
                img=cv2.imread(os.path.join(root, file))
                cd=CWarna.ColorDescriptor(bins=8)
                feat=cd.describe(img)
                HSV=HSVConverter.HSVConverter.countHSV(feat)
                val=HSVConverter.HSVConverter.cosinesimilarity(searchVec,HSV)                
                if val>0.60:
                    temp=dict({'path':os.path.join(root, file),'val':str(val*100)+'%'})
                    imgArr.append(temp)
            break
    imgArr=sorted(imgArr,key=lambda i: i['val'],reverse=True)
    with open('results.json', 'w') as f:
        json.dump(imgArr,f,indent=6) 
    return redirect(url_for('home')) #REDIRECT INI BISA DIGANTI KE TEMPAT MUNCULLIN FOTO, for now aku belum tau itu perlu fungsi baru or not

# Running app
if __name__ == '__main__':
    app.run(debug=True)