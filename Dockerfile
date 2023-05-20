FROM node:16
# Defining the working directory
WORKDIR /usr/src/app
# Copying app
COPY . .
# Installing dependecies
RUN npm i -g husky
RUN npm i -g prisma
RUN npm ci --omit=dev
# Defining environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV TOKEN_HEADER_KEY=$TOKEN_HEADER_KEY
ENV PORT=$PORT
# Exposing the application
EXPOSE 8080
# Running the application
CMD [ "npm", "start" ]
