FROM node:16
# Defining the working directory
WORKDIR /usr/src/app
# Copying app
COPY ./ .
COPY package.json package.json
RUN ls
# Installing dependecies
#RUN npm i -g husky
#RUN npm i -g prisma
# Defining environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV TOKEN_HEADER_KEY=$TOKEN_HEADER_KEY
ENV PORT=$PORT
# Exposing the application
EXPOSE $PORT
# Running the application
CMD [ "npm", "start" ]
