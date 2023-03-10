FROM php:8.2.3-apache
RUN apt-get update -y \
&& apt-get -y install git


ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions intl pdo pdo_mysql gd opcache zip calendar dom mbstring zip gd xsl mongodb

COPY --from=composer/composer:latest-bin /composer /usr/local/bin/composer

# COPY /project /var/www/

# COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/projet

EXPOSE 80