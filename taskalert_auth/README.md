# Functionnalities

- Auth func
    * register user ✅
    * sign in user ✅
        * generate jwt token ✅
    * signout user ✅
        * blacklist a jwt token ✅
    * api gateway token verification api ✅
        * token isblacklisted verification ✅
    * refresh a token

- Notes:
    * we refresh a token when the user is still logged but the token has arrived to expiration, without him having to authenticate again


# CUSTOM CODE TO REFRESH ACCESS TOKEN: 
- the access token has expired but the refresh token is still valid
- Detect if a token is about to expire(treshold time based on token expiration time) and refresh the access token
- which policy is a better practice ???

    const jwt = require('jsonwebtoken');
    const accessToken = 'your_access_token_here';

    // Decode the access token to extract the expiration time
    const decodedToken = jwt.decode(accessToken, { complete: true });
    const expirationTime = decodedToken.payload.exp;

    // Calculate remaining time until expiration
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const remainingTime = expirationTime - currentTime;

    // Define a threshold (e.g., 5 minutes) before expiration
    const threshold = 300; // 5 minutes in seconds

    if (remainingTime < threshold) {
        console.log('Access token is about to expire. Refresh the token.');
        // Add code here to refresh the access token
    } else {
        console.log('Access token is still valid.');
}




# CUSTOM SCRIPT TO SHARE TOKEN SECRET: LATER FOR DEPLOYMENT ENV CONFIG

const { exec } = require('child_process');
const fs = require('fs');

// Command to generate a new token
const generateTokenCommand = 'npm run newtoken';

exec(generateTokenCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }

    // Extract the new token from stdout
    const newToken = stdout.trim();

    // Read the existing environment file
    let envFileContent = fs.readFileSync('path/to/env/file', 'utf8');

    // Update the token value in the environment file
    envFileContent = envFileContent.replace(/TOKEN=.*$/, `TOKEN=${newToken}`);

    // Write the updated content back to the environment file
    fs.writeFileSync('path/to/env/file', envFileContent);

    console.log('New token generated and updated in the environment file.');
});
