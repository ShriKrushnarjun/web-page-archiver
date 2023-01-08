FROM node:16
COPY ./ /var/movable/server
WORKDIR /var/movable/server
RUN echo "installing dependencies root" && npm install && tsc
CMD node ./dist/infinite.js