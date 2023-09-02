import json
import pandas as pd
import pickle
from django.http import JsonResponse
import pandas as pd
df=pd.read_csv('model/diabetes.csv')
sorted_df = df.sort_values(by='age')

# Printing the dictionary
def diabetes_predictor(request):
    if request.method == 'POST':
        # Load the machine learning model from file
        with open('model/diabetes.pkl', 'rb') as f:
            model = pickle.load(f)

        # Load the JSON data from the request body
        data = json.loads(request.body)

        # Extract the relevant information from the JSON data and store it in a Pandas DataFrame
        x_pred = pd.DataFrame({
            'gender': [data['gender']],
            'age': [data['age']],
            'hypertension': [data['hypertension']],
            'heart_disease': [data['heart_disease']],
            'smoking_history': [data['smoking_history']],
            'bmi': [data['bmi']],
            'HbA1c_level': [data['HbA1c_level']],
            'blood_glucose_level': [data['blood_glucose_level']]
        })

        # Use the loaded model to make a prediction on the input data
        prediction = model.predict_proba(x_pred)

        # Return the predicted probability of having diabetes as a JSON response
        output = {'prediction': str(prediction[0][1])}
        return JsonResponse(output)

    # Return an error response if the request method is not POST
    return JsonResponse({'error': 'Invalid request method'})

def agevsbmi(request):
    grouped_df = df[['age','bmi']].groupby('age').mean()
    return JsonResponse({'age': grouped_df.index.tolist(), 'bmi': grouped_df['bmi'].tolist()})

def agevsbloodglucose(request):
    grouped_df = df[['age','blood_glucose_level']].groupby('age').mean()
    return JsonResponse({'age': grouped_df.index.tolist(), 'blood_glucose_level': grouped_df['blood_glucose_level'].tolist()})

def agevshba1c(request):
    grouped_df = df[['age','HbA1c_level']].groupby('age').mean()
    return JsonResponse({'age': grouped_df.index.tolist(), 'HbA1c_level': grouped_df['HbA1c_level'].tolist()})