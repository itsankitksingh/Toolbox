import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:7001/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if data is an array
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error("Unexpected data format:", data);
                setUsers([]);
            }

            // console.log(`users: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]); // Reset users state on error
        }
    };

    // Delete the user on delete button
    const deleteUser =async (id) => {
        // Apply vanish effect
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === id ? { ...user, vanish: true } : user
            )
        );

        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:7001/api/admin/users/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // console.log(`users after delete: ${JSON.stringify(data)}`);

                // Refetch the users after deletion
                getAllUsersData();
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        }, 500); // Match the timeout duration with CSS transition
    };

    useEffect(() => {
        getAllUsersData();
    }, []);

    return (
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => (
                            <tr key={index} className={curUser.vanish ? "vanish" : ""}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone}</td>
                                <td><Link to={`/admin/users/${curUser._id}/edit`}>Update</Link></td>
                                <td>
                                    <button onClick={() => deleteUser(curUser._id)}>Delete User</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
