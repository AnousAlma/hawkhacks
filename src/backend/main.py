import cv2
import os
import time

os.makedirs('dataset/A', exist_ok=True)

cam = cv2.VideoCapture(0)

img_labels = [
    "hello", "thanks", "no", "yes", "iloveyou"
]

iterations = 3

capturing = False
label_index = 0
iteration_index = 0

for label in img_labels:
    os.makedirs(f'dataset/{label}', exist_ok=True)
  
while True:
    ret, frame = cam.read()
    if not ret:
        break
    cv2.imshow("Frame", frame)

    key = cv2.waitKey(1)
    
    if key & 0xFF == ord('q'):
        break
    
    if key & 0xFF == ord('s'):
        capturing = True

    if capturing:
        if iteration_index < iterations:
            img_name = f"dataset/{img_labels[label_index]}/{img_labels[label_index]}_{iteration_index}.png"
            cv2.imwrite(img_name, frame)
            print(f"{img_name} saved")
            iteration_index += 1
            time.sleep(0.5)  # Short delay to allow changing the hand sign
        else:
            iteration_index = 0
            label_index += 1
            if label_index >= len(img_labels):
                capturing = False
                label_index = 0  # Reset for next round
                print("Finished capturing all labels. Press 's' to start again or 'q' to quit.")

cam.release()
cv2.destroyAllWindows()