//chargeGenerator.js

const url = "https://api.commerce.coinbase.com/charges";

const requestBody = {
  local_price: {
    amount: "17029800", //price of charge
    currency: "USD", //currency
  },
  pricing_type: "fixed_price",

  name: "Askun crypto",
  description: "Small description",
  redirect_url: "https:/google.com", //optional redirect URL

  metadata: {
    id: "Customer id",
    email: "amsoliman7@gmail.com",
    address: "5 AAST Sheraton",
  },
};

const payload = {
  method: "POST",
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CC-Api-Key": "0554d96b-1262-4c70-834f-043e6d160da8",
  },
  body: JSON.stringify(requestBody),
};

async function createCharge() {
  try {
    const response = await fetch(url, payload);
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating charge:", error);
  }
}

export { createCharge };
