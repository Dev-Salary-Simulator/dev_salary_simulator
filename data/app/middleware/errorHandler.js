const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Erreur lors de la récupération." });
};

module.exports = errorHandler;