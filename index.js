const downloadButton = document.getElementById("downloadButton");
const reset = document.getElementById("reset");
const message = document.getElementById("resetMess");

downloadButton.classList.add("d-none");
reset.classList.add("d-none");
message.classList.add("d-none");

let isQRCodeGenerated = false;

// Espressione regolare per verificare se la stringa è un URL valido
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const generateQRCode = function () {
  const inputLink = document.getElementById("inputLink");
  const url = inputLink.value;

  if (url && urlRegex.test(url) && !isQRCodeGenerated) {
    // Configurazioni opzionaliurl
    var options = {
      width: 128,
      height: 128,
      colorDark: "#000BFF",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    };

    // Creazione del QR code
    var qrcode = new QRCode(document.getElementById("qrcode"), options);
    qrcode.makeCode(url);
    console.log("OGGETTO QR CODE GENERATO", qrcode);

    downloadButton.classList.remove("d-none");
    reset.classList.remove("d-none");

    isQRCodeGenerated = true;
    lastGeneratedURL = url;
  } else if (isQRCodeGenerated) {
    alert(
      "QR Code già generato, resetta il forma prima di generare un nuovo Qr"
    );
  } else if (!isQRCodeGenerated) {
    alert("INSERIRE UN URL !!");
  }
};

const downloadQRCode = function () {
  var canvas = document
    .getElementById("qrcode")
    .getElementsByTagName("canvas")[0];

  var borderedCanvas = document.createElement("canvas");
  var ctx = borderedCanvas.getContext("2d");
  var borderSizeX = 8; // pixel
  var borderSizeY = 8;

  borderedCanvas.width = canvas.width + 2 * borderSizeX;
  borderedCanvas.height = canvas.height + 2 * borderSizeY;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);

  // Disegnare il QR code centrato sia orizzontalmente che verticalmente nel nuovo canvas
  ctx.drawImage(canvas, borderSizeX, borderSizeY);

  // Creare un link di download
  var downloadLink = document.createElement("a");
  downloadLink.href = borderedCanvas.toDataURL("image/png");
  downloadLink.download = "brano_qr_code.png";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  console.log("QR CODE SCARICATO", downloadLink);
};

document
  .getElementById("downloadButton")
  .addEventListener("click", downloadQRCode);

const resetForm = function () {
  document.querySelector("form").reset(); // Resetta il form

  const downloadButton = document.getElementById("downloadButton");
  console.log(downloadButton);
  const reset = document.getElementById("reset");

  downloadButton.classList.add("d-none");
  reset.classList.add("d-none");

  isQRCodeGenerated = false;

  //   message.classList.remove("d-none");
  //   message.classList.add("d-flex");
};

document.addEventListener("DOMContentLoaded", function () {
  const inputLink = document.getElementById("inputLink");
  inputLink.focus();
});

let annoCorrente = new Date().getFullYear();
let eccolo = (document.getElementById("anno").innerHTML =
  "&copy;" +
  annoCorrente +
  " QR Code Generator. All rights reserved. Created by Perri Alessandro");
