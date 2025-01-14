/* global URL, TextDecoder,  __VERSION__ */ // __VERSION__ is injected by babel-plugin-version-inline

const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'latest';

import {load} from '@loaders.gl/core';

import {normalizeTileData, normalizeTilesetData} from './lib/parsers/parse-i3s';
import {parseI3STileContent} from './lib/parsers/parse-i3s-tile-content';

const TILESET_REGEX = /layers\/[0-9]+$/;
const TILE_HEADER_REGEX = /nodes\/([0-9-]+|root)$/;

async function parseTileContent(arrayBuffer, options, context) {
  options = options.i3s || {};
  const tile = options.tile;
  const tileset = options.tileset;
  tile.content = tile.content || {};
  await parseI3STileContent(arrayBuffer, tile, tileset, options);
  return tile.content;
}

async function parseTileset(data, options, context) {
  const tilesetJson = JSON.parse(new TextDecoder().decode(data));
  // eslint-disable-next-line no-use-before-define
  tilesetJson.loader = I3SLoader;
  await normalizeTilesetData(tilesetJson, options, context);

  return tilesetJson;
}

async function parseTile(data, options, context) {
  data = JSON.parse(new TextDecoder().decode(data));
  return normalizeTileData(data, options, context);
}

const I3SLoader = {
  id: 'i3s',
  name: 'I3S 3D Tiles',
  version: VERSION,
  extensions: ['json', 'bin'],
  mimeType: 'application/octet-stream',
  parse,
  options: {
    i3s: {
      loadContent: true
    }
  }
};

async function parse(data, options, context, loader) {
  const url = new URL(context.url);
  options.i3s = options.i3s || {};
  options.i3s.token = options.i3s.token || url.searchParams.get('token');

  // auto detect file type based on url
  let isTileset;
  if ('isTileset' in options.i3s) {
    isTileset = options.i3s.isTileset;
  } else {
    isTileset = TILESET_REGEX.test(url.pathname);
  }

  let isTileHeader;
  if ('isTileHeader' in options) {
    isTileHeader = options.isTileHeader;
  } else {
    isTileHeader = TILE_HEADER_REGEX.test(url.pathname);
  }

  if (isTileset) {
    data = await parseTileset(data, options, context, loader);
  } else if (isTileHeader) {
    data = await parseTile(data, options, context);
    if (options.i3s.loadContent) {
      options.i3s.tile = data;
      await load(data.contentUrl, I3SLoader, options);
    }
  } else {
    data = await parseTileContent(data, options, context);
  }

  return data;
}

export default I3SLoader;
