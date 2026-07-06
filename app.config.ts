import 'dotenv/config';

export default {
  expo: {
    extra: {
        apiUrl: process.env.API_URL,
        newsApiKey: process.env.NEWS_API_KEY,
        category: process.env.CATEGORY,
        page: process.env.PAGE,
        pageSize: process.env.PAGE_SIZE,
    },
  },
};