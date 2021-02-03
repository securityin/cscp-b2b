FROM ubuntu:18.04 as builder

# Install any needed packages
RUN apt-get update && apt-get install -y curl git gnupg

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
ADD . /opt/web

WORKDIR /opt/web
RUN npm install yarn -g

RUN yarn &&  yarn build

CMD yarn start