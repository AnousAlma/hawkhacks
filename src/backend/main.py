import tensorflow as tf
import numpy as np
import os
import sys
import json
import matplotlib.pyplot as plt
import cv2

model = tf.keras.models.load_model('model.h5')