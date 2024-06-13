import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth();
  const AboutName = user.username ? user.username : "User";

  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Hi {AboutName},</p>
              <h1>Why Choose Our Tools?</h1>
              <p>
                <strong>Comprehensive Solutions:</strong> Whether you need to edit text, convert units, manage recipes, or track your budget, we have all the tools you need in one place.
              </p>
              <p>
                <strong>User-Friendly:</strong> Our tools are designed with you in mind, offering an intuitive and seamless user experience.
              </p>
              <p>
                <strong>Efficiency:</strong> Save time and effort with our powerful and efficient tools, designed to make your tasks easier and faster.
              </p>
              <p>
                <strong>Customization:</strong> Tailor our tools to fit your unique needs and preferences, ensuring a personalized experience.
              </p>
              <p>
                <strong>Support:</strong> We are here to help you with any questions or issues you might have, providing reliable support whenever you need it.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">Connect Now</button>
                </NavLink>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="Tools illustration"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
