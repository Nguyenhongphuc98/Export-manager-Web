# syntax=docker/dockerfile:1

FROM node:18
WORKDIR /app
COPY . .
RUN yarn install 
# RUN yarn run build
CMD ["yarn", "dev"]
EXPOSE 3000