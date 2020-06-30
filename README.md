# GPX tracks to map renderer

## Installation
```bash
npm i
```
## Using
1. Place in root of repository map image with name `map.png` (or specify path in `-map-image` option).
2. Run
   ```bash
   npm run start
   ```
   or if you want to pass parameters (e.g. `-output` and `-line-color`)
   ```bash
   npm run start -- -output mymap -line-color blue
   ```
3. After successful complete result will be placed in root of repository with name `result.png` (or with name, specified in `-output` option).

## Caching
After first run, parsed GPX files will be cached to files with extension `.gpx.json`. This increased the speed at the next launches.
If you need to disable the cache entry, add the `--disable-caching` option. If you need to ignore read cached data one-time, add the `--disable-cache` option.
If you need to delete cached data, run `npm run purge-cache`.

## Options
| Option | Type | Default value | Description |
| ------ | ---- | ------------- | ----------- |
| `-output` | `string` | `result` | Name of resulting file (`%output%.png`) |
| `-disable-cache` | `boolean` | `false` | Disable reading gpx parse cache |
| `-disable-caching` | `boolean` | `false` | Disable writing gpx parse cache |
| `-line-color` | `string` | `#ff0000` | Color of line |
| `-line-width` | `number` | `5` | Width of line in px |
