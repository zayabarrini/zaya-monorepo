import { json } from "@sveltejs/kit";
const GET = async () => {
  const markdownPostModules = /* @__PURE__ */ Object.assign({
    "/src/posts/Arabic.md": () => import("../../../../chunks/Arabic.js"),
    "/src/posts/CVs-CV-AudioVisual.md": () => import("../../../../chunks/CVs-CV-AudioVisual.js"),
    "/src/posts/CVs-CV-IAs.md": () => import("../../../../chunks/CVs-CV-IAs.js"),
    "/src/posts/CVs-CV-Talles-Barrini-Writing-Performance.md": () => import("../../../../chunks/CVs-CV-Talles-Barrini-Writing-Performance.js"),
    "/src/posts/CVs-Cv-strategies.md": () => import("../../../../chunks/CVs-Cv-strategies.js"),
    "/src/posts/CVs-Dev-CV.md": () => import("../../../../chunks/CVs-Dev-CV.js"),
    "/src/posts/CVs-Path-to-Psychoanalysis.md": () => import("../../../../chunks/CVs-Path-to-Psychoanalysis.js"),
    "/src/posts/CVs-Presentation-school-of-cinema-art-psychoanalysis.md": () => import("../../../../chunks/CVs-Presentation-school-of-cinema-art-psychoanalysis.js"),
    "/src/posts/CVs-School-cinema-art-psychoanalysis.md": () => import("../../../../chunks/CVs-School-cinema-art-psychoanalysis.js"),
    "/src/posts/CVs-Startup-Checklist.md": () => import("../../../../chunks/CVs-Startup-Checklist.js"),
    "/src/posts/Cinema-Quotes-Theather-Performance.md": () => import("../../../../chunks/Cinema-Quotes-Theather-Performance.js"),
    "/src/posts/Cinema-Quotes.md": () => import("../../../../chunks/Cinema-Quotes.js"),
    "/src/posts/Cinema-QuotesFavoriteMovies.md": () => import("../../../../chunks/Cinema-QuotesFavoriteMovies.js"),
    "/src/posts/Cinema-Structure-of-tragedy.md": () => import("../../../../chunks/Cinema-Structure-of-tragedy.js"),
    "/src/posts/Cvs-Data.md": () => import("../../../../chunks/Cvs-Data.js"),
    "/src/posts/Dictionary-100DifficultSentences.md": () => import("../../../../chunks/Dictionary-100DifficultSentences.js"),
    "/src/posts/Dictionary-100Sentences.md": () => import("../../../../chunks/Dictionary-100Sentences.js"),
    "/src/posts/Dictionary-Actress-Actor-Director.md": () => import("../../../../chunks/Dictionary-Actress-Actor-Director.js"),
    "/src/posts/Dictionary-AdvancedConjunctions.md": () => import("../../../../chunks/Dictionary-AdvancedConjunctions.js"),
    "/src/posts/Dictionary-Business.md": () => import("../../../../chunks/Dictionary-Business.js"),
    "/src/posts/Dictionary-ChildPsychoanalysis.md": () => import("../../../../chunks/Dictionary-ChildPsychoanalysis.js"),
    "/src/posts/Dictionary-GrammaticalWords.md": () => import("../../../../chunks/Dictionary-GrammaticalWords.js"),
    "/src/posts/Dictionary-HSK.md": () => import("../../../../chunks/Dictionary-HSK.js"),
    "/src/posts/Dictionary-LGBTWorld.md": () => import("../../../../chunks/Dictionary-LGBTWorld.js"),
    "/src/posts/Dictionary-Lacan.md": () => import("../../../../chunks/Dictionary-Lacan.js"),
    "/src/posts/Dictionary-ML-Psychoanalysis-Semioptics.md": () => import("../../../../chunks/Dictionary-ML-Psychoanalysis-Semioptics.js"),
    "/src/posts/Dictionary-Mobius-Klein.md": () => import("../../../../chunks/Dictionary-Mobius-Klein.js"),
    "/src/posts/Dictionary-ModernPsychoanalysis.md": () => import("../../../../chunks/Dictionary-ModernPsychoanalysis.js"),
    "/src/posts/Dictionary-Movies.md": () => import("../../../../chunks/Dictionary-Movies.js"),
    "/src/posts/Dictionary-Music.md": () => import("../../../../chunks/Dictionary-Music.js"),
    "/src/posts/Dictionary-Numbers.md": () => import("../../../../chunks/Dictionary-Numbers.js"),
    "/src/posts/Dictionary-Philosophy.md": () => import("../../../../chunks/Dictionary-Philosophy.js"),
    "/src/posts/Dictionary-Psychoanalysis.md": () => import("../../../../chunks/Dictionary-Psychoanalysis.js"),
    "/src/posts/Dictionary-Sade.md": () => import("../../../../chunks/Dictionary-Sade.js"),
    "/src/posts/Dictionary-Theology.md": () => import("../../../../chunks/Dictionary-Theology.js"),
    "/src/posts/Dictionary-Volleyball.md": () => import("../../../../chunks/Dictionary-Volleyball.js"),
    "/src/posts/Dictionary-WordList.md": () => import("../../../../chunks/Dictionary-WordList.js"),
    "/src/posts/Hindi.md": () => import("../../../../chunks/Hindi.js"),
    "/src/posts/Languages-Alphabets.md": () => import("../../../../chunks/Languages-Alphabets.js"),
    "/src/posts/Languages-Frequency-Arabic.md": () => import("../../../../chunks/Languages-Frequency-Arabic.js"),
    "/src/posts/Languages-Frequency-French.md": () => import("../../../../chunks/Languages-Frequency-French.js"),
    "/src/posts/Languages-Frequency-German.md": () => import("../../../../chunks/Languages-Frequency-German.js"),
    "/src/posts/Languages-Frequency-Hindi.md": () => import("../../../../chunks/Languages-Frequency-Hindi.js"),
    "/src/posts/Languages-Frequency-Italian.md": () => import("../../../../chunks/Languages-Frequency-Italian.js"),
    "/src/posts/Languages-Frequency-Russian.md": () => import("../../../../chunks/Languages-Frequency-Russian.js"),
    "/src/posts/Languages-Phonetics-ar.md": () => import("../../../../chunks/Languages-Phonetics-ar.js"),
    "/src/posts/Languages-Phonetics-ch.md": () => import("../../../../chunks/Languages-Phonetics-ch.js"),
    "/src/posts/Languages-Phonetics-de.md": () => import("../../../../chunks/Languages-Phonetics-de.js"),
    "/src/posts/Languages-Phonetics-hi.md": () => import("../../../../chunks/Languages-Phonetics-hi.js"),
    "/src/posts/Languages-Phonetics-ja.md": () => import("../../../../chunks/Languages-Phonetics-ja.js"),
    "/src/posts/Languages-Phonetics-ru.md": () => import("../../../../chunks/Languages-Phonetics-ru.js"),
    "/src/posts/Music-2025-1D-BS-db-ar.md": () => import("../../../../chunks/Music-2025-1D-BS-db-ar.js"),
    "/src/posts/Music-2025.md": () => import("../../../../chunks/Music-2025.js"),
    "/src/posts/Music-BTS-Ja.md": () => import("../../../../chunks/Music-BTS-Ja.js"),
    "/src/posts/Music-Britney.md": () => import("../../../../chunks/Music-Britney.js"),
    "/src/posts/Music-Get-Together.md": () => import("../../../../chunks/Music-Get-Together.js"),
    "/src/posts/Music-Languages.md": () => import("../../../../chunks/Music-Languages.js"),
    "/src/posts/Music-Mulheres-Apaixonadas.md": () => import("../../../../chunks/Music-Mulheres-Apaixonadas.js"),
    "/src/posts/Music-NB-Mansionair-DR.md": () => import("../../../../chunks/Music-NB-Mansionair-DR.js"),
    "/src/posts/Music-OneDirection.md": () => import("../../../../chunks/Music-OneDirection.js"),
    "/src/posts/Music-Practice-Arabic-Songs.md": () => import("../../../../chunks/Music-Practice-Arabic-Songs.js"),
    "/src/posts/Music-Practice-Chinese-Songs.md": () => import("../../../../chunks/Music-Practice-Chinese-Songs.js"),
    "/src/posts/Music-Practice-French-Songs.md": () => import("../../../../chunks/Music-Practice-French-Songs.js"),
    "/src/posts/Music-Practice-Hindi-Songs.md": () => import("../../../../chunks/Music-Practice-Hindi-Songs.js"),
    "/src/posts/Music-Practice-Italian-Songs.md": () => import("../../../../chunks/Music-Practice-Italian-Songs.js"),
    "/src/posts/Music-Practice-Japanese-Songs-Spotify-Lyrics.md": () => import("../../../../chunks/Music-Practice-Japanese-Songs-Spotify-Lyrics.js"),
    "/src/posts/Music-Practice-Japanese-Songs-mixed.md": () => import("../../../../chunks/Music-Practice-Japanese-Songs-mixed.js"),
    "/src/posts/Music-Practice-Japanese-Songs.md": () => import("../../../../chunks/Music-Practice-Japanese-Songs.js"),
    "/src/posts/Music-Practice-Korean-Songs.md": () => import("../../../../chunks/Music-Practice-Korean-Songs.js"),
    "/src/posts/Music-Practice-Languages-Music.md": () => import("../../../../chunks/Music-Practice-Languages-Music.js"),
    "/src/posts/Music-Practice-Russian-Songs.md": () => import("../../../../chunks/Music-Practice-Russian-Songs.js"),
    "/src/posts/Music-Practive-German-Songs.md": () => import("../../../../chunks/Music-Practive-German-Songs.js"),
    "/src/posts/Music-SingAlong.md": () => import("../../../../chunks/Music-SingAlong.js"),
    "/src/posts/Music-Songs.md": () => import("../../../../chunks/Music-Songs.js"),
    "/src/posts/Music-Songs_Lyrics-db-ar.md": () => import("../../../../chunks/Music-Songs_Lyrics-db-ar.js"),
    "/src/posts/Music-Woman.md": () => import("../../../../chunks/Music-Woman.js"),
    "/src/posts/Music-Zayn-Room-Under-the-stairs.md": () => import("../../../../chunks/Music-Zayn-Room-Under-the-stairs.js"),
    "/src/posts/Practice-Conversing.md": () => import("../../../../chunks/Practice-Conversing.js"),
    "/src/posts/Practice-KoreanMusic.md": () => import("../../../../chunks/Practice-KoreanMusic.js"),
    "/src/posts/Practice-Signs.md": () => import("../../../../chunks/Practice-Signs.js"),
    "/src/posts/Practice-Songs.md": () => import("../../../../chunks/Practice-Songs.js"),
    "/src/posts/Practice-Structure.md": () => import("../../../../chunks/Practice-Structure.js"),
    "/src/posts/Psychoanalysis-Language-Arabic.md": () => import("../../../../chunks/Psychoanalysis-Language-Arabic.js"),
    "/src/posts/Psychoanalysis-Language-Chinese.md": () => import("../../../../chunks/Psychoanalysis-Language-Chinese.js"),
    "/src/posts/Psychoanalysis-Language-German.md": () => import("../../../../chunks/Psychoanalysis-Language-German.js"),
    "/src/posts/Psychoanalysis-Language-Hindi.md": () => import("../../../../chunks/Psychoanalysis-Language-Hindi.js"),
    "/src/posts/Psychoanalysis-Language-Japanese.md": () => import("../../../../chunks/Psychoanalysis-Language-Japanese.js"),
    "/src/posts/Psychoanalysis-Language-Korean.md": () => import("../../../../chunks/Psychoanalysis-Language-Korean.js"),
    "/src/posts/Psychoanalysis-Language-Russian.md": () => import("../../../../chunks/Psychoanalysis-Language-Russian.js"),
    "/src/posts/Psychoanalysis-Parenting-LGBTQAPI+.md": () => import("../../../../chunks/Psychoanalysis-Parenting-LGBTQAPI_.js"),
    "/src/posts/Psychoanalysis-Semiotics-LGBTQAPI+Women.md": () => import("../../../../chunks/Psychoanalysis-Semiotics-LGBTQAPI_Women.js"),
    "/src/posts/Psychoanalysis-Semiotics-Linguistics.md": () => import("../../../../chunks/Psychoanalysis-Semiotics-Linguistics.js"),
    "/src/posts/Psychoanalysis-Semiotics-Topology.md": () => import("../../../../chunks/Psychoanalysis-Semiotics-Topology.js"),
    "/src/posts/Psychoanalysis-Semiotics.md": () => import("../../../../chunks/Psychoanalysis-Semiotics.js"),
    "/src/posts/Theater-DragRaceS05E01.md": () => import("../../../../chunks/Theater-DragRaceS05E01.js"),
    "/src/posts/Theater-Quotes.md": () => import("../../../../chunks/Theater-Quotes.js"),
    "/src/posts/Theater-SurvivorAuS08E07.md": () => import("../../../../chunks/Theater-SurvivorAuS08E07.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ar.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ar.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ch.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ch.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-de.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-de.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-fr.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-fr.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-hi.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-hi.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-it.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-it.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ja.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ja.js"),
    "/src/posts/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ru.md": () => import("../../../../chunks/cinema-quotes-doubt-primordial-scence-fantasy-abuse-db-ru.js"),
    "/src/posts/music-languages-ml-practice.md": () => import("../../../../chunks/music-languages-ml-practice.js")
  });
  const postPromises = [];
  for (const path in markdownPostModules) {
    const loadMarkdownPostModule = markdownPostModules[path];
    const loadPostSlugAndMetadata = async function() {
      const markdownPostModule = await loadMarkdownPostModule();
      const slug = path.slice(path.lastIndexOf("/") + 1).replace(".md", "");
      return {
        slug,
        metadata: markdownPostModule.metadata
      };
    };
    postPromises.push(loadPostSlugAndMetadata());
  }
  const posts = await Promise.all(postPromises);
  posts.sort((post1, post2) => {
    return new Date(post2.metadata.publishedAt).getTime() - new Date(post1.metadata.publishedAt).getTime();
  });
  return json(posts.slice(0, 4));
};
export {
  GET
};
