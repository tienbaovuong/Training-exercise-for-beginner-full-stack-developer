FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent 
RUN npm install react-scripts@4.0.3 -g --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
