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
    const messageDisplay = document.querySelector("#messageDisplay");
    return {
      fromCurrency,
      fromAmount,
      fromCountry,
      toCurrency,
      toAmount,
      toCountry,
      messageDisplay,
    };
  },
  getInputValues() {
    const { fromAmount, fromCountry, toAmount, toCountry } =
      this.loadSelectors();
    const amountFrom = fromAmount.value;
    const countryFrom = fromCountry.value;
    const amountTo = toAmount.value;
    const countryTo = toCountry.value;
    return { amountFrom, countryFrom, amountTo, countryTo };
  },
  validateInputValues(amountFrom, amountTo) {
    let bool = false;
    let bool1 = false;
    let bool2 = false;

    if (Boolean(amountFrom)) bool1 = true;
    if (Boolean(amountTo)) bool2 = true;
    if (bool1 || bool2) bool = true;

    this.displayMessage(bool, "Please Fill at Least 1 field");
    return bool;
  },
  takeOnlyInteger(obj) {
    let datam = parseInt(obj.value);
    if (Boolean(datam) == true && datam >= 0) {
      obj.value = datam;
      return true;
    }
    obj.value = "";
    return false;
  },
  displayMessage(type, msg) {
    const { messageDisplay } = this.loadSelectors();
    messageDisplay.innerHTML = "";
    if (type == false)
      messageDisplay.insertAdjacentHTML(
        "afterbegin",
        `<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>${msg}</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
      );
  },
  async currencyConvert(amount, serial) {
    const { countryFrom, countryTo } = this.getInputValues();

    dataStorage.fromCurrency = countryFrom;
    dataStorage.toCurrency = countryTo;
    if (serial == 1) {
      dataStorage.fromCurrency = countryTo;
      dataStorage.toCurrency = countryFrom;
    }

    let currencyRate = 1;
    if (countryFrom != countryTo) {
      const currencyRateObject = await dataStorage.fetchRate();
      currencyRate = Object.values(currencyRateObject)[0];
    }

    if (Boolean(parseFloat(amount)) == true && parseFloat(amount) >= 0)
      return parseFloat(amount) * currencyRate;
    else return 0 * currencyRate;
  },
  generateDropdown(obj) {
    const { fromCountry, toCountry } = this.loadSelectors();
    const countriesObject = obj.results;
    const dropDown = Object.values(countriesObject)
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(
        (a) =>
          `<option value="${a.currencyId}" ${
            a.name === "Bangladesh" ? "selected" : ""
          }> ${a.name} (${a.currencyName})</option>`
      )
      .join("");
    fromCountry.innerHTML = "";
    toCountry.innerHTML = "";
    fromCountry.insertAdjacentHTML("afterbegin", dropDown);
    toCountry.insertAdjacentHTML("afterbegin", dropDown);
  },
  init() {
    dataStorage.apiSecret = "ac5a9d9ad8e1824834e5";
    const { fromAmount, fromCountry, toAmount, toCountry } =
      this.loadSelectors();

    fromAmount.addEventListener("keyup", async (e) => {
      e.preventDefault();
      this.takeOnlyInteger(fromAmount);
      toAmount.value = this.validateInputValues(fromAmount.value, null)
        ? await this.currencyConvert(fromAmount.value, 0)
        : "";
    });

    toAmount.addEventListener("keyup", async (e) => {
      e.preventDefault();
      this.takeOnlyInteger(toAmount);
      fromAmount.value = this.validateInputValues(toAmount.value, null)
        ? await this.currencyConvert(toAmount.value, 1)
        : "";
    });

    fromCountry.addEventListener("change", async (e) => {
      e.preventDefault();
      const { amountFrom, countryFrom, amountTo, countryTo } =
        this.getInputValues();
      if (this.validateInputValues(amountFrom, amountTo)) {
        dataStorage.fromCurrency = countryFrom;
        dataStorage.toCurrency = countryTo;
        toAmount.value = await this.currencyConvert(amountFrom, 0);
      }
    });

    toCountry.addEventListener("change", async (e) => {
      e.preventDefault();
      const { amountFrom, countryFrom, amountTo, countryTo } =
        this.getInputValues();
      if (this.validateInputValues(amountFrom, amountTo)) {
        dataStorage.fromCurrency = countryFrom;
        dataStorage.toCurrency = countryTo;
        fromAmount.value = await this.currencyConvert(amountTo, 1);
      }
    });

    document.addEventListener("DOMContentLoaded", async (e) => {
      e.preventDefault();
      const countryListObject = await dataStorage.fetchAllcountries();
      this.generateDropdown(countryListObject);
    });
  },
};

export default app;
