import numpy as np
import math
import os.path

class Tekstur:
    def __init__(self,image,path):
        self.image=image
        self.path=path

    def CBIRTekstur(self):
        #Cek ukuran gambar, resize jika terlalu besar
        self.image=Tekstur.kompres(self.image,self.path)

        #Konversi gambar ke numpy array
        img=np.asarray(self.image)
        row=np.shape(img)[0]
        col=np.shape(img)[1]

        #Konversi ke grayscale
        greyMat=np.zeros((np.shape(img)[0],np.shape(img)[1]),dtype=np.int32);
        for i in range(0,row):
            for j in range(0,col):
                greyMat[i,j]=(img[i,j,0]*0.29)+(img[i,j,1]*0.587)+(img[i,j,2]*0.114)
    
        #Pembuatan co-occurence matrix, d=1 dan offset=90
        occMat=np.zeros((256,256),dtype=np.int32)
        for i in range (1,row):
            for j in range (0,col):
                occMat[greyMat[i,j],greyMat[i-1,j]]+=1
        
        #Pembuatan symmetric matrix
        occMat=np.add(occMat,np.transpose(occMat))
        occMat=np.divide(occMat,65280) #256x255

        #Perhitungan Contrast, Homogeneity, dan Entropy
        CHEvec=np.zeros((3),dtype=np.float64)
        for i in range (0,256):
            for j in range(0,256):
                CHEvec[0]+=occMat[i,j]*((i-j)**2)
                CHEvec[1]+=occMat[i,j]/(1+((i-j)**2))
                if (occMat[i,j]!=0):
                    CHEvec[2]+= -1*occMat[i,j]*(math.log(occMat[i,j]))
        return CHEvec
                
    def kompres(image,path):
            while (os.path.getsize(path)>10000):
                image=image.resize((int(image.size[0]/2),int(image.size[1]/2)))
                image.save(path, optimize=True, quality=25)
            return image
    
    def cosSimil(self,vec1, vec2):
        return(np.dot(vec1,vec2)/(math.sqrt(vec1[0]**2+vec1[1]**2+vec1[2]**2)*math.sqrt(vec2[0]**2+vec2[1]**2+vec2[2]**2)))