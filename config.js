const server = "https://overpass-api.openhistoricalmap.org/api/";
const mapStyle = "https://www.openhistoricalmap.org/map-styles/main/main.json";
const query = `/*
This is an example Overpass query.
Try it out by pressing the Run button above!
*/
nwr["amenity"="theatre"]["start_date"](if:
  t["start_date"] < "1976" &&
  (!is_tag("end_date") || t["end_date"] >= "1975"));

out geom;
`;

const popupTemplate = `
  <h2>
    {{ type }}
    <a href="https://openhistoricalmap.org/{{ type }}/{{ id }}" target="_blank">{{ id }}</a>
    <a href="https://openhistoricalmap.org/edit?{{ type }}={{ id }}" target="_blank">✏️</a>
  </h2>
  <h3>Tags</h3>
  {%- for tag in tags %}
    {%- if tag[0] contains "website" %}
      <code>{{ tag[0] }} = <a href="{{ tag[1] }}" target="_blank">{{ tag[1] }}</a></code>
    {%- elsif tag[0] contains "wikidata" %}
      <code>{{ tag[0] }} = <a href="https://wikidata.org/wiki/{{ tag[1] }}" target="_blank">{{ tag[1] }}</a></code>
    {%- elsif tag[0] contains "wikipedia" %}
      {% assign lang = tag[1] | split: ":" | first %}
      <code>{{ tag[0] }} = <a href="https://{{ lang }}.wikipedia.org/wiki/{{ tag[1] | replace_first: lang, "" | replace_first: ":", "" }}" target="_blank">{{ tag[1] }}</a></code>
    {%- else %}
      <code>{{ tag[0] }} = {{ tag[1] }}</code>
    {%- endif %}
    <br>
  {%- endfor %}
  {%- if meta %}
    <h3>Meta</h3>
    {%- for tag in meta %}
      {%- if tag[0] == "changeset" %}
        <code>{{ tag[0] }} = <a href="https://openhistoricalmap.org/changeset/{{ tag[1] }}" target="_blank">{{ tag[1] }}</a></code>
      {%- elsif tag[0] == "user" %}
        <code>{{ tag[0] }} = <a href="https://openhistoricalmap.org/user/{{ tag[1] }}" target="_blank">{{ tag[1] }}</a></code>
      {%- else %}
        <code>{{ tag[0] }} = {{ tag[1] }}</code>
      {%- endif %}
        <br>
    {%- endfor %}
  {%- endif %}
  {%- if coordinates %}
    <h3>Coordinates</h3>
    <a href="geo://{{coordinates[1]}},{{coordinates[0]}}">{{coordinates[1] | round: 6 }} / {{coordinates[0] | round: 6 }}</a> <small>(lat/lon)</small>
  {%- endif %}
`;


const help = `
# Introduction

This is an [OpenHistoricalMap](https://openhistoricalmap.org)-specific deployment of
[Ultra](https://gitlab.com/trailstash/ultra) a web-application made to simplify making maps with
[MapLibre GL JS](https://maplibre.org). It can load [OpenStreetMap](https://openstreetmap.org) data
from the [Overpass API](https://overpass-api.de/).

## Documentation

The documentation for Ultra is available at <a target="_blank" href="https://overpass-ultra.us/docs/">overpass-ultra.us/docs</a>

## Overpass Queries

The Overpass API allows you to query for OSM data by your own search criteria. For this purpose, it
has a specifically crafted query language: [Overpass
QL](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL)

In addition to regular Overpass API queries one can use \`{{bbox}}\` to specify the bounding box
coordinates of the current map view.

## Configuration

Various aspects of Ultra, such as styling and the Overpass API server to use, can be
configured via [YAML front-matter](https://overpass-ultra.us/docs/yaml).

## Styling

Ultra supports styling using an
[extended](https://overpass-ultra.us/docs/style#ultra-maplibre-styles) version of the the [MapLibre
Style Spec](https://maplibre.org/maplibre-style-spec/).


See the [Styling](https://overpass-ultra.us/docs/style) section for more information.

## About

Ultra is built by Daniel Schep.

You can contact me on [Mastodon](https://mapstodon.space/@trailstash).

## Feedback, Bug Reports, Feature Requests

While Ultra has been in development for a while, it should still be considered experimental.

If you would like to report a bug or provide other feedback, please do so in the project's
[Issue Tracker](https://gitlab.com/trailstash/ultra/-/issues).

## Source Code</h4>

The [source code](https://gitlab.com/trailstash/ultra) of this application is released under the
[MIT license](https://gitlab.com/trailstash/overpass-ultra/-/blob/master/LICENSE).
`;

const settings = {
  type: "overpass",
  popupTemplate,
  mapStyle,
  server,
}

export const defaultMode = "ide";
export const modes = {
  ide: {
    query,
    help,
    title: "OHM Ultra",
    icon: "/logo.png",
    settings: {
      ...settings,
      title: "OHM Ultra",
      url: "https://ohm.overpass-ultra.us",
      mastodon: "https://mapstodon.space/@trailstash",
      options: {
        zoom: 13,
        center: [-73.9803, 40.7412],
        attributionControl: {
          customAttribution: "",
        },
        maxBounds: [
          [-179.999999999, -85.051129],
          [179.999999999, 85.051129],
        ],
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
          customAttribution: `<a href=".">Overpass Ultra</a>
            (<a href="javascript:new URLSearchParams(window.location.hash.slice(1));params.delete("map");window.location=new URL("#"+params.toString(),window.location).toString();">View Query</a>)`,
        },
      },
    },
  },
};
