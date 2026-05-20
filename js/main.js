console.log("Hello world!");

const inTitle = document.querySelector("#input-title");
const inPrice = document.querySelector("#input-price");
const inDescription = document.querySelector("#input-description");
const btnCancel = document.querySelector("#button-cancel");

const onClickCancel = (evt) => {
    // Don't navigate to a different page
    evt.preventDefault();

    inTitle.value = "";
    inPrice.value = 80;
    inDescription.value = "";
};
btnCancel.addEventListener("click", onClickCancel)

