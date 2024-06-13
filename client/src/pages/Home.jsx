import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
export const Home = () => {
  const { user } = useAuth();
  const UserIsAdmin = user.isAdmin? (<NavLink className="home-page-admin-color" to="/admin">
    You are an admin. You have access to admin panel. Click here
  </NavLink>): "";

  // console.log(user.isAdmin);
  const HomeName = user.username ? "Hi, " + user.username : "";
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">

            <div className="hero-content">
              <div>
                {UserIsAdmin}

              </div>
              <h1 className="Usernamecolor">{HomeName}</h1>
              <h1>Welcome to Your All-In-One Toolbox</h1>
              <p>
                Discover the ultimate set of tools to make your life easier. From text editing to budget tracking, we have everything you need in one place.
              </p>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/tool-box.png"
                alt="All tools in one place"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="tool">
              <img src="/images/text-editor.png" alt="Text Editor" width="100" height="100" />
              <h2>Text Editor</h2>
              <p>Edit and format your text with ease using our powerful text editor.</p>
              <a href="/tools/text-editor">
                <button className="btn">Use Text Editor</button>
              </a>
            </div>
            <div className="tool">
              <img src="/images/unit-converter.png" alt="Unit Converter" width="100" height="100" />
              <h2>Unit Converter</h2>
              <p>Convert units quickly and accurately with our unit converter.</p>
              <a href="/tools/unit-converter">
                <button className="btn">Use Unit Converter</button>
              </a>
            </div>
          </div>
          <div className="container grid grid-two-cols">
            <div className="tool">
              <img src="/images/recipe-manager.png" alt="Recipe Manager" width="100" height="100" />
              <h2>Recipe Manager</h2>
              <p>Organize your favorite recipes and discover new ones.</p>
              <a href="/tools/recipe-manager">
                <button className="btn">Use Recipe Manager</button>
              </a>
            </div>
            <div className="tool">
              <img src="/images/budget-tracker.png" alt="Budget Tracker" width="100" height="100" />
              <h2>Budget Tracker</h2>
              <p>Keep track of your finances with our easy-to-use budget tracker.</p>
              <a href="/tools/budget-tracker">
                <button className="btn">Use Budget Tracker</button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
