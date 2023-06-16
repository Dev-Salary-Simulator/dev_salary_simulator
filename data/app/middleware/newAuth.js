const axios = require('axios');

const newAuth = async (req, res, next) => {
    try {
        req.userId = await axios.get('http://api.localhost:3001/api/auth/auto', {
            headers: {
                'Authorization': req.headers['x-access-token']
            }
        }).then(
            (response) => {
                return response.data.user._id;
            }
        );

        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
}

module.exports = newAuth;