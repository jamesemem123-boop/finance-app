import { currencyMap } from "./currencyMap";


const API_KEY = process.env.EXPO_PUBLIC_MARKETAUX_API_KEY;
const CURRENCY_FREAKS_KEY =
  process.env.EXPO_PUBLIC_CURRENCYFREAKS_API_KEY;
  console.log("CurrencyFreaks Key:", CURRENCY_FREAKS_KEY);

const BASE_URL = `https://api.marketaux.com/v1/news/all?language=en&api_token=${API_KEY}`;
const EXCHANGE_RATE_URL =   `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${CURRENCY_FREAKS_KEY}`;;

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

export const getExchangeRates = async () => {
  try {
    const response = await fetch(EXCHANGE_RATE_URL);

    const data = await response.json();

    console.log("CurrencyFreaks:", data);

    if (data.rates) {
      return {
        conversion_rates: Object.fromEntries(
          Object.entries(data.rates).map(([key, value]) => [
            key,
            Number(value),
          ])
        ),
      };
    }

    return {
      conversion_rates: {},
    };
  } catch (error) {
    console.log("Error in getExchangeRates:", error);

    return {
      conversion_rates: {},
    };
  }
};