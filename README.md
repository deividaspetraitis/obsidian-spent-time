# Update spent time

Based on [Super Simple Time Tracker](https://github.com/Ellpeck/ObsidianSimpleTimeTracker) this plugin automatically updates the spent time field in the [frontmatter](https://help.obsidian.md/glossary#Frontmatter) of your notes.

For example:

   ```yaml
   ---
   title: My Task
   spent: 0h
   ---
   ```


Spent value is the total tracked time for the note.

# Usage

1. Install the plugin in Obsidian.
2. Add a `spent` field in the frontmatter of your note 
3. Start and stop the timer using the [Super Simple Time Tracker](https://github.com/Ellpeck/ObsidianSimpleTimeTracker) plugin, after each stop the `spent` field will be updated automatically.
