FROM node:14-alpine

RUN apk add --no-cache bash g++ ca-certificates lz4-dev musl-dev cyrus-sasl-dev openssl-dev make python
RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash
RUN apk add libc6-compat
RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2

WORKDIR /dojot/nodejs
COPY src ./
COPY  certificates ./
COPY package*.json ./
COPY node_modules ./

RUN npm install

ENV LD_LIBRARY_PATH=/dojot/nodejs/node_modules/node-rdkafka/build/deps/

EXPOSE 3550

CMD ["npm", "start"]
