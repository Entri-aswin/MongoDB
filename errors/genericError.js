const handleGenericErrors = (error, req, res, next) => {
    try {
        const statusCode = error.statusCode || 500;
        const message = error.message || "something went wrong, please try againg";

        return res.status(statusCode).json({
            message: message,
        });
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
        });
    }
};

module.exports = { handleGenericErrors };
