FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git unzip curl libpq-dev libonig-dev libxml2-dev zip \
    libzip-dev libpng-dev libjpeg-dev libfreetype6-dev

RUN docker-php-ext-install pdo pdo_mysql zip gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
