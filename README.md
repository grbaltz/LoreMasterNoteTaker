# Loremaster Notetaker - LMNT
Garrett Baltz 2024

### Description

Loremaster Notetaker (LMNT) is a wiki-building application designed with Dungeon Masters and Game Masters across all types of RPG-style games
with the focus being akin to traditional notation software such as Notion or Obsidian. Where LMNT stands out is its purposeful design 
for lore wikis through features such as maps, content visibility customization, loot-table templates, dice rolling functions, and more...

I am designing this application as I have been building my own Dungeons and Dragons world for multiple years now, always keeping track
of storylines, session summaries, characters (player/dm), myths, events, etc. While I have a great love for Notion as it has been an
incredible software, in seeing what fellow sites such as LegendKeeper have done, I wanted to design an application myself to further
what they have all implemented while meeting my personal desires at the same time. 

## Main Goals

- Fully customizable sharing capabilities
    - Free visibility for anyone, limiting editing potentially behind a subscription 
- Content visibility customizability
    - By default, any content on pages is viewable by everyone it is shared with
    - Based on share level, same-page content can be viewed by specific groups/players allowing for DM secrets to be shown to some players
        but not others
- Maps
    - Drawing inspiration from LegendKeeper, maps will be supported as a means of placing location-based links to towns/regions/planes
    - One can place locations on any imported image (map) that will link to the place's pages, each page containing a zoomed-in portion 
        of the location on the map
    - Map pages will allow descriptions, backlinking, and more features to seamlessly bring maps into lorekeeping
- Dice functions
    - Functions in formats akin to Google Sheets such as "[2D6+3d4 + 18 times 3]" will be turned into buttons with rerollability, allowing
        for stats or abilities to be rolled during sessions or copied to new locations without being a fixed result
    - High level parsing of functions will result in easy usage
- Loot-tables
    - To avoid tiresome methods of rolling loot-tables, loot-tables will be built into LMNT meaning one simply needs 
        to type "/loot (table name) (amount of loot) (rarities) (replacement y/n)" to immediately roll loot for a player, shop, encounter,
        etc. without any extra work
    - Templates provided, custom tables also possible
    - Simple to create: choose a name, supply a list of items with things such as descriptions (could be links), rarities, values, etc., 
        and it will be referenceable from wherever needed
    
### Project Notes/Progress

npm installed:
nodemon
mongoose
mongodb
express
dotenv
axios

npm init -y ### creates all the stuff

npx create-react-app frontend ### creates the frontend side

Removed from package.json:

"start": "set PORT=3006 && react-scripts start",

Added to package.json:

"proxy": "http://localhost:3006",

Color Palette: in index.css
Font family: Manrope