FROM node:alpine
COPY . /app/
WORKDIR /app
#EXPOSE 80
RUN npm install
CMD ["npm", "start"]