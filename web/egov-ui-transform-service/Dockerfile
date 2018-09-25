FROM node:8.12-alpine
# File Author / Maintainer
LABEL authors="Sivaprakash Ramasamy <sivaprakash.ramasamy@tarento.com>"

COPY src /srv/
COPY mode_modules /srv/
COPY dist /srv/
CMD ls -ltr /srv
# Set work directory to /www
WORKDIR /srv

# set your port
ENV PORT 8080
# expose the port to outside world
#EXPOSE  8080

# start command as per package.json
CMD ["npm", "start"]
