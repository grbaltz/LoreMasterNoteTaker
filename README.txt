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