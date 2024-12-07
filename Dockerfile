#pick a base image; in this case, Node.js version 22 is the foundation for the container
FROM node:22

#create a directory for our app
WORKDIR /app

#move over package.json
COPY ./package.json ./

#install packages; this seems to be like the CLI commands, this particular one will take a while
RUN npm install

#copy over the remaining files
COPY . .

#open port 3030
EXPOSE 3030

#run the application - node server.js
CMD ["node", "server.js"]