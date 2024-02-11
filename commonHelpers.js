import{S as l,i as u}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const f=document.querySelector("#searchInput"),d=document.querySelector('button[type="submit"]'),m=document.querySelector(".js-form"),c=document.querySelector(".gallery"),a=document.querySelector(".loader");let p=new l(".gallery a",{captionsData:"alt",captionDelay:250});d.addEventListener("click",y);function y(t){t.preventDefault();const s=f.value.trim();s&&(a.classList.add("is-shown"),m.reset(),g(s).then(r=>{r.hits.length?(a.classList.remove("is-shown"),L(r.hits)):u.error({title:"Sorry",message:"There are no images matching your search query. Please try again!",position:"topRight"})}).catch(r=>{console.error("Помилка:",r)}))}function g(t){const s=`https://pixabay.com/api/?key=42305362-292fb567d2617ee346426e642&q=${t}&image_type=photo?orientation=horizontal?safesearch=true`;return fetch(s).then(r=>{if(r.ok)return r.json();throw new Error(`Помилка: ${r.status}`)})}function h(t){return`
  <li class="gallery-item">
    <a href="${t.largeImageURL}">
    <img src="${t.webformatURL}" alt="${t.tags}">
    <div class="card-body">
      <p class="card-text">Likes: ${t.likes}</p>
      <p class="card-text">Views: ${t.views}</p>
      <p class="card-text">Comments: ${t.comments}</p>
      <p class="card-text">Downloads: ${t.downloads}</p>
    </div>
    </a>
  </li>`}function L(t){c.innerHTML="";const s=t.map(r=>h(r)).join("");c.innerHTML=s,p.refresh()}
//# sourceMappingURL=commonHelpers.js.map
