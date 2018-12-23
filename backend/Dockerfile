FROM node:7
FROM keymetrics/pm2:latest-alpine
RUN npm install -g babel-cli
WORKDIR /be
COPY package.json /be
COPY pm2.json /be
COPY config.js /be
COPY .env /be
COPY .babelrc /be
COPY index.js /be
COPY app.js /be
COPY ./api /be/api
COPY ./services /be/services
ENV NPM_CONFIG_LOGLEVEL info
RUN ls -al -R
RUN npm install --production

CMD [ "pm2-runtime", "start", "pm2.json" ]