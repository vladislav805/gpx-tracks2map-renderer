const showHelp = () => {
    console.log(`
Usage: gpx-tracks2map-renderer [ACTION] [OPTIONS...]
Tool for render geo-tracks from gpx files to map

Actions:
help
    Show this help

version
    Show version
    
render
    Find files, render tracks to map. Pass arguments:
    
    --input (optional, default value: .)
        Path to directory with GPX files
        
    --output (optional, default value: result.png)
        Path to file of map with tracks
        
    --disable-cache (optional, not present by default)
        Disable using cache files (*.gpx.json)
                                 
    --disable-caching (optional, not present by default)
        Disable writing cache files (*.gpx.json)
        
    --line-color (optional, default value: #ff0000)
        Color of track lines
        
    --line-width (optional, default value: 5)
        Width of track lines
        
    --map-image (optional, default value: map.png)
        Image with render of dry map.
        
purge-cache
    Remove all cache files. Or you can remove it manually:
        find data -name '*.gpx.json' -delete
`.trim());
};

module.exports = showHelp;
