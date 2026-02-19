import AutoProvider from "@trailstash/ultra/lib/queryProviders/auto.js";
import overpass from "@trailstash/ultra/lib/queryProviders/overpass.js";
import { all } from "@trailstash/ultra/lib/queryProviders/index.js";

const mapStyle = "https://styles.maprva.org/openmaptiles-osm.json";
const query = `/*
This is an example Overpass query.
Try it out by pressing the Run button above!
*/
[bbox:{{bbox}}];
(
way[highway=path];
way[highway=footway];
way[highway=cycleway];
way[highway=steps];
);
out geom;`;

const help = `# Introduction

This is a custom deploy of Ultra for MapRVA which uses overpass.maprva.org/api as the default overpass server.

Ultra (née Overpass Ultra) is a web-application made to simplify making maps with [MapLibre GL
JS](https://maplibre.org) with data from various file/query types such as Overpass, GeoJSON, GPX, and more.

## Documentation

Full documentation for Ultra is available at https://overpass-ultra.us/docs/

## Configuration

Various aspects of Ultra, such as styling, can be
configured via [YAML front-matter](https://overpass-ultra.us/docs/yaml).

## Styling

Ultra supports styling using an extended version of the the
[MapLibre Style Spec](https://maplibre.org/maplibre-style-spec/).

See the [Styling](https://overpass-ultra.us/docs/style) section for more information.

## Overpass Queries

The Overpass API allows you to query for OSM data by your own search criteria. For this purpose, it
has a specifically crafted query language: [Overpass
QL](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL)

In addition to regular Overpass API queries one can use \`{{bbox}}\` to specify the bounding box
coordinates of the current map view.

## About

Ultra is built by Daniel Schep.

You can contact me on [Mastodon](https://mapstodon.space/@trailstash).

## Feedback, Bug Reports, Feature Requests

While Ultra has been in development for a while, it should still be considered
experimental.

If you would like to report a bug or provide other feedback, please do so in the project's
[Issue Tracker](https://gitlab.com/trailstash/ultra/-/issues).

## Source Code</h4>

The [source code](https://gitlab.com/trailstash/ultra) of this application is released under the
[MIT license](https://gitlab.com/trailstash/ultra/-/blob/main/LICENSE).
```

const customAll = {
  ...all,
  overpass: {
    ...overpass,
    source: async function (query, controller, { server }) {
      if (!server) {
        server = "https://overpass.maprva.org/api";
      }
      return overpass.source(query, controller, { server });
    },
  },
};

const settings = {
  type: "auto",
  mapStyle,
  queryProviders: {
    auto: new AutoProvider(customAll),
    ...customAll,
  },
};

const omtAttribution = '<a target="_blank" href="https://openmaptiles.org">OpenMapTiles</a> (Tiles by <a target="_blank" href="https://tiles.openstreetmap.us/">OSM US</a>)';
const styles = [
  [
    `OSM OpenMapTiles`,
    "https://styles.maprva.org/openmaptiles-osm.json",
    omtAttribution,
  ],
  [
    `OSM Liberty`,
    "https://styles.maprva.org/osm-liberty.json",
    omtAttribution,
  ],
  [
    `OSM Bright`,
    "https://styles.maprva.org/osm-bright.json",
    omtAttribution,
  ],
  [
    `Positron`,
    "https://styles.maprva.org/positron.json",
    omtAttribution,
  ],
  [
    `Dark Matter`,
    "https://styles.maprva.org/dark-matter.json",
    omtAttribution,
  ],
  [
    `MapTiler Basic`,
    "https://styles.maprva.org/maptiler-basic.json",
    omtAttribution,
  ],
  [
    `MapTiler 3D`,
    "https://styles.maprva.org/maptiler-3d.json",
    omtAttribution,
  ],
  [
    `Toner`,
    "https://styles.maprva.org/maptiler-toner.json",
    omtAttribution,
  ],
  [
    `Fiord Color`,
    "https://styles.maprva.org/fiord-color.json",
    omtAttribution,
  ],
  [
    `Virginia Base Mapping Program`,
    "https://styles.maprva.org/vgin-vbmp-imagery-latest.json",
    `Imagery`,
  ],
  [
    `Henrico Aerial Imagery`,
    "https://styles.maprva.org/henrico-aerial-imagery-latest.json",
    `Imagery`,
  ],
  [
    `Esri World Imagery`,
    "https://styles.maprva.org/henrico-aerial-imagery-latest.json",
    `Imagery`,
  ],
];


export const defaultMode = "ide";
export const modes = {
  ide: {
    query,
    styles,
    settings: {
      ...settings,
      help,
      title: "MapRVA Ultra",
      url: "https://ultra.maprva.org",
      options: {
        hash: "m",
        attributionControl: {
          customAttribution: "",
        },
      },
    },
  },
  map: {
    settings: {
      ...settings,
      loadSettingsFromQueryParams: true,
      options: {
        attributionControl: {
          compact: true,
          customAttribution: `<a href=".">Ultra</a>
            (<a href="javascript:new URLSearchParams(window.location.hash.slice(1));params.delete("map");window.location=new URL("#"+params.toString(),window.location).toString();">View Query</a>)`,
        },
      },
    },
  },
};
