from flask import *
from flask_cors import CORS
import os
import cv2
from werkzeug.utils import secure_filename
from PIL import Image
import src.CBIRTekstur as CTexture
import src.getrgb as CWarna
import src.matrix as HSVConverter

app=Flask(__name__)
CORS(app)
pth=os.getcwd()
par=os.path.join(pth,os.pardir)
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.abspath(par),'frontend','src','dataset')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def cleandb():
    for root, dirs, files in os.walk(app.config['UPLOAD_FOLDER']):
        for file in files:
            os.remove(os.path.join(root, file))
            
@app.route('/')
def home():
    return render_template('index.html') #aku gatau ini dipake di react or not, nanti ganti ganti aja

@app.route('/',methods = ['POST'])
def upload():
    if request.method == 'POST':  
        cleandb()     
        
        errors={}
        success1=False
        success2=False
        searchPath=os.path.join(app.config['UPLOAD_FOLDER'],'search')
        searchFile=request.files['searchImg']
        files = request.files.getlist('dbImgs')
        if searchFile and allowed_file(searchFile.filename):
            filename = secure_filename(searchFile.filename)
            searchFile.save(os.path.join(searchPath,filename))
            success1=True
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
        for dbImgs in files:
            if dbImgs and allowed_file(dbImgs.filename):
                filename = secure_filename(dbImgs.filename)
                dbImgs.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
                success2=True
            else:
                resp = jsonify({
                    "message": 'File type is not allowed',
                    "status": 'failed'
                })
                return resp
            
        if success1 and success2 and errors:
            errors['message'] = 'File(s) successfully uploaded'
            errors['status'] = 'failed'
            resp = jsonify(errors)
            resp.status_code = 500
            return resp
        if success1 and success2:
            resp = jsonify({
                "message": 'Files successfully uploaded',
                "status": 'successs'
            })
            resp.status_code = 201
            return redirect(url_for('CBIRWarna'))
        else:
            resp = jsonify(errors)
            resp.status_code = 500
            return resp

  

@app.route('/searchWarna')
def CBIRWarna():
    imgArr=[]
    searchPth=os.path.join(app.config['UPLOAD_FOLDER'],'search')
    for root, dirs, files in os.walk(searchPth):
        searchPth1=os.path.join(searchPth,files[0])

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
                temp=dict({'path':os.path.join('dataset', file),'name':file,'val':str(val*100)+'%'})
                imgArr.append(temp)
        break
    imgArr=sorted(imgArr,key=lambda i: i['val'],reverse=True)
    jsRet=json.dumps(imgArr,indent=4) 
    return jsRet

@app.route('/searchTekstur')
def CBIRTekstur():
    imgArr=[]
    searchPth=os.path.join(app.config['UPLOAD_FOLDER'],'search')
    for root, dirs, files in os.walk(searchPth):
        searchPth1=os.path.join(searchPth,files[0])
    texSearch=CTexture.Tekstur(Image.open(searchPth1),searchPth1)
    searchVec=texSearch.CBIRTekstur()
    for root, dirs, files in os.walk(app.config['UPLOAD_FOLDER']):
        for file in files:
            img=Image.open(os.path.join(root, file))
            texture=CTexture.Tekstur(img,os.path.join(root, file))
            HSV=texture.CBIRTekstur()
            val=texture.cosSimil(searchVec,HSV)
            if val>0.60:
                temp=dict({'path':os.path.join(root, file),'name':file,'val':str(val*100)+'%'})
                imgArr.append(temp)
        break   
    imgArr=sorted(imgArr,key=lambda i: i['val'],reverse=True)
    jsRet=json.dumps(imgArr,indent=4) 
    return jsRet
        
if __name__ == '__main__':
    app.run(debug=True)
