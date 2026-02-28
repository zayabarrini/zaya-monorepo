import { f as fallback, j as ensure_array_like, e as attr, a as attr_class, l as attr_style, d as stringify, i as escape_html, b as bind_props } from "./vendor-svelte.js";
function Paralax($$renderer, $$props) {
  let pages = fallback($$props["pages"], () => [], true);
  $$renderer.push(`<!--[-->`);
  const each_array = ensure_array_like(pages);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let page = each_array[$$index];
    $$renderer.push(`<div${attr("id", page.id)}${attr_class("parallax", void 0, { "ptext-light": page.light })}${attr_style(` ${stringify(page.backgroundImage ? `background-image: url('${page.backgroundImage}');` : "")} ${stringify(page.backgroundColor ? `background-color: ${page.backgroundColor};` : "")} `)}><div class="ptext"><span${attr_class("border", void 0, { "trans": page.light })}><a${attr("href", page.href || "/posts")}>${escape_html(page.text)}</a></span></div></div>`);
  }
  $$renderer.push(`<!--]--> <div id="page6"><div class="back-bird"></div> <a href="/posts"><div class="logo"></div></a> <div class="fore-bird"></div></div>`);
  bind_props($$props, { pages });
}
const Paralax1 = [
  {
    id: "page5",
    href: "/melancholic-machines",
    text: "Melancholic Machines",
    backgroundImage: "/css/img/Psychoanalysis/Topology13.png"
  },
  {
    id: "page3",
    text: "Courses",
    href: "/courses",
    backgroundImage: "/css/img/Psychoanalysis/Topology15.png"
  },
  {
    id: "page9",
    text: "The Graph of Desire",
    backgroundImage: "/css/img/Psychoanalysis/Topology20.png"
  },
  {
    id: "page11",
    text: "Painting, Sewing, Coloring",
    light: true,
    backgroundImage: "/css/img/Psychoanalysis/Topology16.png"
  },
  {
    id: "page12",
    text: "Borromean Knot and Language",
    backgroundImage: "/css/img/Psychoanalysis/Topology22.png"
  },
  {
    id: "page13",
    text: "Real, Symbolic and Imaginary",
    backgroundImage: "/css/img/Psychoanalysis/Topology22.png"
  },
  {
    id: "page14",
    text: "The Klein Bottle in Lacan's Work",
    backgroundColor: "white"
  }
];
const Paralax2 = [
  { id: "page14", text: "Écrits, Coloring, Flowing" },
  { id: "page13", text: "Cinema, Photography, Poetry" }
];
const ParalaxCinema = [
  {
    id: "page3",
    text: "Love and Connection",
    href: "/favorite-movies",
    backgroundImage: "/css/img/Cinema/Cinema1.png"
  },
  {
    id: "page3",
    text: "Colors, Contrast, Shadows",
    href: "/list?query=Cinema",
    backgroundImage: "/css/img/Cinema/Cinema65.png"
  },
  {
    id: "page3",
    text: "The Structure of Tragedy, Coloring, Flowing",
    href: "/list?query=Cinema",
    backgroundImage: "/css/img/Cinema/Cinema2.png"
  },
  {
    id: "page3",
    text: "Drama, Comedy, Poetry",
    href: "/list?query=Cinema",
    backgroundImage: "/css/img/Cinema/Cinema3.png"
  },
  {
    id: "page3",
    text: "Topology, CGI, Animation",
    href: "/list?query=Cinema",
    backgroundImage: "/css/img/Cinema/Cinema4.png"
  }
];
[
  ...Array.from({ length: 73 }, (_, i) => ({
    id: "page3",
    href: "/list?query=Cinema",
    text: [
      "Love & Cinema",
      "Frames of Passion",
      "Intimacy in Motion",
      "Color & Emotion",
      "The Art of Light",
      "Cinematic Poetry",
      "Shadows & Contrast",
      "Surreal Frames",
      "Dreamlike Sequences",
      "Tragic Beauty",
      "Art & Aesthetics",
      "Silent Expressions",
      "Drama in Colors",
      "Light, Dark & Mood",
      "Movement & Meaning",
      "Choreography of Scenes",
      "Whispers of the Screen",
      "Ethereal Visuals",
      "Abstract Narratives",
      "The Flow of Images"
    ][i % 20],
    // Cycle through 20 different headers
    backgroundImage: `/css/img/Cinema/Cinema${51 + i}.png`
  }))
].sort(() => Math.random() - 0.5).slice(0, 10);
const ParallaxMelancholicMachines = [
  ...Array.from({ length: 73 }, (_, i) => ({
    id: "page3",
    text: [
      "Flows",
      "Subject Supposed to Know",
      "Poverty, wealth, Heterosexuality",
      "Dandy",
      "Time, Renunciation",
      "Theatrical Machines",
      "Delusional Machines",
      "Panic Machines",
      "Foreign Machines",
      "Melancholic Machines",
      "Paranoid Machines",
      "Artistic Machines",
      "Manic Machines",
      "Slutty, naughty, hot machines",
      "Holy Machines",
      "Gentle Machines",
      "Fragile Machines",
      "Musical Machines",
      "Devastated Machines",
      "Magical Machines",
      "Cinematographic Machines",
      "Limiting Machines",
      "Psychoanalysis",
      "Dimension of saying, of what is said",
      "Topological figure induced by the object a",
      "From free association to computer code - machine code",
      "Significant alienation",
      "Equations, Science of Psychoanalytic Machines",
      "Equation with variable x = melancholy",
      "Psychoanalysis of machines",
      "Between losses ",
      "Artistic Machines",
      "Logic of Uncertainty",
      "Mathematical un-logic",
      "Introduction to Phallic Computing",
      "Epistemology and Philosophy of Science",
      "Differential and Integral Calculus I (Consistency)",
      "Gender Vectors and Analytical Biology Geometry",
      "Fundamentals of Perfect Bodies Computer Graphics",
      "Distributed Poetic Processing",
      "Vocabularies, Language Field",
      "Vocabulary of Psychoanalysis",
      "Freud, Lacan",
      "European Vocabulary of Philosophy",
      "Vocabulary of Electronic Engineering, Computing",
      "Mathematics, Machine Learning, Business",
      "Programming Languages, Religion",
      "GROWING AND NAVIGATION IN ALTERNATIVE MODELS OF SMALL-WORLDS",
      "Flows, Waterfalls, Sunsets",
      "Empty, baby, Gale",
      "Calm, soft, good",
      "Lost, Waves, Drizzle",
      "I'll go, I'll wait",
      "You won't come anymore",
      "Stones on the beach",
      "The hours, Losing",
      "If only I knew that she could disappear",
      "Idea of ​​happiness",
      "But I still have to face the hours",
      "I've abandoned them",
      "Having two lives",
      "I remember one morning",
      "Looking life in the face",
      "It's possible to die",
      "Being stuck",
      "Fantasies, Imaginary fights, Vines",
      "Between coffees, Under trees",
      "Benediction",
      "Measure of laxity",
      "Something permanent, unchanging.",
      "Quick to tears, slow to love"
    ][i % 70],
    // Cycle through 20 different headers
    backgroundImage: `/css/img/Cinema/Cinema${51 + i}.png`
  }))
].sort(() => Math.random() - 0.5).slice(0, 10);
const ParallaxCinema2025 = [
  ...Array.from({ length: 103 }, (_, i) => ({
    id: "page3",
    text: [
      "Flows",
      "Subject Supposed to Know",
      "Poverty, wealth, Heterosexuality",
      "Dandy",
      "Time, Renunciation",
      "Theatrical Machines",
      "Delusional Machines",
      "Panic Machines",
      "Foreign Machines",
      "Melancholic Machines",
      "Paranoid Machines",
      "Artistic Machines",
      "Manic Machines",
      "Slutty, naughty, hot machines",
      "Holy Machines",
      "Gentle Machines",
      "Fragile Machines",
      "Musical Machines",
      "Devastated Machines",
      "Magical Machines",
      "Cinematographic Machines",
      "Limiting Machines",
      "Psychoanalysis",
      "Dimension of saying, of what is said",
      "Topological figure induced by the object a",
      "From free association to computer code - machine code",
      "Significant alienation",
      "Equations, Science of Psychoanalytic Machines",
      "Equation with variable x = melancholy",
      "Psychoanalysis of machines",
      "Between losses ",
      "Artistic Machines",
      "Logic of Uncertainty",
      "Mathematical un-logic",
      "Introduction to Phallic Computing",
      "Epistemology and Philosophy of Science",
      "Differential and Integral Calculus I (Consistency)",
      "Gender Vectors and Analytical Biology Geometry",
      "Fundamentals of Perfect Bodies Computer Graphics",
      "Distributed Poetic Processing",
      "Vocabularies, Language Field",
      "Vocabulary of Psychoanalysis",
      "Freud, Lacan",
      "European Vocabulary of Philosophy",
      "Vocabulary of Electronic Engineering, Computing",
      "Mathematics, Machine Learning, Business",
      "Programming Languages, Religion",
      "GROWING AND NAVIGATION IN ALTERNATIVE MODELS OF SMALL-WORLDS",
      "Flows, Waterfalls, Sunsets",
      "Empty, baby, Gale",
      "Calm, soft, good",
      "Lost, Waves, Drizzle",
      "I'll go, I'll wait",
      "You won't come anymore",
      "Stones on the beach",
      "The hours, Losing",
      "If only I knew that she could disappear",
      "Idea of ​​happiness",
      "But I still have to face the hours",
      "I've abandoned them",
      "Having two lives",
      "I remember one morning",
      "Looking life in the face",
      "It's possible to die",
      "Being stuck",
      "Fantasies, Imaginary fights, Vines",
      "Between coffees, Under trees",
      "Benediction",
      "Measure of laxity",
      "Something permanent, unchanging.",
      "Quick to tears, slow to love"
    ][i % 70],
    // Cycle through 20 different headers
    backgroundImage: `/css/img/Cinema/Cinema${125 + i}.png`
  }))
].sort(() => Math.random() - 0.5).slice(0, 10);
export {
  Paralax as P,
  Paralax1 as a,
  Paralax2 as b,
  ParalaxCinema as c,
  ParallaxCinema2025 as d,
  ParallaxMelancholicMachines as e
};
