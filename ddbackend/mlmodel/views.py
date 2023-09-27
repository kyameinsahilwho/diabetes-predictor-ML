import json
import pandas as pd
import pickle
from django.http import JsonResponse
from .models import Bmi,Diabetes
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
        if prediction[0][1]*100 < 25:
            health_risk = 'Low'
        elif prediction[0][1]*100 < 50:
            health_risk = 'Moderate'
        elif prediction[0][1]*100 < 75:
            health_risk = 'High'
        else:
            health_risk = 'Very High'
        diabetes_object = Diabetes.objects.get(health_risk=health_risk)
        print(diabetes_object)
        # Return the predicted probability of having diabetes as a JSON response
        output = {'prediction': str(prediction[0][1]), 'health_risk': health_risk, 'precautions': diabetes_object.precautions.split('$'), 'medication': diabetes_object.medication}
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


def bmicalculator(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        height = data.get('height')
        weight = data.get('weight')
        age = data.get('age')
        bmi = round(float(weight) / (float(height) ** 2), 1 )
        if bmi <= 18.5:
            bmi_category = 'Underweight'
        elif bmi < 25:
            bmi_category = 'Normal'
        elif bmi < 30:
            bmi_category = 'Overweight'
        else:
            bmi_category = 'Obese'
        bmi_object = Bmi.objects.get(bmi_category=bmi_category)

        return JsonResponse({'bmi': bmi,'bmi_category': bmi_category, 'precautions': bmi_object.precautions.split('$'), 'probable_diseases': bmi_object.probable_diseases, 'health_risk': bmi_object.health_risk})