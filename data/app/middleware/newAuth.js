const axios = require('axios');

const newAuth = async (req, res, next) => {
    try {
        req.userId = await axios.get('http://auth_symfony/api/auth/auto', {
            headers: {
                'Authorization': req.headers.authorization
            }
        }).then(
            (response) => {
                return response.data.user.id;
            }
        );

        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
}

module.exports = newAuth;