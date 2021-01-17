import json
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket = 'team3-docufiller'
    filename = 'test.json'
    content = {'firstname': 'Tate', 'lastname': 'Steinour'}
    payload = json.dumps(content)

    s3.put_object(Bucket=bucket, Key=filename, Body='payload')

    print('Put Complete')
