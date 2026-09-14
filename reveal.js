(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // progressive-enhancement scroll reveal: elements are visible by default
  // (no CSS sets them hidden); JS opts them into the pre-reveal state only
  // when it can also guarantee the reveal — and a fallback timer guarantees
  // it even if the observer never fires, so content is never permanently
  // stuck invisible.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var pending = [];
    var targets = document.querySelectorAll('.fx-init');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fx-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        return;
      }
      el.classList.add('fx-init-active');
      io.observe(el);
      pending.push(el);
    });

    window.setTimeout(function () {
      pending.forEach(function (el) { el.classList.add('fx-in'); });
    }, 1800);
  }
})();
