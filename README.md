# Conflux Ecosystem Portal
For Conflux ESpace ecosystem (EVM)

<img width="1754" alt="banner" src="https://cfx.tools/eco.jpg">

User Interface is located at `web` directory.

Public frontend directory is located at `public` directory.

Backend fetcher is located at `fetcher` directory. 

Database is located at `db` directory.

Log files are located at `log` directory.

## Bootstrap

1. Install latest Apache or Nginx with PHP version 8.1+. Also install at least following packages for PHP:
- Curl package for PHP
- Json package for PHP
- ImageMagick package for PHP
- CLI package for PHP

2. Clone the code from Github, and install the dependencies with php composer
```sh
$ git clone https://github.com/ni0c/conflux-ecosystem-portal.git
```

3. Install composer for php.
4. At the cloned git directory run following command:
```sh
$ php composer.phar update
```

## Enable Crontab for backend fetcher

Add following line to crontab for a user that has write access to the `db` and `public/pub` directories:
(Command for editing crontab is: `crontab -e`)
```
0 0 * * * /usr/bin/php [PATH_TO_ECO]/fetcher/cron.php 2>&1 >>[PATH_TO_ECO]/log/crontab.log.`date '+%Y-%m'`
```

## Setup with Apache/Nginx

1. Enable SSL certificate on your domain in your apache/nginx site config (You get free one from Lets Encrypt)
2. Use the directory path of the `public` directory in the apache/nginx site config as the main directory for files
3. Add http server's group read/write/access rights for the `public/pub`, `log` and `db` directories. If these directories are missing, add them manually with `mkdir` command.
4. Create a github login API key for the site with your github account (This enables Github login)
5. Create a cloudflare statistics API key for the site to track the visitors
6. Set up project's `web/.env` file with correct paths, API keys and domains
7. Add yourself to be a mod to `db` directory with the username of your github the following way:
- Filename: [GITHUB_USERNAME].json
- Add text:
```
{"username":"[GITHUB_USERNAME]","email":"EMAIL_ADDRESS"}
```
(The above must be a valid JSON)

## Logs

Logs are created from backend fetcher crontab to `log` directory.

## Local testing

After successful set up of the site from the above steps. You can test the site with web browser of your choosing from the domain name you set it up for. Mobile, tablet and PC web browser should have the same functionality.