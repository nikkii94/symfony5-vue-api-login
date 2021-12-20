ARG PHP_VERSION
ARG PHP_FROM="php:$PHP_VERSION-fpm"

FROM $PHP_FROM

ARG APP_ENV
ARG PROJECT_ROOT

RUN apt-get update
RUN apt-get install -y autoconf pkg-config libssl-dev libzip-dev git gcc bash make libc-dev libicu-dev zip unzip \
    && docker-php-ext-install bcmath sockets intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN pecl install pcov \
    && docker-php-ext-enable pcov

WORKDIR $PROJECT_ROOT

RUN apt-get update && apt-get install -y gnupg

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y yarn

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# create composer cache directory
RUN mkdir -p /var/www/.composer && chown -R www-data /var/www/.composer

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony