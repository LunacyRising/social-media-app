

export const getApiUrl = () => {
    return process.env.REACT_APP_PRODUCTION_API_URL || "http://localhost:5001";
}