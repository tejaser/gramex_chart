import pandas as pd
import json

def read_data():
  """reading pandas data"""
  data = pd.read_csv('./data/Products_1320.csv')
  df = data[data['CLICK_SOURCE'] != 'Direct']
  result = df.to_json(orient=records)
  return result