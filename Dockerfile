FROM node:0.10.33
RUN mkdir /dispatcher
WORKDIR /dispatcher
RUN apt-get update && \
    apt-get -y install nginx;

ADD bower.json /dispatcher/bower.json

RUN npm install -g bower
RUN bower install --allow-root

ADD . /dispatcher
RUN npm install -g ember-cli
RUN npm install


RUN ember build --output-path /var/www/html/dispatcher --environment=staging

CMD nginx -g 'daemon off;'
