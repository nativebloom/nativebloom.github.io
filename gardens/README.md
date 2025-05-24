## Garden Photo Gallery

How To Use:

The Gardens/ page will automatically fetch photos from nativebloominitiative.org/photos/sites/. First it will look for gallery.json, which will contain a description of the file structure (this is necessary since the client script cannot crawl over everything in the photos/sites/ folder, since it doesn't know what is in the folder).

By analyzing the contents of gallery.json, the script will know where to pull files from, and will automatically arrange them in rows based on what event they were listed under. All photos must be organied by event, and stored in separate folders for each event. The whole file structure must have this format:

```txt
-- photos/
	-- sites/
		-- gallery.json
		-- generate-json.js
		-- event1/
			-- NAME.txt
			-- photo1.jpg
			-- photo2.jpg
			-- photo3.jpg
		-- event2/
			-- NAME.txt
			-- photo1.png
			-- photo2.webp
			-- photo3.jpeg
		-- event3/
			-- photo1.png
			-- photo2.png
			-- photo3.png
```

The script will attempt to find a more human-readable name for each event by looking in the event's folder for a file called NAME.txt. The contents of this file, if found, will be used as the title for the photos contained within that folder. If no NAME.txt is found, the page will use the name of the folder instead, so name your folder something like "date_location".

Photos will appear on the page in the order they appear in their folder, i.e. alphabetically based on file name. If you want to rearrange photos, give them different names.

The file called generate-json.js is a script that is set to run by a Github Action each time the repository is updated. It will scan the file structure and automatically update gallery.json, so don't worry about doing it yourself.