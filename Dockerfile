# --------------> The build image
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev
 
# --------------> The production image
FROM node:lts-alpine
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/app
USER node
COPY --chown=node:node --from=build /usr/src/app/config /usr/src/app/config
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
CMD ["dumb-init", "node", "dist/index.js"]

# choose node image version appropriately
# command to build and run the image
# docker build . -t furrl-server
# docker run -d -p 5000:5000 --name furrl-server furrl-server
