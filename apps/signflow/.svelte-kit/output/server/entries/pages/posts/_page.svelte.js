import { m as derived, e as attr, s as store_get, j as ensure_array_like, u as unsubscribe_stores, b as bind_props, w as writable } from "../../../chunks/vendor-svelte.js";
import { P as PostListing } from "../../../chunks/PostListing.js";
/* empty css                    */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let data = $$props["data"];
    let searchQuery = writable("");
    const sortPostsByDate = (posts) => {
      return posts.sort((a, b) => {
        const dateA = new Date(a.metadata.updatedAt || a.metadata.publishedAt);
        const dateB = new Date(b.metadata.updatedAt || b.metadata.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });
    };
    const initialSortedPosts = sortPostsByDate([...data.posts]);
    const filteredPosts = derived(
      searchQuery,
      ($searchQuery, set) => {
        if (!$searchQuery.trim()) {
          set(initialSortedPosts);
        } else {
          const queryLower = $searchQuery.toLowerCase();
          console.log("Filtering posts with query:", queryLower);
          const filtered = initialSortedPosts.filter((post) => {
            const matches = post.metadata.title.toLowerCase().includes(queryLower) || post.slug.toLowerCase().includes(queryLower);
            return matches;
          });
          set(filtered);
        }
      },
      initialSortedPosts
    );
    $$renderer2.push(`<div class="pt-24 max-w-5xl mx-auto mainpage"><section class="pb-6"><header class="inline-block border-b dark:border-gray-700 py-2 mx-4 mb-4"><h2 class="text-3xl font-semibold art">Cinema, Psychoanalysis and Art Creation</h2></header> <div class="mb-4 mx-4"><input type="text" placeholder="Search..." id="search-input-post-list" class="w-full p-2 border border-gray-300 rounded-md dark:bg-input dark:text-white"${attr("value", store_get($$store_subs ??= {}, "$searchQuery", searchQuery))}/></div> <section class="divide-y dark:divide-gray-700"><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$filteredPosts", filteredPosts));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let post = each_array[$$index];
      PostListing($$renderer2, { post });
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$filteredPosts", filteredPosts).length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center py-12 text-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M12 3v2m0 14v2m8-10h2m-18 0H2m16.364 6.364l1.414-1.414M4.222 4.222l1.414 1.414"></path></svg> <h2 class="mt-4 text-2xl font-semibold text-gray-600">No posts found</h2> <p class="mt-2 text-gray-500">Try searching with different keywords.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section></section></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
