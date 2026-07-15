const API_KEY = process.env.EXPO_PUBLIC_MARKETAUX_API_KEY;

const BASE_URL = `https://api.marketaux.com/v1/news/all?language=en&api_token=${API_KEY}`;

export const getFinanceNews = async () => {
  try {
    const response = await fetch(BASE_URL);

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};