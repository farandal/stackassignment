FROM node:7
WORKDIR /fe
COPY package.json /fe
RUN npm install
COPY . /fe
CMD node index.js
EXPOSE 80
