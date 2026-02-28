import "clsx";
import { P as Paralax, e as ParallaxMelancholicMachines } from "../../../chunks/parallaxData.js";
import { C as CircularParallax } from "../../../chunks/CircularParallax.js";
import { T as TOC, a as TOCMelancholicMachines } from "../../../chunks/TOC.js";
/* empty css                    */
function _page($$renderer) {
  const bookLink = "https://drive.google.com/file/d/1SWQUC2tWDHZVN_Tm7Txx5Q877A0UmvQE/view?usp=drive_link";
  $$renderer.push(`<div class="homepage">`);
  CircularParallax($$renderer, {
    title: "Melancholic Machines",
    href: bookLink,
    backgroundImage: "/css/img/Psychoanalysis/Topology22.png",
    text: ""
  });
  $$renderer.push(`<!----> `);
  TOC($$renderer, { toc: TOCMelancholicMachines });
  $$renderer.push(`<!----> `);
  Paralax($$renderer, { pages: ParallaxMelancholicMachines });
  $$renderer.push(`<!----></div>`);
}
export {
  _page as default
};
