import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayouts } from "./components/layouts/admin-layouts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { Tools } from "./pages/Tools";
import { TextEditor } from "./pages/All_Tools/Text-Editor";
import UnitConverter from "./pages/All_Tools/Unit-Converter";
import RecipeManager from "./pages/All_Tools/Recipe-Manager";
import BudgetTracker from "./pages/All_Tools/Budget-Tracker";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tools" element={<Tools />} >
          <Route path="text-editor" element={<TextEditor />} />
          <Route path="unit-converter" element={<UnitConverter />} />
          <Route path="recipe-manager" element={<RecipeManager />} />
          <Route path="budget-tracker" element={<BudgetTracker />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayouts />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;