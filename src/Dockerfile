# TODO: FIGURE OUT HOW THIS WORKS WITH TYPESCRIPT
# pull a node image from docker hub
FROM node:10 

# set the working dir to /app
WORKDIR /app 

# copy package.json to the container
COPY package.json package.json 

# install package.json modules in container
RUN yarn install 

# copy everything to container /app
COPY . . 

# expose port 3001 to mount it to another port in local machine 
EXPOSE 3001

# start server inside container
CMD [ "yarn", "start" ] 