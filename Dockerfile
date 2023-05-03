FROM node:16-alpine
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 3007

CMD ["npm","start"]
