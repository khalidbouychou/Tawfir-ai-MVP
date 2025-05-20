FROM node:18

WORKDIR /app

COPY package*.json ./frontend/

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"] 