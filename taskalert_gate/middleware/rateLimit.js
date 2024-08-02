const rateLimit = 20;
const interval = 60 * 1000;

// Object to store request counts for each IP address
const requestCounts = {};

// Reset request count for each IP address every 'interval' milliseconds
setInterval(() => {
    Object.keys(requestCounts).forEach((ip) => {
      requestCounts[ip] = 0; // Reset request count for each IP address
    });
}, interval);


/** ========== Two types of rate limiting ===========
 * Ip address rate limiting
 * User rate limiting (free plan)
*/
function ipRateLimiting(req, res, next){
  // Get client IP address
  const ip = req.ip; 
  // Update request count for the current IP
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  // Check if request count exceeds the rate limit
  if (requestCounts[ip] > rateLimit) {
    // Respond with a 429 Too Many Requests status code
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  next();
}

module.exports = {ipRateLimiting};