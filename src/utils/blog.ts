type BlogPublicationData = {
  draft?: boolean;
  publishDate: Date;
};

/** Keep drafts and future-dated posts out of every public blog surface. */
export function isPublishedPost(data: BlogPublicationData, now = new Date()) {
  return data.draft !== true && data.publishDate.getTime() <= now.getTime();
}
