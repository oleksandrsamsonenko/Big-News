const e=document.querySelectorAll(".toggle");let t=localStorage.getItem("themeKey")||"light";const _=document.querySelector("body"),g=document.querySelector(".svg__light"),l=document.querySelector(".svg__dark"),s=document.querySelector(".svg__sun"),o=document.querySelector(".svg__moon"),c=document.querySelector(".svg__toggle__sun"),m=document.querySelector(".svg__toggle__moon"),r=document.querySelector(".input__theme"),a=document.querySelector(".lupa__theme"),h=document.querySelector(".menu__theme"),i=document.querySelector(".x__theme"),n=document.querySelector(".burger-menu__wrapper");function u(e){"click"===e.type&&(t="light"===t?"dark":"light",localStorage.setItem("themeKey",t)),_.classList.toggle("light__theme"),_.classList.toggle("dark__theme"),n.classList.toggle("light__theme"),n.classList.toggle("dark__theme"),g.classList.toggle("toggle__light__theme"),g.classList.toggle("toggle__dark__theme"),l.classList.toggle("toggle__light__theme"),l.classList.toggle("toggle__dark__theme"),s.classList.toggle("toggle__sun__theme"),s.classList.toggle("toggle__moon__theme"),o.classList.toggle("toggle__moon__theme"),o.classList.toggle("toggle__sun__theme"),c.classList.toggle("toggle__sun__theme"),c.classList.toggle("toggle__moon__theme"),m.classList.toggle("toggle__sun__theme"),m.classList.toggle("toggle__moon__theme"),r.classList.toggle("input__light__theme"),r.classList.toggle("input__dark__theme"),a.classList.toggle("svg__light__theme"),a.classList.toggle("svg__dark__theme"),h.classList.toggle("svg__light__theme"),h.classList.toggle("svg__dark__theme"),i.classList.toggle("svg__light__theme"),i.classList.toggle("svg__dark__theme")}document.addEventListener("DOMContentLoaded",(e=>{"dark"===t&&u(e)})),e.forEach((e=>{e.addEventListener("click",u),e.checked="dark"===t}));
//# sourceMappingURL=read.95372011.js.map