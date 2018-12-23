import * as sanityClient from '@sanity/client';

import {IPost, IPostNormalized} from '../../interfaces';

const getClient = () => sanityClient({
  projectId: 'v475t82f',
  dataset: 'production'
});

const getReleaseNotes = (): Promise<object[]> => {
  const query = '*[_type == "release"] | order(version desc)';
  const client = getClient();
  return client.fetch(query);
};

const renderTemplate = (posts: IPostNormalized[]) => {
  return `${posts.reduce((acc, {version, title, fixed, new: newItems, breaking}) => acc.concat(`<section class="Release">
    <header class="Release__Header">
      <span class="Release__Number">${version}</span>
      <h2 class="Release__Title">${title}</h2>
    </header>
    <ul class="Release-List">
      ${fixed.reduce((accc: string, src) =>
        src.length > 0 ? accc.concat(`<li data-type="fixed">${src}</li>`) : '', '')}
      ${newItems.reduce((accc: string, src) =>
        src.length > 0 ? accc.concat(`<li data-type="new">${src}</li>`) : '', '')}
      ${breaking.reduce((accc: string, src) =>
        src.length > 0 ? accc.concat(`<li data-type="breaking">${src}</li>`) : '', '')}
    </ul>
  </section>`), '')}`;
};

getReleaseNotes().then((res: IPost[]) => {
  const normalized = res.reduce((acc, src) => acc.concat({
    ...src,
    fixed: src.fixed ? src.fixed.map(item => item.children[0].text) : [],
    new: src.new ? src.new.map(item => item.children[0].text) : [],
    breaking: src.breaking ? src.breaking.map(item => item.children[0].text) : []
  }), []);
  document.querySelector('.Container').innerHTML = renderTemplate(normalized);
});
