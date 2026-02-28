import "clsx";
import { C as CarouselBootstrap, M as Main, P as Phototable, f as CarouselDataCinema, g as PostsCinemaContent, h as photoTableCinemaHeader, i as photoTableCinema } from "../../../chunks/postsData.js";
import { P as Paralax, c as ParalaxCinema } from "../../../chunks/parallaxData.js";
import { C as CircularParallax } from "../../../chunks/CircularParallax.js";
/* empty css                    */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const bookLink = "https://drive.google.com/file/d/1SWQUC2tWDHZVN_Tm7Txx5Q877A0UmvQE/view?usp=drive_link";
    $$renderer2.push(`<div class="homepage">`);
    CarouselBootstrap($$renderer2, {
      CarouselData: (
        //   export let data;
        CarouselDataCinema
      )
    });
    $$renderer2.push(`<!----> `);
    Paralax($$renderer2, { pages: ParalaxCinema });
    $$renderer2.push(`<!----> `);
    Main($$renderer2, { PostsContent: PostsCinemaContent });
    $$renderer2.push(`<!----> `);
    Phototable($$renderer2, {
      photoTableContent: photoTableCinema,
      title: photoTableCinemaHeader.title,
      content: photoTableCinemaHeader.content
    });
    $$renderer2.push(`<!---->  `);
    CircularParallax($$renderer2, {
      title: "Melancholic Machines",
      href: bookLink,
      backgroundImage: "/css/img/Psychoanalysis/Topology18.png",
      text: ""
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
