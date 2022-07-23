import requests
import base64
import datetime
import json
import re
# # 获取Access Token(有效期为7天)
# access_url = 'https://api.bimface.com/oauth2/token'
# access_app = base64.b64encode('9ajg3YC3kcUd8pyXHBv8YtkpLD04bwjh:9wl595y8LbCh30SQK1XOajRTkvg62aWn'.encode())
# access_header = {"Authorization": f"Basic {access_app.decode()}"}
# access_token = requests.post(url=access_url, headers=access_header).json()['data']['token']
# print(f"{datetime.datetime.now()}: 用户验证码为——{access_token}")
# # 雨虹110kV变电站项目文件ID
# file_id = '2120168448190912'
# # 获取模型的View Token(有效期为12h)
# view_url = 'https://api.bimface.com/view/token'
# view_header = {"Authorization": f"Bearer {access_token}"}
# view_param = {"fileId": file_id}
# view_token = requests.get(url=view_url, headers=view_header, params=view_param).json()['data']
# print(f"{datetime.datetime.now()}: 临时访问凭证推送成功! {view_token}")
# # 获取源文件信息
# file_url = f"https://file.bimface.com/files/{file_id}"
# file_header = {"Authorization": f"Bearer {access_token}"}
# file_info = requests.get(url=file_url, headers=file_header).json()['data']
# print(f"{datetime.datetime.now()}: 项目文件信息推送成功! {file_info}")
# # 查询符合条件的构件ID列表
# query_input = "防火门"
# query_url = "https://api.bimface.com/data/v2/query/elementIds"
# query_header = {"Authorization": f"Bearer {access_token}"}  # 在请求头中添加上Authorization这个参数
# query_body = {"targetType": "file", "targetIds": [file_id],
#               "query": {"contain": {"family": query_input}}}  # 查询请求体字典要序列化成JSON字符串
# query_id = requests.post(url=query_url, headers=query_header, data=json.dumps(query_body)).json()['data'][0]['elementIds']
# # 获取指定ID构件的属性
# element_id = query_id[0]
# element_url = f"https://api.bimface.com/data/v2/files/{file_id}/elements/{element_id}"
# element_header = {"Authorization": f"Bearer {access_token}"}
# element_info = requests.get(url=element_url, headers=element_header).json()
# for j in element_info['data']['properties']:
#     if j['group'] == '标识数据':
#         basic_data = j['items']
#         print(basic_data)
with open("formular.txt", 'r', encoding='utf-8-sig') as f:
  formular_list = f.read().split("\n")
  print(formular_list)
for k in range(0, len(formular_list), 1):
  query_j = 0
  formular = formular_list[k]
  match = re.match(r'^\((.*?),(.*?),(.*?)\)(.*?)$', formular)
  print(match.group())
