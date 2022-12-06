import { API } from "./main";

export const Pairs = () =>
  API.get(`/pairs`);

export const HistoricData = (currency_id) =>
  API.get(`/historic-data/${currency_id}`);