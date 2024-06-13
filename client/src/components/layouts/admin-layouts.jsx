import { NavLink, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../store/auth"

export const AdminLayouts = () => {
    const { user, isLoading } = useAuth();
    // console.log("admin layout ", user);
  
    if (isLoading) {
      return <h1>Loading ...</h1>;
    }
  
    if (!user.isAdmin) {
      return <Navigate to="/" />;
    }
    return (
        <>
            <header>


                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users"> users </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts"> contacts </NavLink>
                            </li>
                            
                        </ul>
                    </nav>
                </div>

            </header>
            <Outlet />
        </>)
}