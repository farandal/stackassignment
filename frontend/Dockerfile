FROM nginx
ENV SERVER_NAME=stackassignment-frontend.farandal.com
ENV PORT=80
ENV ACCESS_LOG=/usr/share/nginx/html/stackassignment-frontend.log
ENV ERROR_LOG=/usr/share/nginx/html/stackassignment-frontend.error.log
ENV ROOT=/usr/share/nginx/html
ENV ENV=production
COPY dist /usr/share/nginx/html
COPY stackassignment-frontend.template /etc/nginx/conf.d/stackassignment-frontend.template
RUN /bin/bash -c "envsubst < /etc/nginx/conf.d/stackassignment-frontend.template > /etc/nginx/conf.d/default.conf"
RUN touch /usr/share/nginx/html/stackassignment-frontend.log
RUN touch /usr/share/nginx/html/stackassignment-frontend.error.log
RUN echo "Nginx Default Config File:"
RUN cat /etc/nginx/conf.d/default.conf