const fullName = document.querySelector("#fullName");
const contactInfo = document.querySelector("#contactInfo");
const address = document.querySelector("#address");
const button = document.querySelector("#button");
const form = document.querySelector("#form");
const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScYjWpj_YZFRbKCyFZK8XI_dasqzzlOAiGbe7OzWa74djV73Q/formResponse"; // Google Form URL

const handleSubmit = async (event) => {
  event.preventDefault();
  const fullNameValue = fullName.value;
  const contactInfoValue = contactInfo.value;
  const addressValue = address.value;
  const formData = {
    "entry.1380642061": fullNameValue, // entry.253486596 is the name attribute for the full name field on our google form
    "entry.274993568": contactInfoValue, // entry.1124906099 is the name attribute for the email address field on our google form
    "entry.414345234": addressValue, // entry.1163114650 is the name attribute for the notes address field on our google form
  };
  const appendedFormData = newFormData({ ...formData });

  try {
    button.disabled = true;
    button.textContent = "processing...";
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: appendedFormData,
    });
    alert("Form submitted successfully!");
    fullName.value = "";
    contactInfo.value = "";
    address.value = "";
  } catch (error) {
    alert("Something went wrong, please try again");
    console.log(error);
  } finally {
    button.disabled = false;
    button.textContent = "Submit";
  }
};

form.addEventListener("submit", handleSubmit);

// A helper function to help convert the data to FormData
const newFormData = (inputs) => {
  const formData = new FormData();
  const newArr = Object.entries(inputs);
  newArr.map((item) => {
    return formData.append(`${item[0]}`, item[1]);
  });
  return formData;
};
