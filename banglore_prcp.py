# -*- coding: utf-8 -*-
"""Banglore_Prcp.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1TiW8aDG98eufPQdc5NE45sSS8QbBGPCc
"""

!pip install neuralprophet
import pandas as pd
from neuralprophet import NeuralProphet
from matplotlib import pyplot as plt
import pickle
import matplotlib as plt
df = pd.read_csv('Bangalore.csv')
mum=df
mum['time'] = pd.to_datetime(mum['time'], format='%d-%m-%Y')
import matplotlib.pyplot as plt
plt.plot(mum['time'], mum['prcp'])
data = mum[['time', 'prcp']]
data.dropna(inplace=True)
data.columns = ['ds', 'y']
m = NeuralProphet()
model = m.fit(data, freq='D', epochs=1000)
future = m.make_future_dataframe(data, periods=2000)
forecast = m.predict(future)
forecast.head()
from google.colab import files
future_with_yhat = forecast[['ds', 'yhat1']]
future_with_yhat.to_csv('Bangalore_Prcp.csv', index=False)
files.download('Bangalore_Prcp.csv')

