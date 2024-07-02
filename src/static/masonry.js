var media = window.matchMedia("(min-width: 768px)");

function listenConditionally() {
  if (media.matches) {
    let magicGrid = new MagicGrid({
      container: ".masonry-grid", // Required. Can be a class, id, or an HTMLElement.
      static: true, // Required for static content.
      useMin: true,
      animate: false,
      gutter: 20,
    });
    magicGrid.listen();
  }
}

media.addEventListener("change", listenConditionally);

listenConditionally();
