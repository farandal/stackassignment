FROM node:7
WORKDIR /be
COPY package.json /be
RUN npm install
COPY . /be
CMD node index.js
EXPOSE 80
