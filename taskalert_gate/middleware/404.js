// extract the route from the req url
// get the list of registered service route,
// if url route exit next, else return 404
const registeredServices = require('../routes');

let registeredServiceRoutes=[];
registeredServices.services.map((service) => {return service ;})
    .map((s)=> {
        s.forEach(({route, target})=>{
            registeredServiceRoutes.push(route) ;
        });
    });


function serviceNotFOund(req, res, next){
    let requestedRoute = req.originalUrl.split('/');

    if(registeredServiceRoutes.includes('/'+requestedRoute[1])) next();
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Service Route not found.",
        data: null,
    });
}

module.exports = {serviceNotFOund};