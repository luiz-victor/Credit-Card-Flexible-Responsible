import "./css/index.css"
import IMask, { MaskElement } from "imask"

function typeOfCardBg(type) {
  const ccBgMask1 = document.querySelector(".cc-bg svg g > g path")
  const ccBgMask2 = document.querySelector(".cc-bg svg g g:nth-child(2) path")
  const ccIcon = document.querySelector(".cc-logo span:nth-child(2) img")

  const color = {
    visa: ["#436D99", "#2D57F2", "/cc-visa.svg"],
    mastercard: ["#C69347", "#DF6F29", "/cc-mastercard.svg"],
    default: ["black", "gray", "cc-default.svg"],
  }

  ccBgMask1.setAttribute("fill", color[type][0])
  ccBgMask2.setAttribute("fill", color[type][1])
  ccIcon.setAttribute("src", color[type][2])
}

globalThis.card = typeOfCardBg

const inputCVC = document.getElementById("security-code")
const inputCVCMask = IMask(inputCVC, {
  mask: "0000",
})

const inputExpiration = document.querySelector("#expiration-date")
const inputExpirationMask = IMask(inputExpiration, {
  mask: "MM/YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
})

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardType: "visa",
      
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",

    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,"")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  }
}
    
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)


const ccCardNumber = document.querySelector(".cc-number")





const ccCardExpiration = document.querySelector(".cc-expiration .value")
const ccCardCVC = document.querySelector(".cc-security .value ")
const button = document.querySelector("form button")




/* holden action */

  const ccCardHolder = document.querySelector(".cc-holder .value ")
  const holderName = document.querySelector("#card-holder")


  const holderMask = IMask(holderName, {
    mask: /^[a-z\sA-Z]+$/,
  })

  // const inputCVCMask = IMask(inputCVC, {
    // mask: "0000",
  // })

  holderName.addEventListener('input', () =>{
    ccCardHolder.innerText = (holderName.value.length === 0) ? "FULANO DA SILVA" : holderName.value
  })


/* expiration action */
inputExpiration.addEventListener('input', () => {
  ccCardExpiration.innerText = (inputExpiration.value.length === 0) ? "02/32" : inputExpiration.value
})

/* CVC Action */
inputCVC.addEventListener('input', () => ccCardCVC.innerText = (inputCVCMask.value.length === 0) ? "1234" : inputCVCMask.value)

/* CardNumber Action */

cardNumberMasked.on("accept", (mask) => {
  const typeOfCard = cardNumberMasked.masked.currentMask.cardType
  typeOfCardBg(typeOfCard)

})

cardNumber.addEventListener(
  "input",
  () =>
    (ccCardNumber.innerText =
      cardNumber.value.length === 0 ? "1234 5678 9012 3456" : cardNumber.value)
)


/* BUTON EVENT */
document.querySelector('form').addEventListener("submit", (ev) => ev.preventDefault())
button.addEventListener('click', () => {
  alert('Cartão registrado com sucesso!')
  inputExpiration.value = ""
  inputCVC.value = ""
  cardNumber.value = ""
  document.getElementById('card-holder').value = ''
  ccCardCVC.innerText = '1234'
  ccCardExpiration.innerText = '02/32'
  ccCardHolder.innerText = 'FULANO DA SILVA'
  ccCardNumber.innerText = "1234 5678 9012 3456"
  typeOfCardBg('default')
})