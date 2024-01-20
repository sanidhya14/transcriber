import uuid
import json

def generate_request_id():
    return str(uuid.uuid4())


def exact_div(x, y):
    assert x % y == 0
    return x // y

def notify(consumer, payload):
    consumer.send(text_data=json.dumps(payload))
    