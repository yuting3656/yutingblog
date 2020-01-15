---
layout: 'post'
title: 'Docker Matery: Section 5 作業阿～！！！ Named Volumes and Bind Mounts'
permalink: 'docker_matery/docker-sections4-hw-named-volumes-and-bind-mounts'
tags: udemy-docker docker-volumes
---

- section3-48, 49, 50, 51

## Udemy

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](https://www.udemy.com/course/docker-mastery/){:target="_back"}

- [GitHub: udemy-docker-mastery](https://github.com/BretFisher/udemy-docker-mastery){:target="_back"}

- [講師的YouTube](https://www.youtube.com/channel/UC0NErq0RhP51iXx64ZmyVfg){:target="_back"}

---
---
---


## Named Volumes 

- Database upgrade with containers
- Create a `postgres` container with named volume psql-data using versin `9.6.1`
- Use Docker Hub to learn `VOLUME` path and versions needed to run it 
- Checks logs, stop container
- Create a new `postgres` container with same named volume using `9.6.2`
- Check logs to validate 
- (this only works with path versions, most SQL DB's require manual commands to upgrade DB's to major/minor versions, i.e. it's a DB limitation not a container one)


## 看 Docker Hub 可以知道 Volume 會放在哪裡~

- Docker Hub 指出 Volume 位置:

   - `/var/lib/postgresql/data`

- 看 running container 的 log

   - `docker container logs -f psql`
   - `-f` follow 持續觀察

~~~
PS E:\> docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.1
13623a9ab0deaae2bbe5fcb1fe53198c3986de6f98cf295aeeecf265dd6bf3d4
PS E:\> docker container logs -f psql
The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.

The database cluster will be initialized with locale "en_US.utf8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.

fixing permissions on existing directory /var/lib/postgresql/data ... ok
creating subdirectories ... ok
selecting default max_connections ... 100
selecting default shared_buffers ... 128MB
selecting dynamic shared memory implementation ... posix
creating configuration files ... ok
running bootstrap script ... ok
performing post-bootstrap initialization ... ok
syncing data to disk ... ok

Success. You can now start the database server using:

    pg_ctl -D /var/lib/postgresql/data -l logfile start


WARNING: enabling "trust" authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run initdb.
****************************************************
WARNING: No password has been set for the database.
         This will allow anyone with access to the
         Postgres port to access your database. In
         Docker's default configuration, this is
         effectively any other container on the same
         system.

         Use "-e POSTGRES_PASSWORD=password" to set
         it in "docker run".
****************************************************
waiting for server to start....LOG:  could not bind IPv6 socket: Cannot assign requested address
HINT:  Is another postmaster already running on port 5432? If not, wait a few seconds and retry.
LOG:  database system was shut down at 2020-01-14 03:16:59 UTC
LOG:  MultiXact member wraparound protections are now enabled
LOG:  database system is ready to accept connections
LOG:  autovacuum launcher started
 done
server started
ALTER ROLE


/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*

waiting for server to shut down....LOG:  received fast shutdown request
LOG:  aborting any active transactions
LOG:  autovacuum launcher shutting down
LOG:  shutting down
LOG:  database system is shut down
 done
server stopped

PostgreSQL init process complete; ready for start up.

LOG:  database system was shut down at 2020-01-14 03:17:00 UTC
LOG:  MultiXact member wraparound protections are now enabled
LOG:  database system is ready to accept connections
LOG:  autovacuum launcher started
~~~


~~~
PS E:\> docker container logs -f psql2
LOG:  database system was shut down at 2020-01-07 11:17:19 UTC
LOG:  MultiXact member wraparound protections are now enabled
LOG:  database system is ready to accept connections
LOG:  autovacuum launcher started
~~~

## Bind Mounts

- Use a Jekyll "Static Site Generator" to start a local web server
- Don't have to be web developer: this is example of bridging the gap between local file access and apps running in containers
- source code is in the course repo under `bindmount-sample-1`
- We edit files with editor on our host using native tools 
- Container detects changes with host files and updates web server
- start container with `docker run -p 80:4000 -v $(pwd):/site bretfisher/jekyll-serve`
- Refresh our browser to see changes


~~~
PS E:\Udemy\Docker Mastery\udemy-docker-mastery\bindmount-sample-1> docker run -p 80:4000 -v e:/Udemy/"Docker Mastery"/udemy-docker-mastery/bindmount-sample-1:/site bretfisher/jekyll-serve
Unable to find image 'bretfisher/jekyll-serve:latest' locally
latest: Pulling from bretfisher/jekyll-serve
e7c96db7181b: Pull complete                                                                                                                                                                                        622c94c90cb1: Pull complete                                                                                                                                                                                        5ab26e9d8a17: Pull complete                                                                                                                                                                                        ca6c68ae65ab: Pull complete                                                                                                                                                                                        7c9302c54350: Pull complete                                                                                                                                                                                        c9ab5ec19677: Pull complete                                                                                                                                                                                        a725d9dbda62: Pull complete                                                                                                                                                                                        6f78ca13a909: Pull complete                                                                                                                                                                                        596a9c407a46: Pull complete                                                                                                                                                                                        Digest: sha256:5e2be6d03d137e9a724624118b2567931aff94e33ae9dabed34dc2626772e8be
Status: Downloaded newer image for bretfisher/jekyll-serve:latest
The dependency tzinfo-data (>= 0) will be unused by any of the platforms Bundler is installing for. Bundler is installing for ruby but the dependency is only for x86-mingw32, x86-mswin32, x64-mingw32, java. To add those platforms to the bundle, run `bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java`.
Fetching gem metadata from https://rubygems.org/...........
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
Fetching public_suffix 4.0.3
Installing public_suffix 4.0.3
Fetching addressable 2.7.0
Installing addressable 2.7.0
Using bundler 1.17.3
Using colorator 1.1.0
Using concurrent-ruby 1.1.5
Using eventmachine 1.2.7
Using http_parser.rb 0.6.0
Using em-websocket 0.5.1
Fetching ffi 1.11.3
Installing ffi 1.11.3 with native extensions
Using forwardable-extended 2.6.0
Using i18n 0.9.5
Using rb-fsevent 0.10.3
Fetching rb-inotify 0.10.1
Installing rb-inotify 0.10.1
Using sass-listen 4.0.0
Using sass 3.7.4
Using jekyll-sass-converter 1.5.2
Fetching listen 3.2.1
Installing listen 3.2.1
Using jekyll-watch 2.2.1
Using kramdown 1.17.0
Using liquid 4.0.3
Using mercenary 0.3.6
Using pathutil 0.16.2
Fetching rouge 3.14.0
Installing rouge 3.14.0
Using safe_yaml 1.0.5
Using jekyll 3.8.5
Fetching jekyll-feed 0.13.0
Installing jekyll-feed 0.13.0
Fetching jekyll-seo-tag 2.6.1
Installing jekyll-seo-tag 2.6.1
Fetching minima 2.5.1
Installing minima 2.5.1
Bundle complete! 4 Gemfile dependencies, 28 gems now installed.
Bundled gems are installed into `/usr/local/bundle`
Configuration file: /site/_config.yml
       Deprecation: The 'gems' configuration option has been renamed to 'plugins'. Please update your config file accordingly.
            Source: /site
       Destination: /site/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.531 seconds.
 Auto-regeneration: enabled for '/site'
    Server address: http://0.0.0.0:4000/
  Server running... press ctrl-c to stop.
[2020-01-14 03:44:51] ERROR `/favicon.ico' not found.
      Regenerating: 1 file(s) changed at 2020-01-14 03:45:34
                    _posts/2017-03-05-welcome-to-jekyll.markdown
       Jekyll Feed: Generating feed for posts
                    ...done in 0.4334158 seconds.
~~~