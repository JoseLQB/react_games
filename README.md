# 🎮 Game Data Viewer 

Version: 0.0.9

A React application that lets you visualize video game data loaded from a `.txt` file. The app fetches game covers automatically from the RAWG API and provides filters by year and platform.

---
## 🚀 Features

- 📂 Upload `.txt` file with a list of games.
- 📅 Dynamic filtering by release year.
- 🎮 Platform filter with game count per platform.
- 🖼️ Automatic image loading from [RAWG.io](https://rawg.io/apidocs).
- 🖱️ Clickable images that expand to full size in the center of the screen.
- 💡 Clean and responsive interface.

---

## 📄 Expected `.txt` File Format

Here’s an example of how the input file should be structured:

2020

-   The Last of Us Part II (PS4) - 9.5
-   Hades (PC) - 9.0
    

2021

-   Returnal (PS5) - 8.8
-   Forza Horizon 5 (Xbox Series X) - 9.2

---
- Each year should be on its own line.
- Games must start with a dash (`-`), followed by the title, platform in parentheses, and the score.

---

## 🧰 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [RAWG Video Games Database API](https://rawg.io/apidocs)

---

## 🛠️ Local Installation & Development

### 1. Clone the repository


git clone https://github.com/your-username/game-data-viewer.git
cd game-data-viewer


### 2. Install dependencies


`npm install`

### 3. Run the development server


`npm run dev` 

Open your browser at `http://localhost:5173`

## 🧱 Build for Production

`npm run build` 

This will generate a static site in the `dist/` folder. You can serve it with any static server:



`npx serve dist # or with python python -m http.server 8080 --directory dist` 

----------

## 🌐 Deployment Options

You can easily deploy this app on platforms like:

-   [Vercel](https://vercel.com/)
    
-   [Netlify](https://netlify.com/)
    
-   [GitHub Pages](https://pages.github.com/)
    

----------

## 🔑 RAWG API Key

This app uses the public RAWG API. You'll need your own (free) key:

1.  Sign up at RAWG.io
    
2.  Get your API key
    
3.  Replace it in the `App.js` file:
    

`const  API_KEY = "YOUR_API_KEY";` 

> 💡 Recommended: Use a `.env` file like `VITE_RAWG_API_KEY=your_key` and access it with `import.meta.env.VITE_RAWG_API_KEY`

----------


## 🤝 Contributing

Contributions are welcome! You can:

-   Report bugs
    
-   Suggest features
    
-   Open a pull request
    

----------

## 📝 License

MIT License — View license

----------

## 🧠 Author

Built with ❤️ by [JoseLQB (Jose L Quintanilla Blanco)](https://github.com/JoseLQB)
