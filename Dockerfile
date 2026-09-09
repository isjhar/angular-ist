# --- Stage 1: Build Stage ---
FROM node:22-alpine AS build
WORKDIR /app

# Create a build argument that defaults to 'production' if not passed
ARG BUILD_ENV=production

COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Use the argument in the build command
RUN npm run build -- --configuration=${BUILD_ENV}

# --- Stage 2: Serve Stage (Stays exactly the same) ---
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf

# replace template-web to project name
COPY --from=build /app/dist/template-web/browser/id /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
