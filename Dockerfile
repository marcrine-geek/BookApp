FROM node:16-alpine

WORKDIR /app

# Copy and download dependencies
COPY package.json package-lock.json ./
RUN yarn --frozen-lockfile

# Copy the source files into the image
COPY . .

EXPOSE 5000

CMD npm start
