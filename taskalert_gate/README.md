- Role of packages
    + Cors: Cross site access configuration
    + Helmet: Security, use middleware to add security configuration at http headers
    + Morgan: Http Logging level of informations

- Note
    * Service forwarding for: taskService, authService, notificationService ✅
    * Service routh protection route: apply jwtcheck middleware ✅
    * configure and test the gateway: ip rate limiting, server timeout check,
    * configure custom reponse page for 404 resource not found

- Configure route auth verifi
    * service: auth
        * unprotected route: /signup, /signin, /api/token-isblacklisted
    * service: task
        * unprotexted route: none
    * service: notfication
        * unprotexted route: none

    * Notes: /api/token-isblacklisted request comes from another service, assume the secure access ?!?!