FROM python:2.7

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt && apt-get update && apt-get install -y uwsgi-plugin-python

COPY . .
CMD ["python", "./app.py"]
