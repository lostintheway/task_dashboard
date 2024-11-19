import { useEffect, useState } from "react";
import TableData from "../../components/TableData";
import { CombinedUserData, FilterType } from "../../types/dashboard";

import "./Users.scss";
import { useFetchData } from "../../hooks/useFetchData";

const Users = () => {
  const { users, subscriptions } = useFetchData();
  const [filteredData, setFilteredData] = useState<CombinedUserData[]>([]);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [filterValue, setFilterValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<CombinedUserData | null>(
    null
  );

  // combine users and subscriptions
  const combinedData = (): CombinedUserData[] => {
    const newData = users.map((user) => ({
      ...user,
      subscription: subscriptions.find(
        (sub) => sub.user_id === user.id.toString()
      ),
    }));
    return newData;
  };

  // filter data based on filter type and rerender if filterType, users or subscriptions change
  useEffect(() => {
    const filterData = () => {
      let filtered = combinedData();
      if (filterType === "active") {
        filtered = filtered.filter((user) => user.active === "1");
      } else if (filterType === "inactive") {
        filtered = filtered.filter((user) => user.active === "0");
      }
      setFilteredData(filtered);
    };

    filterData();
  }, [filterType, users, subscriptions]);

  // filter data based on filter type and filter value
  const filterData = (
    data: CombinedUserData[],
    filterValue: string
  ): CombinedUserData[] => {
    let filtered = data;

    if (filterValue) {
      filtered = filtered.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`;
        return fullName.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    if (filterType === "active") {
      filtered = filtered.filter((user) => user.active === "1");
    } else if (filterType === "inactive") {
      filtered = filtered.filter((user) => user.active === "0");
    }

    return filtered;
  };

  return (
    <div className="users">
      <h2>Subscribers</h2>

      {selectedUser && (
        <div className="user-details">
          <button onClick={() => setSelectedUser(null)}>x</button>
          <h2>User Details</h2>
          <div className="user-details__content">
            <div className="personal-info">
              <h3>Personal Information</h3>
              <p>
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.middle_name} {selectedUser.last_name}
              </p>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>Country:</strong> {selectedUser.country}
              </p>
              <p>
                <strong>Join Date:</strong>{" "}
                {new Date(
                  parseInt(selectedUser.join_date) * 1000
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="subscription-info">
              <h3>Subscription Details</h3>
              {selectedUser.subscription ? (
                <>
                  <p>
                    <strong>Package:</strong>{" "}
                    {selectedUser.subscription.package}
                  </p>
                  <p>
                    <strong>Expires:</strong>{" "}
                    {new Date(
                      selectedUser.subscription.expires_on
                    ).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <p>No active subscription</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="users__subscribers">
        <div className="subscribers-header">
          <input
            id="search-input"
            type="text"
            placeholder="Search by name"
            onChange={(e) => setFilterValue(e.target.value)}
          />

          <div className="filter-controls">
            <button
              className={`btn-filter ${filterType === "all" ? "active" : ""}`}
              onClick={() => setFilterType("all")}
            >
              All
            </button>
            <button
              className={`btn-filter ${
                filterType === "active" ? "active" : ""
              }`}
              onClick={() => setFilterType("active")}
            >
              Active
            </button>
            <button
              className={`btn-filter ${
                filterType === "inactive" ? "active" : ""
              }`}
              onClick={() => setFilterType("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        {filteredData.length > 0 ? (
          <TableData
            processedData={filterData(filteredData, filterValue)}
            setSelectedUser={setSelectedUser}
          />
        ) : (
          <div>No data found.</div>
        )}
      </div>
    </div>
  );
};

export default Users;
