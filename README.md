# canright server

A lean web application server framework with;

- Configurable multi-account website server.
- Each account may support multiple versions of filesystem and database resources.


versioning and stagingith version segmented resources.

  Filesystem and database resources are indexed by account id and version id.



stage id (eg: 'stage', live'

- with meta data for all resoures
- with special markdown integration (.hmd wraps .md)
- with hogan server side templates (.htm + .hjs => .html)

## Segmented Resources

- Nice segments resources as public or internal to enhance security.
- Nice segments resources for server providers and for site content managers because each has different life cycles.
- Nice segments resources as static or dynamic for performance.

The permutations of possible segment propertiess might be represented like this:

 (PUB|INT) + (STA|DYN) + (PROV|SITE)

Which works out to these 5 useful resource segments:

PUBSTASITE Public Static Site content filesystem resources:
  - PUBSTA_BLOB Blob: jpeg, jpg, gif, png, pdf, ico
  - PUBSTA_TEXT Text: txt, xml
  - PUBSTA_MD   Text: md

PUBSTAPROV Public Static Provider filesystem resources:
  - PUBSTA_CODE Text: html, css, js
  - PUBSTA_JSON Json: json

PUBDYNSITE Public Dynamic site.db key/value lookup resources:
  - PUBDYN_HTM  Json: htm (+ hjs -> html)
  - PUBDYN_META LkUp: -md, -htm, -jpg, ...
  - PUBDYN_LOOK LkUp: /look/any|key
  - PUBDYN_HMD  Virt: hmd (wraps corresponding md in fs)

INTSTAPROV Server (static) Internal filesystem resources:
  - INTSTA_CODE Text: hjs, styl
  - INTSTA_HJX  Json: hjx

INTDYNPROV Public Dynamic prov.db key/value lookup resources:
  - INTDYN_JSON LkUp: json
  - INTDYN_HJX  LkUp: hjx

Requests for public static resources (PUBSTASITE & PUBSTAPROV) might be served by ngInx, but if they are forwarded to node, nice will serve them.

In the filesystem resources are addressed as:

  ../zone/aid/ver/path

So a request for /proveit.md would be found in the file system at:

  ../pubstasite/nice/s0-0/proveit.md

In the database, resources are addressed as:

  ..zone|aid|ver|key

  So a request for /look/key jwould be found with a lookup with this key:

  ..|pub


So, Public Data resources would be found in the file system at:

  ../publidata/niceproof/d0.0/hello.html

  Where ver is the did from /domains.json.

  And key



path.join(sZon, req.dom.aid, sVid, sRel

staticcode
  - Public Dynamic Data folder: /look/* (* is key to json data)
- optional nginx proxy for public static resources.
- md is interpreted on the client.
- hmd wraps corresponding md with hjs skin.
- htm access json data for hjs template to respond with html page

The nice stack:

* javascript / json
* node / npm / es6(2015)
* git
* express (with body-parser, cookie-parser, serve-favicon, morgan)
* eslint
* gulp
* stylus
- sockets.io
- nginx
- typescript?
- designer text (html5, css3, md, hogan)


nice builds on this stack:

A nice server side developer works with this stack:

- javascript
- node / npm / es6(2015)
- git
- express (with body-parser, cookie-parser, serve-favicon, morgan)
- eslint
- gulp
- sockets.io
- nginx
- typescript?

A nice server administor works with this stack:

- javascript
- gulp
- nginx
- md
- json

A nice site designer works with:
- html5
- stylus
- hogan/hjs
- md
- json

A nice content manager works with:
- md
- json


- git
- node/npm/es6
- express (with body-parser, cookie-parser, serve-favicon, morgan)
- eslint
- gulp

- mysql
- mongodb

- client md
- angular? / react?

Developer cares about 
- git
- node/npm/es6
- express (with body-parser, cookie-parser, serve-favicon, morgan)
- eslint
- gulp






==========================

Supported Extensions: html, htm, hjs, css, json, js, md, jpeg, jpg, gif, png, pdf.

Requests for static text resources with these extensions are sendFile streamed directly as the response:

- html 
- css
- json
- js
- md

Requests for static blob resources with these extensions are streamed directly as the response

- jpeg
- jpg
- gif
- png
- pdf
- ico

Other extensions:

- less generates corresponding css on change.

- htm - data with hjs hogan template yields html response
- hjs - A hogan html template file.  Contains hogan encoded html text.
- hjx - An index of the properties referenced by the corresponding hjs.
- -ext - any resource with a valid extension preceded by a dash is public meta-data for the corresponding resource (eg abc.-md, abc.-htm, abc.-jpg, ...)

- hmd - skins md file for account.

## Processing an htm request

- The htm file is JSON.encoded data object.
- It contains, at least, a property named "hjsTemplate".
- Other properties might be data referenced by the hjs template used to compute the response.
- The "hjsTemplate" property identifies the hjs resource to use as a template.
- The hogan html product of the htm data and the hjs template is sent as the response to the request.
- An account might save the html output to a corresponding static text resource with an html extension.
- an htm file might be validated for its hjs and hjx files.
- How do we catch missing hjs properties in htm and other data files.




Requests with no extension are treated as requests for folders.
Requests for resources with unsupported extensions are rejected (403).
Requests for folders are resolved within the folder with index.html | index.htm.

Resources can be classed by these three charactaristics:

- static  or dynamic : Clear static are served by node.public.
                       Clear dynamic resources are served by node.clear.
                       Clear static resources might be proxied by nginx.
- code    or data    : Code is cloned for new versions that inherit the reference to data (content).
                       Version and backup code and data independently.
                       Code and data might have different owners.
- clear   or vault   : Clear information is open and unsecure.
                       Vault information is secured and static vault resources probably can not be proxied.

For our purposes, supported requests are served from these resources:

## requests to vault for priva static resources are securely served by node.priva.  Might private static resources be securely served by nginx?
-= static  code - json js html hjs css /index.html = /priva/code/AID/CID/*
-= static  code -      md jpeg jpg gif png pdf     = /priva/code/AID/CID/*
-= static  data - json md jpeg jpg gif png pdf     = /priva/data/AID/DID/*

## requests to vault for vault dynamic resources are securely served by node.vault.
-= dynamic code - json js htm /index.htm           = /vault/code/AID/CID/*
-= dynamic data - json                             = /vault/data/AID/DID/*

## requests to root for public static resources are served by node.publi.  These might be proxied by nginx.
-= static  code - json js html hjs css /index.html = /publi/code/AID/CID/*
-= static  code -      md jpeg jpg gif png pdf     = /publi/code/AID/CID/*
-= static  data - json md jpeg jpg gif png pdf     = /publi/data/AID/DID/*

## requests to root for clear dynamic resources are served by node.clear.
-= dynamic code - json js htm /index.htm           = /clear/code/AID/CID/*
- dynamic data - json                              = /clear/data/AID/DID/*


- insecure json resources are served from: public static code | public static data | clear dynamic code | clear dynamic data.
- insecure js resources are served from: public static code | clear dynamic code.

- Public static should be proxied by nginx and served from the publi folder.
- Node.clear also serves public static resources - it stands without a proxy.
- All vault resourses are passed through the nginx proxy to node.vault.
- Requests for dynamic resources are passed through the proxy to node.


Code and data are backed up and versioned independently.
A new version of a website clones the code (static and dynamic), but not the content.
The new cloned version will use the same content as the parent version of the site.

---------------------

## directory defaults

- if index.html is found, respond with that.
- otherwise, if index.htm is found, respond with that.
- otheerwise, if index.md is found, respond with index.hmd

-------------------------------------
nice
  sites
    clear
      code
        aid
          stage - json js htm                                  /index.htm
      data
        aid
          test  - json
    priva
      code
        aid
          stage - json js html hjs css md jpeg jpg gif png pdf /index.html
      data
        aid
          test  - json                 md jpeg jpg gif png pdf
    publi
      code
        aid
          stage - json js html hjs css md jpeg jpg gif png pdf /index.html
      data
        aid
          test  - json                 md jpeg jpg gif png pdf
    vault
      code
        aid
          stage - json js htm                                  /index.htm
      data
        aid
          test  - json
-------------------------------------
/nice/sites/publi/code/aid/stage - json js html hjs css md jpeg jpg gif png pdf /index.html
/nice/sites/priva/code/aid/stage - json js html hjs css md jpeg jpg gif png pdf /index.html
/nice/sites/publi/data/aid/test  - json                 md jpeg jpg gif png pdf
/nice/sites/priva/data/aid/test  - json                 md jpeg jpg gif png pdf
/nice/sites/clear/code/aid/stage - json js htm                                  /index.htm
/nice/sites/vault/code/aid/stage - json js htm                                  /index.htm
/nice/sites/clear/data/aid/test  - json
/nice/sites/vault/data/aid/test  - json
-------------------------------------

Resources may be in the clear or in the vault.

Clear resources are open, public, and insecure and are served from '/clear'.

Vault resources are secure and are served from '/vault'.

# Core Allocation?

- 0 nginx
- 1 mongodb
- 2 filesystem?
- 3 node clear
- 4 node vault
- 5 console

# NGINX

nginx rejects (with 403) requests for all unsupported extensions.

nginx serves:

- static text    from '/clear'
- static blob    from '/clear'
- static dynatic from '/clear'
- static folder  from '/clear/ with  static text from index.html, if found in the folder.

nginx forwards to node requests for:

- vault resources (what security can nginx provide to enable vault static resources to be served?)
- dynamic dynatic
- dynamic text
- dynamic folder if it has no index.html.

nginx rejects (with 404) unserved and unforwarded requests for supported extensions.

# Node Clear

Only node vault serves resources in the vault from the '/vault/' fs folder.
All other resources are served from the /clear/ fs folder.

Node clear serves:

  if no proxy:
  - static  text
  - static  blob
  - static dynatic if it exists
  - static folder  index.html if it exists

  primarily:
  - dymatic dynatic
  - dynamic text
  - dynamic folder

# Node Vault

Node vault serves:

  - static  text
  - static  blob
  - static dynatic if it exists
  - static folder  index.html if it exists

  - dymatic dynatic
  - dynamic text
  - dynamic folder

node rejects (with 403) requests for all unknown extensions.
node rejects (with 404) unserved for known extensions.
