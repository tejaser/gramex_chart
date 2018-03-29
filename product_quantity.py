import pandas as pd
import json
csv_data = pd.read_csv('./data/Products_1320.csv')

# def read_data():
#     """reading pandas data"""
#     csv_data = pd.read_csv('./data/Products_1320.csv')
#     print('inside the function')
#     return csv_data

def scatter_plot_data(handler):
    df = csv_data[csv_data['CLICK_SOURCE'] != 'Direct']
    result = df.to_json(orient='records')
    return result


def table_data(handler):
    df = csv_data[csv_data['CLICK_SOURCE'] != 'Direct']
    new_df = df.groupby(['PPC_TYPE'])['TOT_PRICE', 'QUANTITY'].agg('sum')
    new_df['AVG_PRICE'] = new_df.apply(lambda row: row.TOT_PRICE / row.QUANTITY, axis=1)
    return new_df.to_json(orient='records')
