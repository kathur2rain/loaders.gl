const DOCS = require('../arrow-docs/table-of-contents.json');

module.exports = {
  logLevel: 4,

  DIR_NAME: `${__dirname}`,
  DOC_FOLDER: `${__dirname}/../arrow-docs`,
  ROOT_FOLDER: `${__dirname}/..`,

  DOCS,
  EXAMPLES: [],


  // TODO/ib - from ocular, deduplicate with above settings
  PROJECT_TYPE: 'github',

  PROJECT_NAME: 'arrowjs',
  PROJECT_ORG: 'uber-web',
  PROJECT_URL: 'https://github.com/uber-web/loaders.gl',
  PROJECT_DESC: 'Apache Arrow JavaScript Bindings',
  WEBSITE: '/arrow-website',
  PATH_PREFIX: 'arrow-website',

  FOOTER_LOGO: '',

  PROJECTS: [],

  HOME_PATH: '/',

  HOME_HEADING: 'Framework agnostic loaders for visualization assets',

  HOME_RIGHT: null,

  HOME_BULLETS: [],

  ADDITIONAL_LINKS: [],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null
};