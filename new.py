import pickle
import sklearn
with open('linear_regression_model.pkl','rb') as f:
    model = pickle.load(f)
print(model.predict([[0,44,0,0,0,19.31,6.5,200]]))