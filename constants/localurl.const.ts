export const LOCAL_URL = 
    process.env.NODE_ENV === 'development' 
    ? "http://127.0.0.1:3000/api/dailies" 
    : 'https://dailies.kristensen.dev/api/dailies';