import Constants from 'expo-constants';

const { apiUrl, newsApiKey, category, pageSize } = Constants.expoConfig?.extra || {};

export const getAllNews = async (pageParam: number) => {
    const response = await fetch(
        `${apiUrl}?category=${category}&apiKey=${newsApiKey}&page=${pageParam}&pageSize=${pageSize}`
    );
    if (!response.ok) 
        throw new Error(response.statusText);

    return response.json();
};
