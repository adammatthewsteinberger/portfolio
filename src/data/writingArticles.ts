/**
 * The /writing/articles section: one source for its paths, content
 * directories, and the copy that describes it. The page metadata, the chat
 * bot's knowledge base (writingArticlesChunk() in kb-sources.ts), the sitemap,
 * the feeds and public/llms.txt all read it, so they cannot drift.
 *
 * The articles were written for Humbleberger Ministries, a gospel-centered
 * mission to Jewish people that Adam founded, and were moved here from that
 * project's own repository. Every article has a Hebrew twin of the same slug
 * under /he. They are faith writing, kept apart from the engineering work and
 * deliberately not one of the six tracks.
 */
import type { Locale } from '@/lib/locales';

export const WRITING_ARTICLES_PATH = '/writing/articles';
export const WRITING_ARTICLES_HE_PATH = '/he/writing/articles';
export const WRITING_ARTICLES_FEED_PATH = '/writing/articles/feed.xml';
export const WRITING_ARTICLES_HE_FEED_PATH = '/he/writing/articles/feed.xml';

/** Both directories hold files of the same names; the Hebrew ones sit in `he/`. */
export const WRITING_ARTICLES_DIR = 'src/content/writing-articles';
export const WRITING_ARTICLES_HE_DIR = 'src/content/writing-articles/he';

export const writingArticlesSection = {
  title: 'Articles',
  description:
    'Articles for Jewish seekers and believers: who Yeshua is, what the Hebrew Scriptures say about the Messiah, sin and atonement, and life as a Jewish believer, each also in Hebrew.',
  intro:
    'Articles on who Yeshua is, what the Hebrew Scriptures say about the Messiah, sin and atonement, and what it means to follow him as a Jew. They were written for Humbleberger Ministries, a mission to Jewish people that Adam founded, and every one is also available in Hebrew. They sit apart from the engineering work on the rest of this site.',
  /** What the chat bot may say about them: what they are, and what they are not. */
  botNote:
    'They are faith writing from Humbleberger Ministries, a mission Adam founded, and every article is also in Hebrew under /he/writing/articles. They are separate from the engineering work and are not technical documentation or professional claims; they imply no employer, university, government or other institutional affiliation.',
} as const;

/** The Hebrew twin's page copy and interface strings. */
export const writingArticlesHe = {
  title: 'מאמרים',
  description:
    'מאמרים למחפשים ולמאמינים יהודים: מי הוא ישוע, מה אומרים כתבי הקודש העבריים על המשיח, חטא וכפרה, והחיים כיהודי מאמין.',
  intro:
    'מאמרים על מי הוא ישוע, מה אומרים כתבי הקודש העבריים על המשיח, חטא וכפרה, ומה פירוש הדבר לעקוב אחריו כיהודי. הם נכתבו עבור שירות האמבלברגר, שליחות ליהודים שאדם ייסד, וכל מאמר זמין גם באנגלית. הם נפרדים מעבודת ההנדסה בשאר האתר.',
  by: 'מאת',
  writing: 'כתיבה',
  moreArticles: 'מאמרים נוספים',
  backToArticles: 'חזרה למאמרים',
} as const;

/** What the shared list and article views need, per language. */
export function articleSection(locale: Locale) {
  return locale === 'he'
    ? {
        locale,
        dir: WRITING_ARTICLES_HE_DIR,
        path: WRITING_ARTICLES_HE_PATH,
        title: writingArticlesHe.title,
        intro: writingArticlesHe.intro,
        by: writingArticlesHe.by,
        writing: writingArticlesHe.writing,
        moreArticles: writingArticlesHe.moreArticles,
        backToArticles: writingArticlesHe.backToArticles,
      }
    : {
        locale,
        dir: WRITING_ARTICLES_DIR,
        path: WRITING_ARTICLES_PATH,
        title: writingArticlesSection.title,
        intro: writingArticlesSection.intro,
        by: 'By',
        writing: 'Writing',
        moreArticles: 'More articles',
        backToArticles: 'Back to Articles',
      };
}
