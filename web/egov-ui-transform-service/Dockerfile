FROM node:8.12-alpine
# File Author / Maintainer
LABEL authors="Sivaprakash Ramasamy <sivaprakash.ramasamy@tarento.com>"

COPY . /
# Set work directory to /www
WORKDIR /

RUN npm install
# set your port
ENV PORT 8080
# expose the port to outside world
#EXPOSE  8080

# start command as per package.json
CMD ["npm", "start"]
