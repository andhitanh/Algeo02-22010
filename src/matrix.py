import numpy as np
import math

class HSVConverter :
    def countHSV(matrix) :
        # Normalisasi Matrix
        copymatrix = np.copy(matrix)
        arr2 = np.divide(copymatrix,255)

        # CONVERT RGB TO HSV

        # Mencari CMax
        matrixmax = np.zeros((4, 4))
        dataCmax = np.zeros((4, 4))

        for i in range(4):
            for j in range (4) :
                max = arr2[i][j][0]
                for k in range (3) :
                    if (arr2[i][j][k] >= max) :
                        max = arr2[i][j][k]
                        dataCmax[i][j] = k
                        matrixmax[i][j] = max

        # Mencari CMin
        matrixmin = np.zeros((4, 4))

        for i in range(4):
            for j in range (4) :
                min = arr2[i][j][0]
                for k in range (3) :
                    if (arr2[i][j][k] <= min) :
                        min = arr2[i][j][k]
                        matrixmin[i][j] = min

        # Mencari delta
        matrixdelta = np.subtract(matrixmax, matrixmin)
        # print(matrixdelta)

        # Mencari Hue
        hue = np.zeros((4, 4))

        for i in range(4):
            for j in range (4) :
                if (matrixdelta[i][j] == 0) :
                    hue[i][j] = 0
                else :
                    if (dataCmax[i][j] == 0) :
                        hue[i][j] = (60 * (np.pi / 180)) * (((arr2[i][j][2] - arr2[i][j][1]) / matrixdelta[i][j]) + 4)
                    elif (dataCmax[i][j] == 1) :
                        hue[i][j] = (60 * (np.pi / 180)) * (((arr2[i][j][0] - arr2[i][j][2]) / matrixdelta[i][j]) + 2)
                    elif (dataCmax[i][j] == 2) :
                        hue[i][j] = (60 * (np.pi / 180)) * (((arr2[i][j][1] - arr2[i][j][0]) / matrixdelta[i][j]) % 6)

        # Mencari Saturation
        sat = np.divide(matrixdelta,matrixmax)

        # Mencari Value
        value = np.copy(matrixmax)

        # Menyatukan matriks HSV
        HSV = np.zeros((4, 4, 3))

        for i in range(4):
            for j in range (4) :
                    HSV[i][j][0] = hue[i][j]
                    HSV[i][j][1] = sat[i][j]
                    HSV[i][j][2] = value[i][j]
        print("HSV :")
        print(HSV)
        print("\n")
        return HSV
    
    def cosinesimilarity(HSV1, HSV2) :
        dot = 0
        for i in range(4):
            for j in range (4) :
                for k in range (3) :
                    dot += (HSV1[i][j][k])*(HSV2[i][j][k])

        # Penyebut
        norm1matrix = np.power(HSV1, 2)
        norm1sum = 0

        for i in range(4):
            for j in range (4) :
                for k in range (3) :
                    norm1sum += norm1matrix[i][j][k]

        norm1 = math.sqrt(norm1sum)

        norm2matrix = np.power(HSV2,2)
        norm2sum = 0

        for i in range(4):
            for j in range (4) :
                for k in range (3) :
                    norm2sum += norm2matrix[i][j][k]

        norm2 = math.sqrt(norm2sum)

        # Cosine value
        cosvalue = dot / (norm1 * norm2)

        return cosvalue