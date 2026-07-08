export const landingPageBySlugQuery = `
  *[_type == "landingPage" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    heroImage {
      alt,
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    },
    bodyText,
    features[] {
      _key,
      title,
      body,
      icon
    }
  }
`;

export function getLandingPageParams(slug) {
  return { slug };
}
