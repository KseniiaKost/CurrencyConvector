let apiKey = "04374f7892bd4e3ab75f0ba0e2daf0db";
let api = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

const fromDpropDownElement = document.querySelector(".from-currency-dropdown");
const toDpropDownElement = document.querySelector(".to-currency-dropdown");
const amountValueElement = document.querySelector(".amount-field");
const resultElement = document.querySelector(".result");
const uahResultElement = document.querySelector(".uahResult");
const eurResultElement = document.querySelector(".eurResult");
const gbpresultElement = document.querySelector(".gbpResult");

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  fromDpropDownElement.add(option);
});

currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDpropDownElement.add(option);
});

const convertCurrency = () => {
  const amount = amountValueElement.value;
  const fromCurrency = fromDpropDownElement.value;
  const toCurrency = toDpropDownElement.value;

  if (amount.length != 0) {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        let fromRate = data.rates[fromCurrency];
        let toRate = data.rates[toCurrency];
        const convertedAmount = (amount / fromRate) * toRate;
        resultElement.innerHTML = `${amount} ${
          fromDpropDownElement.value
        } = ${convertedAmount.toFixed(2)} ${toDpropDownElement.value}`;
      });
  }
};

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    let uahRate = (data.rates.UAH * 100).toFixed(2);
    let eurRate = (data.rates.EUR * 100).toFixed(2);
    let gbpRate = (data.rates.GBP * 100).toFixed(2);
    uahResultElement.textContent = uahRate;
    eurResultElement.textContent = eurRate;
    gbpresultElement.textContent = gbpRate;
  });

document.querySelector(".button").addEventListener("click", convertCurrency);
