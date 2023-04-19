const jwt  = require('jsonwebtoken');

const { JWT_KEY } = process.env;

const checkToken = (req, res, next) => {
    // const token = req.headers['Authorization'];
    const token = req.headers['x-access-token'];

    // Vérification de l'existence du token
    if (!token) {
        return res.status(401).send('Aucun token fourni');
    }

    // Décodage du token
    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send('Erreur lors de la vérification du token');
        }

        // Si tout est bon, sauvegarder l'id du user pour une utilisation dans d'autres routes
        req.userId = decoded._id;
        next();
    });
};

module.exports = checkToken;