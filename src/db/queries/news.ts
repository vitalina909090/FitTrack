import Constants from 'expo-constants';

const { apiUrl, newsApiKey, category, pageSize } = Constants.expoConfig?.extra || {};

export const getAllNews = async (pageParam: number) => {
    const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=sports&apiKey=f0f049197f6c4e9499206911093dd261&page=${pageParam}&pageSize=1`
    );
    if (!response.ok) 
        throw new Error(response.statusText);

    return response.json();
};
