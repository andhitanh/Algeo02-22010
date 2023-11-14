import numpy as np
import cv2
import imutils

class ColorDescriptor:
	def __init__(self, bins):
		self.bins = bins

	def describe(self, image):
		features = np.zeros((4, 4, 3), dtype=np.float32)

		(h, w) = image.shape[:2]
		(cX, cY) = (int(w * 0.5), int(h * 0.5))

		segments = [(0, 0.5*cX, 0, 0.5*cY), (0.5*cX, cX, 0, 0.5*cY), (cX, 0.75*w, 0, 0.5*cY), (0.75*w, w, 0, 0.5*cY),
			(0, 0.5*cX, 0.5*cY, cY), (0.5*cX, cX, 0.5*cY, cY), (cX, 0.75*w, 0.5*cY, cY), (0.75*w, w, 0.5*cY, cY), 
			(0, 0.5*cX, cY, 0.75*h), (0.5*cX, cX, cY, 0.75*h), (cX, 0.75*w, cY, 0.75*h), (0.75*w, w, cY, 0.75*h),
			(0, 0.5*cX, 0.75*h, h), (0.5*cX, cX, 0.75*h, h), (cX, 0.75*w, 0.75*h, h), (0.75*w, w, 0.75*h, h)]

		for i, (startX, endX, startY, endY) in enumerate(segments):
			cornerMask = np.zeros(image.shape[:2], dtype="uint8")
			
			cv2.rectangle(cornerMask, (int(startX), int(startY)), (int(endX), int(endY)), 255, -1)

			# Apply the mask to the image
			masked_image = cv2.bitwise_and(image, image, mask=cornerMask)

			# Get the RGB values within the masked region
			rgb_values = cv2.mean(masked_image)[:3]

			# Append the RGB values to the features list
			features[i // 4, i % 4, :] = (rgb_values)

		return features

	def histogram(self, image, mask):
		hist = cv2.calcHist([image], [0, 1, 2], mask, [self.bins, self.bins, self.bins],
        [0, 256, 0, 256, 0, 256])

		return hist

# # Assuming you have an image loaded using OpenCV
# image = cv2.imread('img/pebble-beach.jpg')

# # Create an instance of ColorDescriptor with, for example, 8 bins in the histogram
# cd = ColorDescriptor(bins=8)

# # Get the color features for the image
# features = cd.describe(image)

# # Print or use the features as needed
# print(features)