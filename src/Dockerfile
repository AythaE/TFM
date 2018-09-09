FROM tiangolo/uwsgi-nginx-flask:python2.7

# Install python requirements
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

ENV STATIC_INDEX 1

# Install node, yarn, npm dependencies and generate react production version
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && apt-get update && apt-get install -y yarn nodejs && cd frontend && yarn && yarn build && mv build/static/* build && mv build ../static

#CMD ["python", "./app.py"]
