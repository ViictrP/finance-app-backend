FROM node:18
# Copying app
COPY . ./usr/src/app
# Defining the working directory
WORKDIR /usr/src/app
# Installing dependecies
RUN npm i -g husky
RUN npm i -g prisma
RUN npm i -g typescript
RUN npm ci
RUN npm run build
# Defining environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV TOKEN_HEADER_KEY=$TOKEN_HEADER_KEY
ENV PORT=$PORT
# Exposing the application
EXPOSE $PORT
# Running the application
ENTRYPOINT [ "npm", "start" ]
