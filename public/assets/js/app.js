import tempMemory from "./tempMemory.js";
import dataStorage from "./dataStorage.js";

const app = {
  loadSelectors() {
    const convertForm = document.querySelector("#convertForm");
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
      convertForm,
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
    const { fromAmount, toAmount } = this.loadSelectors();
    let bool = false;

    let bool1 = false;
    fromAmount.style.border = "1px solid red";

    let bool2 = false;
    toAmount.style.border = "1px solid red";

    if (Boolean(amountFrom)) {
      bool1 = true;
      fromAmount.style.border = "1px solid green";
    }

    if (Boolean(amountTo)) {
      bool2 = true;
      toAmount.style.border = "1px solid green";
    }

    let message = "Please Insert a Number";
    if (bool1 && bool2) {
      bool = true;
      message = "Valid Input";
    }
    this.displayMessage(bool, message);
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
  currencyConvert(obj, currencyRate = 1.0) {
    let datam = parseFloat(obj.value);
    if (Boolean(datam) == true && datam >= 0) return datam * currencyRate;
    return 0 * currencyRate;
  },
  generateDropdown(obj) {
    const { fromCountry, toCountry } = this.loadSelectors();
    const countriesObject = obj.results;
    const dropDown = Object.values(countriesObject)
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(
        (a) =>
          `<option value="${a.currencyId}"> ${a.name} (${a.currencyName})</option>`
      ).join('');
    fromCountry.innerHTML = "";
    toCountry.innerHTML = "";
    fromCountry.insertAdjacentHTML("afterbegin", dropDown);
    toCountry.insertAdjacentHTML("afterbegin", dropDown);
  },
  init() {
    const { fromAmount, fromCountry, toAmount, toCountry, convertForm } =
      this.loadSelectors();

    fromAmount.addEventListener("keyup", (e) => {
      e.preventDefault();
      this.takeOnlyInteger(fromAmount);
      toAmount.value = this.currencyConvert(fromAmount, 5.51);
    });

    toAmount.addEventListener("keyup", (e) => {
      e.preventDefault();
      this.takeOnlyInteger(toAmount);
      fromAmount.value = this.currencyConvert(toAmount, 5.51);
    });

    // convertForm.addEventListener("submit", async(e) => {
    convertForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const { amountFrom, countryFrom, amountTo, countryTo } =
        this.getInputValues();
      if (this.validateInputValues(amountFrom, amountTo)) {
        dataStorage.fromUnit = amountFrom;
        dataStorage.toUnit = amountTo;
      }
    });

    document.addEventListener("DOMContentLoaded", async (e) => {
      e.preventDefault();
      dataStorage.apiSecret = "ac5a9d9ad8e1824834e5";
      const countryListObject = await dataStorage.fetchAllcountries();
      this.generateDropdown(countryListObject);
    });
  },
};

export default app;
