const protectedServices = [
    {
        route: '/task', 
        target: 'http://localhost:8001/'
    },
];
const otherServices = [
    {
        route: '/auth', 
        target: 'http://localhost:8003/'
    }
];

module.exports.services = [protectedServices, otherServices];