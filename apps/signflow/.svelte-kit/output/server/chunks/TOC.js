import { f as fallback, j as ensure_array_like, i as escape_html, b as bind_props } from "./vendor-svelte.js";
function TOC($$renderer, $$props) {
  let toc = fallback($$props["toc"], () => [], true);
  $$renderer.push(`<nav class="p-6 rounded-lg shadow-lg pt-24 max-w-5xl mx-auto"><ul><!--[-->`);
  const each_array = ensure_array_like(toc);
  for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
    let section = each_array[$$index_2];
    $$renderer.push(`<li class="mb-4"><strong class="text-lg">${escape_html(section.title)}</strong> <ul class="ml-4 mt-2 space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(section.sections);
    for (let $$index_1 = 0, $$length2 = each_array_1.length; $$index_1 < $$length2; $$index_1++) {
      let sub = each_array_1[$$index_1];
      if (typeof sub === "string") {
        $$renderer.push("<!--[-->");
        $$renderer.push(`<li class="hover:text-gray-300 cursor-pointer">${escape_html(sub)}</li>`);
      } else {
        $$renderer.push("<!--[!-->");
        $$renderer.push(`<li><strong class="text-md">${escape_html(sub.title)}</strong> <ul class="ml-4 mt-1 space-y-1"><!--[-->`);
        const each_array_2 = ensure_array_like(sub.subsections);
        for (let $$index = 0, $$length3 = each_array_2.length; $$index < $$length3; $$index++) {
          let item = each_array_2[$$index];
          $$renderer.push(`<li class="hover:text-gray-300 cursor-pointer">${escape_html(item)}</li>`);
        }
        $$renderer.push(`<!--]--></ul></li>`);
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]--></ul></li>`);
  }
  $$renderer.push(`<!--]--></ul></nav>`);
  bind_props($$props, { toc });
}
const TOCMelancholicMachines = [
  {
    title: "Melancholic Machines",
    sections: [
      "Structure",
      "Texts Summary",
      "Introduction",
      {
        title: "Flows",
        subsections: [
          "Supposed Subject",
          "Poverty",
          "Wealth",
          "Heterosexualism",
          "Dandy",
          "Time",
          "Renunciation"
        ]
      },
      {
        title: "Theatrical Machines",
        subsections: [
          "Delirious Machines",
          "Panic Machine",
          "Foreign Machines",
          "Melancholic Machines",
          "Paranoid Machines",
          "Artistic Machines",
          "Maniac Machines",
          "Vagabond, Naughty, Sensual Machine",
          "Holy Machines",
          "Soft Machines",
          "Fragile Machines",
          "Musical Machine",
          "Devastated Machines",
          "Magical Machines",
          "Cinematographic Machine",
          "Limited Machines"
        ]
      }
    ]
  },
  {
    title: "Psychoanalysis",
    sections: [
      "Dimension of Saying and Said",
      "Topological Figure Induced by Object a",
      "From Free Association to Machine Code Computation",
      "Signifier Alienation"
    ]
  },
  {
    title: "Equations, Science of Psychoanalytic Machines",
    sections: [
      "Equation with Variable x = Melancholia",
      "Psychoanalysis of Machines",
      "Between Machines and Losses?"
    ]
  }
];
export {
  TOC as T,
  TOCMelancholicMachines as a
};
