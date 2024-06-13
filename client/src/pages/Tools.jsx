import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Tools = () => {
    
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <h1>Loading ...</h1>;
      }
    
      if (!user) {
        return <Navigate to="/login" />;
      };
    const scrollToBottom = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      };
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>Explore Our Tools</h1>
              <p>
                Discover a suite of tools designed to make your life easier. Whether you need to edit text, convert units, manage recipes, or track your budget, we have the right tool for you.
              </p>
            </div>
          </div>
        </section>

        {/* Tools List Section */}
        <section id="tool-list" className="section-tools">
          <div className="container grid grid-two-cols">
            <div className="tool">
              <img src="/images/text-editor.png" alt="Text Editor" width="100" height="100" />
              <h2>Text Editor</h2>
              <p>Edit and format your text with ease using our powerful text editor.</p>
              <NavLink to="/tools/text-editor">
                <button className="btn" onClick={scrollToBottom}>Use Text Editor</button>
              </NavLink>
            </div>
            <div className="tool">
              <img src="/images/unit-converter.png" alt="Unit Converter" width="100" height="100" />
              <h2>Unit Converter</h2>
              <p>Convert units quickly and accurately with our unit converter.</p>
              <NavLink to="/tools/unit-converter">
                <button className="btn" onClick={scrollToBottom}>Use Unit Converter</button>
              </NavLink>
            </div>
          </div>
          <div className="container grid grid-two-cols">
            <div className="tool">
              <img src="/images/recipe-manager.png" alt="Recipe Manager" width="100" height="100" />
              <h2>Recipe Manager</h2>
              <p>Organize your favorite recipes and discover new ones.</p>
              <NavLink to="/tools/recipe-manager">
                <button className="btn" onClick={scrollToBottom}>Use Recipe Manager</button>
              </NavLink>
            </div>
            <div className="tool">
              <img src="/images/budget-tracker.png" alt="Budget Tracker" width="100" height="100" />
              <h2>Budget Tracker</h2>
              <p>Keep track of your finances with our easy-to-use budget tracker.</p>
              <NavLink to="/tools/budget-tracker">
                <button className="btn" onClick={scrollToBottom}>Use Budget Tracker</button>
              </NavLink>
            </div>
          </div>
        </section>

        <Outlet />
      </main>
    </>
  );
}
