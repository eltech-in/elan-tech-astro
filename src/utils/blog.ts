type BlogPublicationData = {
  draft?: boolean;
  publishEarly?: boolean;
  publishDate: Date;
};

/** Future posts stay hidden unless explicitly approved for an upload-ready build. */
export function isPublishedPost(data: BlogPublicationData, now = new Date()) {
  return data.draft !== true && (data.publishEarly === true || data.publishDate.getTime() <= now.getTime());
}
