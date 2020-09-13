FROM node:12.18.3

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . ./

CMD ["yarn", "start"]