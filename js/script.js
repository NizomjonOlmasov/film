window.addEventListener('DOMContentLoaded', () => {
  const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader')

  // Loader
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }, 2000)

  // Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide')
      item.classList.remove('show', 'fade')
    })

    tabs.forEach((item) => {
      item.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent()
          showTabContent(idx)
        }
      })
    }
  })

  // Timer

  const deadline = '2023-10-11'

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds
    const timer = Date.parse(endtime) - Date.parse(new Date())

    if (timer <= 0) {
      days = 0
      hours = 0
      minutes = 0
      seconds = 0
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24))
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24)
      minutes = Math.floor((timer / 1000 / 60) % 60)
      seconds = Math.floor((timer / 1000) % 60)
    }

    return { timer, days, hours, minutes, seconds }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updatClock, 1000)

    updatClock()

    function updatClock() {
      const t = getTimeRemaining(endtime)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.timer <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock('.timer', deadline)

  // Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal')
    // modalCloseBtn = document.querySelector('[data-close]')

  function closeModal() {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
  }

  function openModal() {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId)
  }

  modalTrigger.forEach((item) => {
    item.addEventListener('click', openModal)
  })

  // modalCloseBtn.addEventListener('click', closeModal)

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close')==='') {
      closeModal()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal()
    }
  })

  const modalTimerId = setTimeout(openModal, 5000)

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)

  // Class
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.classes = classes
      this.parent = document.querySelector(parentSelector)
      this.transfer = 11000
      this.chageToUZS()
    }

    chageToUZS() {
      this.price = this.price * this.transfer
    }

    render() {
      const element = document.createElement('div')

      if (this.classes.length === 0) {
        this.element = 'menu__item'
        element.classList.add(this.element)
      } else {
        this.classes.forEach((classname) => element.classList.add(classname))
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
        </div>
      `

      this.parent.append(element)
    }
  }


  //---------=========  form


  const forms=document.querySelectorAll('form');

  forms.forEach((form)=>{
    postData(form)
  })


  const msg={
    loading:'img/spinner.svg',
    success:'Thank for submiting our form',
    failure:'some thing went wrong',
  }
  function postData(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const statusMessage=document.createElement('img')
      statusMessage.src=msg.loading
      statusMessage.style.cssText=`
      display:block;
      margin:0 auto;
      width:10%;
      `
      form.insertAdjacentElement('afterend',statusMessage)
      // form.append(statusMessage)
      // const request=new XMLHttpRequest()
      // request.open("POST", "http://localhost:3000/request");
     
      // request.setRequestHeader('Content-Type','aplication/json')
  async function postData(url,data){
    const res=await fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:data,
    })
    return await res.json()
  }
      const formData=new FormData(form)
const data=Object.fromEntries(formData)
postData('http://localhost:3000/request',JSON.stringify(data))

      // fetch('  http://localhost:3000/request',{
      //   method:'POST',
        
      //   headers:{
      //     'Content-Type':'application/json',
      //   },
      //   body: JSON.stringify(data),
       
      // })
      // .then((data)=>data.text())
      .then((data)=>{
        console.log(data);
        showThanksModal(msg.success)
        // localStorage.setItem('http://localhost:3000/request',JSON.stringify(obj))
        statusMessage.remove()
      })
      .catch(()=>{
        showThanksModal(msg.failure)
      }).finally(()=>{
        form.reset()
      })
      // request.send(formData)
      // request,addEventListener('load',()=>{
      //   console.log(request.status);
      //   if(request.status===200){
      //   console.log(request.response);
      //   // statusMessage.textContent=msg.success
      //   showThanksModal(msg.success)
      //   form.reset()
      //   setTimeout(()=>{
      //     statusMessage.remove()
      //   },2000)
      //   }else{
      //     // statusMessage.textContent=msg.failure
      //     showThanksModal(msg.failure)
      //   }
      // })
       
    })
  }

async function getRecorse(url){
  const res=await fetch(url)
  return await res.json()
}
axios.get('http://localhost:3000/menu')
.then((data)=>{
  data. data.forEach(({img,altimg,title,descr,price})=>{
    new MenuCard(img,altimg,title,descr,price,'.menu .container').render()
  })
})
getRecorse('http://localhost:3000/menu')
.then((data)=>{
 
  console.log(data);
})
function showThanksModal(message){
  const prevModalDialog=document.querySelector('.modal__dialog')
  prevModalDialog.classList.add('hide')
  openModal()
  const thanksModal=document.createElement('div')
  thanksModal.innerHTML=`
  <div class="modal__content">
  <div data-close class="modal__close">&times;</div>
  <div class="modal__title">${message}</div>
  </div
  `
  document.querySelector('.modal').append(thanksModal)
  setTimeout(()=>{
    thanksModal.remove()
    prevModalDialog.classList.add('show')
    prevModalDialog.classList.remove('hide')
    closeModal()
  },4000)

}
// console.log(Object.entries({a:2,sdfsdf:'fggdf'}));
  // const mysql = require('mysql');



})
