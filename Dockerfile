# syntax=docker/dockerfile:1

FROM node:18
WORKDIR /app
COPY . .
RUN yarn install --production
# RUN yarn run build
CMD ["yarn", "start"]
EXPOSE 3000