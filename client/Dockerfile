# Stage 1: Base
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json .

# Stage 2: Development
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage 3: Build
FROM base AS build
RUN npm install
COPY . .
RUN npm run build

# Stage 4: Production
FROM node:22-alpine AS prod
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
