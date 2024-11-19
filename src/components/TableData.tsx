import { CombinedUserData } from "../types/dashboard";
import "./Table.scss";

interface Props {
  processedData: CombinedUserData[];
  setSelectedUser: React.Dispatch<
    React.SetStateAction<CombinedUserData | null>
  >;
}

export default function TableData({ processedData, setSelectedUser }: Props) {
  return (
    <table className="subscribers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Package</th>
          <th>Status</th>
          <th>Country</th>
          <th>Join Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {processedData.map((user) => (
          <tr key={user.id}>
            <td>
              {user.first_name} {user.last_name}
            </td>
            <td>{user.email}</td>
            <td>{user.subscription?.package || "No package"}</td>
            <td>
              <span
                className={`status-badge ${
                  user.active === "1" ? "active" : "inactive"
                }`}
              >
                {user.active === "1" ? "Active" : "Inactive"}
              </span>
            </td>
            <td>{user.country}</td>
            <td>
              {new Date(parseInt(user.join_date) * 1000).toLocaleDateString()}
            </td>
            <td>
              <button
                className="btn-view"
                onClick={() => setSelectedUser(user)}
              >
                View Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
