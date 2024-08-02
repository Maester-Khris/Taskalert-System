const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const servicesGroup = require('./routes');
const authMidlleware = require('./middleware/jwtAuth');
const requestCheck = require('./Middleware/rateLimit');
const serverCheck = require('./Middleware/timeoutCheck');
const httpError = require('./middleware/404');

const PORT = process.env.PORT | 8000;

// express | cors | security | logging | serverinfo |
app = express();
app.use(cors());
app.use(helmet()); 
app.use(helmet.hidePoweredBy())
app.use(morgan("combined")); 

// server overload | server response time
app.use(requestCheck.ipRateLimiting);
app.use(serverCheck.timeoutCheck);
// app.use(httpError.serviceNotFOund);

/** =========== Redesign service route proxifying ===============
 * 2 group of service auth mandatory and conditional auth based on path
 * every other service have all their route protected apat [auth/signup, auth/signin]
*/
let protectedgroup = servicesGroup.services[0];
let othergroup = servicesGroup.services[1];
protectedgroup.forEach(({route, target})=>{
    const proxyOptions = {
        target,
        changeOrigin:true,
        pathRewrite: {
            [`^${route}`] : "",
        },
    };
    const custom_midlleware = [requestCheck.ipRateLimiting, authMidlleware.jwtauth];
    app.use(route, ...custom_midlleware, createProxyMiddleware(proxyOptions));
});
othergroup.forEach(({route, target})=>{
    const proxyOptions = {
        target,
        changeOrigin:true,
        pathRewrite: {
            [`^${route}`] : "",
        },
    };
    const custom_midlleware = [requestCheck.ipRateLimiting];
    const authRouter = express.Router();
    const protectedRoutes = ['/signout', '/users'];

    protectedRoutes.forEach((protectedRoute) => {
        authRouter.use(protectedRoute, authMidlleware.jwtauth, (req, res, next) => {
            next();
        });
    });
    app.use(route, authRouter);
    app.use(route, ...custom_midlleware, createProxyMiddleware(proxyOptions));
});


// Routing and serving directly from the gateway ...
app.get("/",(req,res)=>{
    res.write("API Gateway functionning");
    res.end();
});
app.listen(PORT, ()=>{
    console.log(`Taskalert api gateway live on port ${PORT} and ready to forward`);
});