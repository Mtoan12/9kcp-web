const responseSuccessfulRegister = () => {
    return {
        statusCode: 201,
        message: 'Tạo tài khoản thành công',
    };
};
const responseSuccessfulLogin = () => {
    return {
        statusCode: 200,
        message: 'Đăng nhập thành công',
    };
};

const responseSuccessfulLogout = () => {
    return {
        statusCode: 200,
        message: 'Đăng xuất thành công',
    };
};

const responseRefreshToken = () => {
    return {
        statusCode: 200,
        message: 'Làm mới Access token',
    };
};

const responseStrategy = {
    register: responseSuccessfulRegister,
    login: responseSuccessfulLogin,
    logout: responseSuccessfulLogout,
    refreshToken: responseRefreshToken,
};

const setTokensCookie = (req, res, next) => {
    const { accessToken, refreshToken, actionType } = req;

    const ACCESS_TOKEN_MAX_AGE = 60 * 60 * 1000;
    const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

    if (accessToken && refreshToken) {
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: ACCESS_TOKEN_MAX_AGE,
            secure: true,
            sameSite: 'none',
            // domain: 'https://kicap.vercel.app',
        });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: REFRESH_TOKEN_MAX_AGE,
            secure: true,
            sameSite: 'none',
            // domain: 'https://kicap.vercel.app',
        });
    }

    const { statusCode, message } = responseStrategy[actionType]() || {
        statusCode: 500,
        message: 'Lỗi không xác định',
    };

    res.status(statusCode).json({
        success: true,
        message,
    });

    next();
};

module.exports = setTokensCookie;
