import sanitizeHtml from 'sanitize-html';

export const santizeContent = (content: string) => {
    return sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat("img"), 
      allowedAttributes: {
        a: [ 'href', 'name', 'target' ],
        img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
      }
    })
}