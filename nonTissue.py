import numpy as np
from keras.preprocessing.image import load_img,img_to_array
from keras.models import load_model
model = load_model ("bestmodel.h5")

def nonTissueModel(img):
    print("inside nonTissue! Data: ")
    print("recieved img :" ,img)
    input_arr = img_to_array(img)/255
    input_arr = np.expand_dims(input_arr, axis=0)  
    predictions = model.predict(input_arr)[0][0]
    if(predictions<=0.5):
        return "Cancer"
    else:
        return "Non-Cancerous"