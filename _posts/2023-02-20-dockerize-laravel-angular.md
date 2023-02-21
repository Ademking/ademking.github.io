---
title: "Dockerize Laravel and Angular App"
date: 2023-02-20 01:00:00
categories: [docker, tutorial]
image: /assets/images/default-blog-post.png
---

Hello everyone, in this post we will learn how to dockerize a Laravel and Angular app.

## Project Structure

We will use the following project structure:

```
.
├── frontend
│   ├── Dockerfile <--- create this file
│   ├── .dockerignore <--- create this file
│   ├── ... (the rest of the angular app)
├── backend
│   ├── Dockerfile <--- create this file
│   ├── .dockerignore <--- create this file
│   ├── ... (the rest of the laravel app)
├── docker-compose.yml  <--- create this file
```

## Dockerize Laravel

### Dockerfile

```dockerfile
# start with our base image
FROM php:7.3.2-apache

# install all the system dependencies and enable PHP modules
RUN apt-get update \
	&& apt-get install -y openssl \
	&& apt-get install -y libmcrypt-dev \
	&& apt-get install -y nano \
    && apt-get install -y zip \
    && apt-get install -y unzip \
    && apt-get install libldap2-dev -y \
    && docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ \
    && docker-php-ext-install ldap \
    && apt-get install -y libzip-dev \
    && docker-php-ext-install zip \
	&& pecl install mcrypt-1.0.4 \
	&& docker-php-ext-enable mcrypt
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

#install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

# Install extensions
RUN docker-php-ext-install pdo mbstring pdo_mysql

#change uid and gid of apache to docker user uid/gid
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

#change the web_root to laravel /var/www/html/public folder
RUN sed -i -e "s/html/html\/public/g" /etc/apache2/sites-enabled/000-default.conf

# enable apache module rewrite
RUN a2enmod rewrite

RUN a2enmod headers
RUN sed -ri -e 's/^([ \t]*)(<\/VirtualHost>)/\1\tHeader set Access-Control-Allow-Origin "*"\n\1\2/g' /etc/apache2/sites-available/*.conf

#copy source files and run composer
COPY . /var/www/html

# install all PHP dependencies
RUN composer install --no-interaction

#change ownership of our applications
RUN chown -R www-data:www-data /var/www/html

# We didn't explicitly specify the CMD to tell Docker how to run our container.
# But the base-image (FROM php:7.1.5-apache)  has the command to run Apache in the foreground,
# we simply inherit the command.

# Telescope
RUN php artisan telescope:publish
```

### .dockerignore

```
.git
.idea
.vscode
node_modules
vendor
storage/framework/cache/**
storage/framework/sessions/**
storage/framework/views/**
storage/logs/**
```

## Dockerize Angular

### Dockerfile

```dockerfile
### stage 1 ###

# Use official node image as the base image
FROM node:10.15.3 as build

# Set the working directory
WORKDIR /app

COPY package.json /app

# Install all the dependencies
RUN npm cache clean --force
RUN npm install

# Add the source code to app
COPY . /app

# Generate the build of the application
RUN npm run build

### stage 2 ###

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80
```

### .dockerignore

```
node_modules

# others
.editorconfig
/e2e
npm-debug.log
README.md
LICENSE

# Docker
Dockerfile*
docker-compose*
.dockerignore

# Git
.git
.gitignore

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*
```

## docker-compose.yml

```yaml
version: "3"

services:
  frontend:
    image: frontend # Image name
    build:
      context: ./frontend # Dockerfile path
      dockerfile: Dockerfile # Dockerfile name
    tty: true # because sometimes the backend will be killed before the frontend end runs

    ports:
      - "80:80" # Ports mapping
    depends_on:
      - backend
    networks:
      - app

  backend:
    image: backend # Image name
    build:
      context: ./backend # Dockerfile path
      dockerfile: Dockerfile # Dockerfile name
    environment:
      DB_HOST: db
      DB_DATABASE: test
      DB_USERNAME: root
      DB_PASSWORD:
      APP_ENV: production
      APP_DEBUG: "true"
      MODE: PRODUCTION
    tty: true
    env_file: ./backend/.env
    ports: #apache is running on port 80
      - "8000:80" # Ports mapping
    depends_on:
      - db
    networks:
      - app

  db:
    image: mysql:5.7
    restart: always
    tty: true
    ports:
      - 3306:3306
    environment:
      - MYSQL_DATABASE=test
      - MYSQL_ALLOW_EMPTY_PASSWORD=1 # MYSQL_ROOT_PASSWORD is Empty
      - MYSQL_ROOT_PASSWORD=
      #- MYSQL_ROOT_HOST=127.0.0.1
      #- MYSQL_PASSWORD=
      #- MYSQL_USER=root
    # we mount a datavolume to make sure we don't loose data
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - app

volumes:
  db_data:

networks:
  app:
    driver: bridge # Bridge networks apply to containers running on the same Docker daemon host
```

## Run

1. Build docker images : `docker-compose build`

2. Generate containers : `docker-compose up -d`

3. Run Laravel Migrations:
   1. `docker ps` to get container id
   1. `docker exec -it [backend-container-id] bash`
   1. `php artisan migrate:fresh --seed`
4. To access mysql database:
   1. `docker exec -it [mysql-container-id] mysql -u root -p`
   1. `SHOW DATABASES;`
5. To stop running containers : `docker-compose down`
