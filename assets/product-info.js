"use strict";
window.addEventListener("DOMContentLoaded", init);
const mediaQuery = window.matchMedia("(min-width: 480px)");

function init() {
  // Check if the media query is true
  if (mediaQuery.matches) {
    // Then log the following message to the console
    console.log("Media Query Matched!");
    productInfo();
  } else {
    productInfoMobile();
  }
}

function productInfo() {
  document
    .querySelector(".productInfo-features")
    .addEventListener("click", openModalFeatures);
  document
    .querySelector(".productInfo-sizing")
    .addEventListener("click", openModalSize);
  document
    .querySelector(".productInfo-materials")
    .addEventListener("click", openModalMaterial);
  document
    .querySelector(".productInfo-personalisation")
    .addEventListener("click", openModalPersonalise);
}

function openModalFeatures() {
  document.querySelector("#featuresModal").classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#featuresContainer").classList.add("slide-in");
  document
    .querySelector("#featuresModal")
    .addEventListener("click", closeModalFeatures);
  document
    .querySelector(".features_close")
    .addEventListener("click", closeModalFeatures);
  document
    .querySelector("#featuresContainer")
    .addEventListener("click", closeModalFeatures);
}

function closeModalFeatures() {
  document.querySelector("#featuresModal").classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector("#featuresContainer").classList.remove("slide-in");
}
function openModalSize() {
  document.querySelector("#sizingModal").classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#sizingContainer").classList.add("slide-in");
  document
    .querySelector("#sizingModal")
    .addEventListener("click", closeModalSize);
  document
    .querySelector(".sizing_close")
    .addEventListener("click", closeModalSize);
  document
    .querySelector("#sizingContainer")
    .addEventListener("click", closeModalSize);
}

function closeModalSize() {
  document.querySelector("#sizingModal").classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector("#sizingContainer").classList.remove("slide-in");
}

function openModalMaterial() {
  document.querySelector("#materialModal").classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#materialContainer").classList.add("slide-in");
  document
    .querySelector("#materialModal")
    .addEventListener("click", closeModalMaterial);
  document
    .querySelector(".material_close")
    .addEventListener("click", closeModalMaterial);
  document
    .querySelector("#materialContainer")
    .addEventListener("click", closeModalMaterial);
}

function closeModalMaterial() {
  document.querySelector("#materialModal").classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector("#materialContainer").classList.remove("slide-in");
}

function openModalPersonalise() {
  document.querySelector("#personaliseModal").classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#personaliseContainer").classList.add("slide-in");
  document
    .querySelector("#personaliseModal")
    .addEventListener("click", closeModalPersonalise);
  document
    .querySelector(".personalise_close")
    .addEventListener("click", closeModalPersonalise);
  document
    .querySelector("#personaliseContainer")
    .addEventListener("click", closeModalPersonalise);
}

function closeModalPersonalise() {
  document
    .querySelector("#personaliseModal")
    .classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document.querySelector("#personaliseContainer").classList.remove("slide-in");
}

function productInfoMobile() {
  document
    .querySelector(".productInfo-features-mobile")
    .addEventListener("click", openModalFeaturesMobile);
  document
    .querySelector(".productInfo-sizing-mobile")
    .addEventListener("click", openModalSizeMobile);
  document
    .querySelector(".productInfo-materials-mobile")
    .addEventListener("click", openModalMaterialMobile);
  document
    .querySelector(".productInfo-personalisation-mobile")
    .addEventListener("click", openModalPersonaliseMobile);
}

function openModalFeaturesMobile() {
  document
    .querySelector("#featuresModal-mobile")
    .classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#featuresContainer-mobile").classList.add("slide-in");
  document
    .querySelector("#featuresModal-mobile")
    .addEventListener("click", closeModalFeaturesMobile);
  document
    .querySelector(".features_close-mobile")
    .addEventListener("click", closeModalFeaturesMobile);
  document
    .querySelector("#featuresContainer-mobile")
    .addEventListener("click", closeModalFeaturesMobile);
}

function closeModalFeaturesMobile() {
  document
    .querySelector("#featuresModal-mobile")
    .classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document
    .querySelector("#featuresContainer-mobile")
    .classList.remove("slide-in");
}

function openModalSizeMobile() {
  document
    .querySelector("#sizingModal-mobile")
    .classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#sizingContainer-mobile").classList.add("slide-in");
  document
    .querySelector("#sizingModal-mobile")
    .addEventListener("click", closeModalSizeMobile);
  document
    .querySelector(".sizing_close-mobile")
    .addEventListener("click", closeModalSizeMobile);
  document
    .querySelector("#sizingContainer-mobile")
    .addEventListener("click", closeModalSizeMobile);
}

function closeModalSizeMobile() {
  document
    .querySelector("#sizingModal-mobile")
    .classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document
    .querySelector("#sizingContainer-mobile")
    .classList.remove("slide-in");
}

function openModalMaterialMobile() {
  document
    .querySelector("#materialModal-mobile")
    .classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document.querySelector("#materialContainer-mobile").classList.add("slide-in");
  document
    .querySelector("#materialModal-mobile")
    .addEventListener("click", closeModalMaterialMobile);
  document
    .querySelector(".material_close-mobile")
    .addEventListener("click", closeModalMaterialMobile);
  document
    .querySelector("#materialContainer-mobile")
    .addEventListener("click", closeModalMaterialMobile);
}

function closeModalMaterialMobile() {
  document
    .querySelector("#materialModal-mobile")
    .classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document
    .querySelector("#materialContainer-mobile")
    .classList.remove("slide-in");
}

function openModalPersonaliseMobile() {
  document
    .querySelector("#personaliseModal-mobile")
    .classList.add("visibility-open");
  document.querySelector("body").classList.add("overflow-hidden");
  document
    .querySelector("#personaliseContainer-mobile")
    .classList.add("slide-in");
  document
    .querySelector("#personaliseModal-mobile")
    .addEventListener("click", closeModalPersonaliseMobile);
  document
    .querySelector(".personalise_close-mobile")
    .addEventListener("click", closeModalPersonaliseMobile);
  document
    .querySelector("#personaliseContainer-mobile")
    .addEventListener("click", closeModalPersonaliseMobile);
}

function closeModalPersonaliseMobile() {
  document
    .querySelector("#personaliseModal-mobile")
    .classList.remove("visibility-open");
  document.querySelector("body").classList.remove("overflow-hidden");
  document
    .querySelector("#personaliseContainer-mobile")
    .classList.remove("slide-in");
}
