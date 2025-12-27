import { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import LiquidChrome from "./components/LiquidChrome";
import "./styles/theme.css";
import "./styles/main.css";
import "./styles/App.css";

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="app-container" data-theme={theme}>
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <main className="content">
        <div className="content-box">
          <div className="liquid-background">
            <LiquidChrome
              baseColor={theme === 'dark' ? [0.08, 0.08, 0.08] : [0.95, 0.95, 0.95]}
              speed={0.3}
              amplitude={0.4}
              frequencyX={3}
              frequencyY={3}
              interactive={true}
              maxBrightness={theme === 'dark' ? 0.3 : 1.0}
            />
          </div>
          
          <div className="content-inner">
            <h1 className="heading">Sam Park</h1>

            <p className="paragraph">
              I'm currently studying Computer Science at the University of Waterloo. 
              When I'm not coding, I enjoy swimming, watching football, 
              exploring new places, and spending time with friends.
            </p>

            <div className="experience">
              <div className="experience-item">
                <span className="arrow">→</span>
                <span>Software Engineer at Shopify</span>
              </div>
              <div className="experience-item">
                <span className="arrow">→</span>
                <span>Senior Data Quality Specialist at Cohere</span>
              </div>
              <div className="experience-item">
                <span className="arrow">→</span>
                <span>Software Engineer at Zomp</span>
              </div>
            </div>

            <footer className="footer">
              <a href="https://github.com/saampaark" className="footer-link">
                github
              </a>
              <span className="separator">/</span>
              <a href="https://www.linkedin.com/in/sampark01/" className="footer-link">
                linkedin
              </a>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}