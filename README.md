# canright server

## Feature Overview

A lean multi-tenant web application server framework with support for:

- Two levels of tenants - franchise (site designer) / account (web site).
- Root admin may assign one or more franchise, each with one or more threads and controlling any number of accounts.
- First level tenants (site designer)
- multiple accounts and version snapshots and multiple domain instances per account.
- server side templated page server with compiled and cached moustache templates.
- client side agnostic server - supports all client side frameworks and libraries.
- wrapped markdown file server.
- supports data serialized in the filesystem as JSON or in mariaDb/mySql, mongoDb or Redis data repositories.
- static file server.

## Account Configuation

The target use case for this web server is that it be the hosting platform for a **provider** (a website designer / developer) with multiple client accounts.

The provider configures the domains for client accounts with the **domains.json** file in the server root folder.

Each entry in the domains.json account configuration file consists of the domain name to be served with these properties:

- **aid**: The Account ID.  This is the unique identifier for each client account.

- **vid**: The version (or instance) ID.  An account may have multiple instances.  The primary use case for this is a staged and live version.  The vid may also be used to take a 'snapshot' (or backup) of a site at a point.

- **db**: The database repository for the account.  This can be any of **json**, **yaml**, **maria**, **mongo**, or **redis**.  Json and Yaml indicate the text file format in the filesystem and are available by default.  Availability of the other three depend in installation of the respective databases.

- **www**: Also serve requests for the 'www' subdomain of the primary account domain?  True or False.  For example: if the domain is canright.net, will requests for www.canright.net also be served?

- **active**: Is this account active?  True or False.  This flag allows the provider to easily enable or disable the serving of a domain name.

The provider may configure a 'domain' named "default" to provide default values for missing properties in an any domain.  For example, if a domain has no db property, then the value of db for the default 'domain' is used.  So, a provider that wants to only support data expressed in the filesystem as json files can set the 'db' property of the default domain to 'json' and leave that property off all of the account domain entries.

Resources in the file system are accessed under the 'accts' subdirectory by the aid.  And each instance (or version) for the account is in a subdirectory of that.  So, for a domain with aid 'canright' and vid 'live', filesystem resources are accessed under 'accts/canright/live/*'.

Resources in a database are similarly keyed by the aid and vid like this:

mongoDb: collection: 'aid|vid|ext', key: basename.
mariaDb: table: aid_vid_ext, key: basename.
redis:   key: 'aid|vid|ext|basename'.

### Special File Types

#### Static Text Files Extensions

- html
- css
- js
- txt
- xml
- less - compiles to css on save
- md - markdown text
- hog - hogan moustache template

#### Static Blob Files

- jpg, jpeg
- gif
- png
- pdf
- ico

#### Static Data Resources

- json
- htm - data object for moustache template.
- hti - internal data object for moustache template.
- -md, -htm, -hog, -html, -js - meta data objects.

#### special processing

- less - compiles to css on save
- htm - server side templating
- hmd - wraps associated md document
- hog - compiled and cached on first use in instance.

#### REST/*

#### LOOK/*

## Processing HTM Request

- The htm resource is a data object (JSON in the filesystem or a record in mariaDb, mongoDb or Redis.
- The htm data resource may be augmented by a /site.hti site-wide data object.
- The data may also be augmented by a section.hti data object in the containing folder.
- The data may also be augmented by metadata for the htm resource (same filename with '-htm' file extension.
- The "skin" property identifies the hjs resource to use as a template.
- The hogan html product of the assembled data object and the hjs template is sent as the response to the request.
- HTI resources are not visible for direct http requests.

## Processing directory root requests

- Requests with no extension are treated as requests for folders.
- If the requested folder contains an index.htm resource, then the response is composed from that.
- Otherwise, if the folder contains an index.md resource, then the response will be for index.hmd.
- Otherwise, if the folder contains an index.html file, then it is served.

