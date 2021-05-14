

export const getApiUrl = () => {
    const developmentApiUrl = process.env.REACT_APP_LOCAL_API_URL;
    const productionApiUrl = process.env.REACT_APP_PRODUCTION_API_URL;

    return process.env.NODE_ENV === "development" ? developmentApiUrl : productionApiUrl
}