FROM python:3.9.7-slim

EXPOSE 3000

WORKDIR /app
COPY flask /app

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "flaskserver.py" ]