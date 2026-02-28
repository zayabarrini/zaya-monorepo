import { j as ensure_array_like, e as attr, a as attr_class, c as clsx, i as escape_html, b as bind_props, f as fallback, d as stringify, g as slot } from "./vendor-svelte.js";
function CarouselBootstrap($$renderer, $$props) {
  let CarouselData2 = fallback($$props["CarouselData"], () => [], true);
  let activeIndex = 0;
  $$renderer.push(`<div id="myCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-wrap="true"><ol class="carousel-indicators"><!--[-->`);
  const each_array = ensure_array_like(CarouselData2);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    each_array[i];
    $$renderer.push(`<li data-bs-target="#myCarousel"${attr("data-bs-slide-to", i)}${attr_class(clsx(i === activeIndex ? "active" : ""))}></li>`);
  }
  $$renderer.push(`<!--]--></ol> <div class="carousel-inner"><!--[-->`);
  const each_array_1 = ensure_array_like(CarouselData2);
  for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
    let slide = each_array_1[i];
    $$renderer.push(`<div${attr_class(`carousel-item ${stringify(i === activeIndex ? "active" : "")}`)}><img class="d-block w-100"${attr("src", slide.image)}${attr("alt", slide.title)}/> <div class="carousel-caption d-none d-md-block"><h4>${escape_html(slide.title)}</h4> <h5>${escape_html(slide.description)}</h5></div></div>`);
  }
  $$renderer.push(`<!--]--></div> <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Previous</span></button> <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="visually-hidden">Next</span></button></div>`);
  bind_props($$props, { CarouselData: CarouselData2 });
}
function Phototable($$renderer, $$props) {
  let photoTableContent2 = fallback($$props["photoTableContent"], () => [], true);
  let title = fallback($$props["title"], "");
  let content = fallback($$props["content"], "");
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
  };
  const rows = chunkArray(photoTableContent2, 3);
  $$renderer.push(`<div id="clothes-section"><article class="content"><div class="header-collection"><h1><a href="/posts">${escape_html(title)}</a></h1> <hr/> <p>${escape_html(content)}</p> <hr/></div> <div class="clothes-pic"><!--[-->`);
  const each_array = ensure_array_like(rows);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let row = each_array[$$index_1];
    $$renderer.push(`<div class="row img-row svelte-sk5xm5"><!--[-->`);
    const each_array_1 = ensure_array_like(row);
    for (let colIndex = 0, $$length2 = each_array_1.length; colIndex < $$length2; colIndex++) {
      let item = each_array_1[colIndex];
      $$renderer.push(`<figure${attr_class(`col-md-4 col-sm-3 ${stringify(colIndex === 0 ? "left" : colIndex === 1 ? "center" : "right")}`, "svelte-sk5xm5")}><a${attr("href", item.href || "/posts")}><img${attr("src", item.src)}${attr("alt", item.label)} class="svelte-sk5xm5"/></a> <figcaption class="svelte-sk5xm5">${escape_html(item.label)}</figcaption></figure>`);
    }
    $$renderer.push(`<!--]--></div>`);
  }
  $$renderer.push(`<!--]--></div></article></div>`);
  bind_props($$props, { photoTableContent: photoTableContent2, title, content });
}
function Page($$renderer, $$props) {
  let id = $$props["id"];
  let title = $$props["title"];
  let showPromo = fallback($$props["showPromo"], false);
  let promoText = fallback($$props["promoText"], "");
  let promoLink = fallback($$props["promoLink"], "/posts");
  let href = fallback($$props["href"], "/posts");
  $$renderer.push(`<div${attr("id", id)}><article class="content"><h1><a${attr("href", href)}>${escape_html(title)}</a></h1> <hr/> <p><!--[-->`);
  slot($$renderer, $$props, "default", {});
  $$renderer.push(`<!--]--></p> <hr/> `);
  if (showPromo) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="window-tint svelte-12802sm"><div class="promo-text svelte-12802sm">${escape_html(promoText)} <a${attr("href", promoLink)} class="window-cta svelte-12802sm">Rapport</a></div></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></article></div>`);
  bind_props($$props, { id, title, showPromo, promoText, promoLink, href });
}
function Main($$renderer, $$props) {
  let PostsContent3 = fallback($$props["PostsContent"], () => [], true);
  $$renderer.push(`<!--[-->`);
  const each_array = ensure_array_like(PostsContent3);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let { id, title, content, showPromo, promoText, href } = each_array[$$index];
    Page($$renderer, {
      id,
      title,
      showPromo,
      promoText,
      href,
      children: ($$renderer2) => {
        $$renderer2.push(`<!---->${escape_html(content)}`);
      },
      $$slots: { default: true }
    });
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { PostsContent: PostsContent3 });
}
const photoTableContentHeader = {
  title: "Lacan's mathematical resources",
  content: "Lacan: Subjective Division, Phallo-Castration, Subject pierced, barred, missing: object the cause of desire, A-more-of-enjoyment: restitution of a mythical enjoyment."
};
const photoTableContent = [
  {
    src: "/css/img/Psychoanalysis/Lacan2.png",
    label: "Schema Sweater - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan3.png",
    label: "Schema Trousers - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan4.png",
    label: "Schema Jacket - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan5.png",
    label: "Schema Trousers - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan6.png",
    label: "Schema Jacket - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan11.png",
    label: "Schema Sweater - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan8.png",
    label: "Schema Jacket - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan9.png",
    label: "Schema Sweater - $ o D"
  },
  {
    src: "/css/img/Psychoanalysis/Lacan10.png",
    label: "Schema Trousers - $ o D"
  }
];
const photoTableCinemaHeader = {
  title: "CGI, Psychosis: The unconcious image of the Body",
  content: "Lacan: Subjective Division, Phallo-Castration, Subject pierced, barred, missing: object the cause of desire, A-more-of-enjoyment: restitution of a mythical enjoyment."
};
const photoTableCinema = [
  {
    src: "/css/img/Cinema/Cinema37.png",
    label: "Cinema Sweater - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema38.png",
    label: "Cinema Trousers - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema39.png",
    label: "Cinema Jacket - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema40.png",
    label: "Cinema Trousers - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema41.png",
    label: "Cinema Jacket - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema42.png",
    label: "Cinema Sweater - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema43.png",
    label: "Cinema Jacket - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema44.png",
    label: "Cinema Sweater - $ o D"
  },
  {
    src: "/css/img/Cinema/Cinema45.png",
    label: "Cinema Trousers - $ o D"
  }
];
const CarouselData = [
  {
    image: "/css/img/Psychoanalysis/Topology10.png",
    title: "Topology in Psychoanalysis",
    description: "Exploring the mathematical models in Lacan’s theories."
  },
  {
    image: "/css/img/Psychoanalysis/Topology11.png",
    title: "Borromean Knot",
    description: "The symbolic, imaginary, and real are intertwined."
  },
  {
    image: "/css/img/Psychoanalysis/Topology12.png",
    title: "Lacan’s Perspective",
    description: "Understanding the unconscious through topology."
  },
  {
    image: "/css/img/Psychoanalysis/Topology13.png",
    title: "The Real and the Symbolic",
    description: "How the real disrupts the symbolic order."
  }
];
const CarouselDataCinema = [
  {
    image: "/css/img/Cinema/Cinema4.png",
    title: "Psychoanalysis in Cinema",
    description: "Exploring the mathematical models in Lacan’s theories."
  },
  {
    image: "/css/img/Cinema/Cinema5.png",
    title: "Borromean Knot",
    description: "The symbolic, imaginary, and real are intertwined."
  },
  {
    image: "/css/img/Cinema/Cinema6.png",
    title: "Lacan’s Perspective",
    description: "Understanding the unconscious through Cinema."
  },
  {
    image: "/css/img/Cinema/Cinema7.png",
    title: "The Real and the Symbolic",
    description: "How the real disrupts the symbolic order."
  }
];
const PostsContent = [
  {
    id: "page7",
    title: "Gender",
    content: `
    If gender is a kind of doing an incessant activity carried out, in part, without knowledge and without will, it is therefore not automatic or mechanical. Rather, it is a practice of improvisation within a scene of embarrassment. Furthermore, no one “does” their gender alone. One is always “doing” with or for another, even if the other is only imaginary. What I call my “own” genre may sometimes appear as something I authored or, indeed, owned by me. But the terms that constitute the genre itself are, from the beginning, outside of themselves, beyond themselves in a sociability that does not have a single author (and that radically contests the very notion of authorship).`
  },
  {
    id: "page8-section",
    title: "Poetry and Math",
    showPromo: true,
    promoText: "Jouissance and the Other",
    content: `
    - **Concept**: The Borromean knot is a configuration of three rings, where no two rings are directly linked, but all three together form a stable structure. Lacan used this model to represent the Real, the Symbolic, and the Imaginary as interdependent dimensions of the psyche. 
    - **Implication**: Clinically, this model is crucial for understanding how the Real, Symbolic, and Imaginary are intertwined in the structure of the subject, particularly in psychosis where one of these rings (often the Symbolic) is “foreclosed,” leading to the disintegration of the other two dimensions.`
  },
  {
    id: "page8-section",
    title: "Structure",
    showPromo: true,
    promoText: "Non-Totality, Not-All",
    content: `Hole, disentanglement. Effects of the hole: Doubt, certainty, delirium. Return: body, thought, dream. Emptying of meaning x explosion of meaning. Sign, letter, writing, symbolic. Chinese letters. Torus Scheme: demand, desire, other, Other. Exchanges, recognition. Identification and improvisation. Body as written, body writing, meaning, power, body as poetry, as art.`
  },
  {
    id: "page8-section",
    title: "Clinical Implications",
    content: `Lacan’s topological models offer a way to diagnose different psychic structures (neurosis, psychosis, perversion) based on how the subject is organized topologically. For instance, the Borromean knot helps to understand how the collapse of one register (like the Symbolic in psychosis) affects the entire psychic structure.`
  },
  {
    id: "page8-section",
    title: "Treatment Strategy",
    content: `Topology informs therapeutic strategies by offering a way to conceptualize the patient’s relationship to desire, the Other, and the law. For example, in treating obsessive-compulsive disorder, the concept of the torus might guide interventions aimed at addressing the repetitive cycle of unfulfilled desire.`
  },
  {
    id: "page8-section",
    title: "Loss and compensation",
    content: `The neurotic strategy of inscribing jouissance, both in obsessional neurosis and in hysteria, would be marked by the equivalence between loss and restitution. The less enjoyment, imposed by castration, would be made equivalent to an extra enjoyment, understood by the phallic formations of restitution, as the symptom. The neurotic assumption is that less and more are commensurable and reversible and that is why the lack in the Other is identified with the demand in the subject.`
  }
];
const PostsContent2 = [
  {
    id: "page7",
    title: "Art, creation and the Name-of-the-father",
    content: `Treatment of the real by the real in which an enjoyment is deposited that is transformed until it becomes “aesthetic”, as they say, while the produced object imposes itself on the real.`
  },
  {
    id: "page8-section",
    title: "Consistency",
    showPromo: true,
    promoText: "Jouissance and the Other",
    content: `There are other types of solutions that do not use the symbolic, but proceed with a real operation on the real of jouissance not imprisoned in the network of language. Such is the work — pictorial, for example —, when it does not play with the verb, but creates ex nihilo a new, unprecedented object.`
  }
];
const post = {
  text: `Civilizing things through the symbolic is also the path of some creationist sublimations. The promotion of the father is one of them, in fact, as Lacan said in his seminar on ethics... Thus, it is conceivable that these sublimations are particularly called upon in psychosis, as so many well-known names prove: Joyce, Hölderlin, Nerval, Rousseau, Van Gogh, etc. Not all sublimations are of the same type, but those that come from the construction of a new symbolic have a homogeneous function to what delirium is for Schreber.`,
  author: "Jacques Lacan"
};
const PostsCinemaContent = [
  {
    id: "page7",
    title: "The Melancholy of Women in Cinema",
    content: `From *Portrait of a Lady on Fire* to *The Hours*, cinema has masterfully captured women's solitude, longing, and quiet resistance. What films do you think best portray this theme?`
  },
  {
    id: "page7",
    title: "Queer Desire on Screen",
    content: `Films like *The Handmaiden* and *Maurice* unravel the beauty and tragedy of queer love. How does cinematography shape these narratives?`
  },
  {
    id: "page7",
    title: "Psychoanalysis and Cinema",
    content: `Movies such as *Persona* and *Tár* dissect the psyche with chilling precision. What films make you question the depths of the mind?`
  },
  {
    id: "page7",
    title: "Children and Adolescence in Film",
    content: `From *The 400 Blows* to *The Florida Project*, the struggles of youth have been poignantly depicted. Which films capture the rawness of childhood best?`
  },
  {
    id: "page7",
    title: "Cinema of Migration and Exile",
    content: `*Au revoir les enfants* and *Loveless* explore the displacement of people and emotions. What films resonate with the theme of exile for you?`
  },
  {
    id: "page7",
    title: "The Power of Silence in Film",
    content: `Some films say more in silence than in words—*A Ghost Story* and *Past Lives* are prime examples. What are your favorite quiet films?`
  },
  {
    id: "page7",
    title: "The Blurred Line Between Reality and Fiction",
    content: `Movies like *The Talented Mr. Ripley* and *System Crasher* make us question identity. What films have left you unsettled about reality?`
  },
  {
    id: "page7",
    title: "The Intimacy of Daily Life in Film",
    content: `From *Paterson* to *Pain and Glory*, cinema has a way of turning the mundane into poetry. What films celebrate the beauty of ordinary life?`
  },
  {
    id: "page7",
    title: "The Weight of the Past in Cinema",
    content: `Films like *Manchester by the Sea* and *The Banshees of Inisherin* explore how past choices haunt the present. What are your favorite films about regret and redemption?`
  },
  {
    id: "page7",
    title: "Cinematic Aesthetics and Their Impact",
    content: `From the precise frames of *Portrait of a Lady on Fire* to the neon haze of *Dear Ex*, visual storytelling shapes our emotions. What are the most visually stunning films you've seen?`
  }
];
export {
  CarouselBootstrap as C,
  Main as M,
  Phototable as P,
  CarouselData as a,
  PostsContent as b,
  photoTableContent as c,
  PostsContent2 as d,
  post as e,
  CarouselDataCinema as f,
  PostsCinemaContent as g,
  photoTableCinemaHeader as h,
  photoTableCinema as i,
  photoTableContentHeader as p
};
