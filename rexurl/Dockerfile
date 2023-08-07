FROM node:alpine

WORKDIR /usr/src/app

# Copy files to the container
COPY ./ ./

RUN npm install

ENV NODE_ENV production

CMD ["npm", "start"]

EXPOSE 8080
