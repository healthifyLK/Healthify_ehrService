// Helper function to build and validate query parameters
const buildQueryParams = (params) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if(value !== undefined && value !== null) {
            queryParams.append(key, value);
        }
    });
    return queryParams.toString();
};

module.exports = { buildQueryParams };