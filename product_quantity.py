import pandas as pd
import json
csv_data = pd.read_csv('./data/Products_1320.csv')

# def read_data():
#     """reading pandas data"""
#     csv_data = pd.read_csv('./data/Products_1320.csv')
#     print('inside the function')
#     return csv_data

def scatter_plot_data(handler):
    print('*'*100)
    device_list = list()
    days_list = list()
    device_list = handler.get_argument('device').split(',')
    days_list = handler.get_argument('dayOfWeek').split(',')
    print(len(csv_data.index))
    print('*'*100)
    if handler.get_argument('default') == 'false':
        df = csv_data[csv_data['DEVICE'].isin(device_list)]
        df = df[df['DAY'].isin(days_list)]
        price = handler.get_argument('price').split(',')
        # df = df[(df['PRICE'] > int(price[0])) & (df['PRICE'] < int(price[1]))]
        df = df[df['CLICK_SOURCE'] != 'Direct']
    else:
        df = csv_data[csv_data['CLICK_SOURCE'] != 'Direct']
    result = df.to_json(orient='records')
    return result


def table_data(handler):
    df = csv_data[csv_data['CLICK_SOURCE'] != 'Direct']
    new_df = df.groupby(['PPC_TYPE'])['TOT_PRICE', 'QUANTITY'].agg('sum')
    new_df['AVG_PRICE'] = new_df.apply(lambda row: row.TOT_PRICE / row.QUANTITY, axis=1)
    return new_df.to_json(orient='records')
