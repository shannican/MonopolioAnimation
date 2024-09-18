(function () {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });

  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // GSAP animations
  gsap.to("#img", {
    scrollTrigger: {
      trigger: "#scnd",
      scroller: "#main",
      start: "top 0%",
      end: "bottom 60%",
      scrub: 2,
      pin: true,
      // markers: true,
      onUpdate: () => {
        const img = document.querySelector("#img");
        const client = img.getBoundingClientRect().top;
        const scale = Math.floor(client * 0.007);
        const scl = gsap.utils.mapRange(10, -10, 1, 2, scale);
        img.style.transform = `translate(-50%,0%) rotate3d(1,1,0,${client * 0.09}deg) scale(${scl})`;
      }
    },
    top: "-100%",
    duration: 4,
    ease: "SlowMo.ease.config(0.7,0.7,false)"
  });

  gsap.to("#text h1", {
    x: `-100%`,
    duration: 3,
    repeat: -1,
    ease: "linear"
  });

  // Mouse events
  const alt = document.querySelectorAll(".elemm");
  alt.forEach(function(elemm) {
    elemm.addEventListener("mousemove", function() {
      this.children[1].style.opacity = 1;
    });
    elemm.addEventListener("mouseout", function() {
      this.children[1].style.opacity = 0;
    });
  });

  // Refresh ScrollTrigger
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
})();
