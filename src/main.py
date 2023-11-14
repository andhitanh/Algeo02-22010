import numpy as np
import math
import cv2
import imutils
import os

from getrgb import *
from matrix import *

image1 = cv2.imread('img/beach-sunset.jpg')
cd1 = ColorDescriptor(bins=8)
features1 = cd1.describe(image1)

HSV1 = HSVConverter.countHSV(features1)

# for images in os.listdir('img'):
#     image2 = cv2.imread(images)
#     cd2 = ColorDescriptor(bins=8)
#     features2 = cd2.describe(image2)

#     HSV2 = HSVConverter.countHSV(features2)

#     similarity = HSVConverter.cosinesimilarity(HSV1, HSV2)

#     print("Similarity = " + str(similarity*100) + "%")

image2 = cv2.imread('img/pebble-beach.jpg')
cd2 = ColorDescriptor(bins=8)
features2 = cd2.describe(image2)

HSV2 = HSVConverter.countHSV(features2)

similarity = HSVConverter.cosinesimilarity(HSV1, HSV2)

print("Similarity = " + str(similarity*100) + "%")