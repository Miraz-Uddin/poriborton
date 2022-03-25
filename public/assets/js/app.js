import tempMemory from "./tempMemory.js";
import dataStorage from "./dataStorage.js";

const app = {
  loadSelectors() {
    const fromCurrency = document.querySelector("#fromCurrency");
    const fromAmount = document.querySelector("#fromAmount");
    const fromCountry = document.querySelector("#fromCountry");
    const toCurrency = document.querySelector("#toCurrency");
    const toAmount = document.querySelector("#toAmount");
    const toCountry = document.querySelector("#toCountry");
    return {
      fromCurrency,
      fromAmount,
      fromCountry,
      toCurrency,
      toAmount,
      toCountry,
    };
  },
  init() {},
};

export default app;
