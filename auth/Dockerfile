FROM php:8.2.3-apache
RUN apt-get update -y \
&& apt-get -y install git nano


ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions intl pdo opcache zip calendar dom mbstring mongodb

COPY --from=composer/composer:latest-bin /composer /usr/local/bin/composer

COPY /projet /var/www/projet

# COPY ./apache.conf /etc/apache2/sites-available/000-default.conf
WORKDIR /var/www/projet/

RUN chown -R www-data:www-data /var/www/projet
RUN chmod -R 755 /var/www/projet
USER www-data

RUN composer install
RUN php bin/console c:c && \
php bin/console doctrine:cache:clear-metadata && \
php bin/console doctrine:cache:clear-query && \
php bin/console doctrine:cache:clear-result && \
php bin/console doctrine:mongodb:generate:hydrators && \
php bin/console lexik:jwt:generate-keypair --overwrite

EXPOSE 3001