import pandas as pd
import json

def read_data(handler):
  """reading pandas data"""
  data = pd.read_csv('./data/Products_1320.csv')
  df = data[data['CLICK_SOURCE'] != 'Direct']
  result = df.to_json(path_or_buf = None, orient = 'records', date_format = 'epoch', double_precision = 10, force_ascii = True, date_unit = 'ms', default_handler = None)
  return result
