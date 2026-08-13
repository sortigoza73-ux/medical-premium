
(()=>{const els=[...document.querySelectorAll(".mp-reveal")];if(matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){els.forEach(e=>e.classList.add("is-visible"));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.1});els.forEach(e=>io.observe(e));})();
