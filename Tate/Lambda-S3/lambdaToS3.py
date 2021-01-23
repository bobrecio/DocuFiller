import json
import boto3

s3 = boto3.client('s3')

def lambda_handler(event, context):
    
    body = json.loads(event['body'])
    name = body['name']
    address = body['address']
    email = body['email']
    phone = body['phone']
    
    bucket = 'team3-docufiller'
    filename = 'info.json'
    content = {'name': name, 'address': address, 'email': email, 'phone': phone}
    payload = json.dumps(content)

    s3.put_object(Bucket=bucket, Key=filename, Body=payload)

    print('Put Complete')
    
    return {
        "statusCode": 200
    }
