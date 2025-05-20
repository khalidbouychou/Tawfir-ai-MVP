FROM php:8.1-fpm-alpine

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    libpq-dev \
    libzip-dev \
    zip \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy Symfony source (optional if mounted)
COPY . .

# Install PHP dependencies (optional if handled via docker-compose command)
RUN composer install

# Expose Symfony's PHP built-in server
EXPOSE 8000

# Start the Symfony dev server
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
