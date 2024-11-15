import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const sampleSubscribers = [
    {
      id: 1,
      user_id: "4398",
      package: "Plan 1",
      expires_on: "2022-06-22 17:32:01",
    },
    {
      id: 2,
      user_id: "4632",
      package: "Plan 2",
      expires_on: "2021-04-24 13:31:33",
    },
  ];

  const sampleUsers = [
    {
      id: 4564,
      first_name: "Kristen",
      middle_name: "O",
      last_name: "Blake",
      username: "ysxnv2232e",
      email: "pellentesque.eget@litoratorquentper.org",
      password: "CYW33IFV6GN",
      active: "0",
      address: "7561 Sed, St.",
      country: "Finland",
      join_date: "1531857487",
    },
    {
      id: 4565,
      first_name: "Keaton",
      middle_name: "Y",
      last_name: "Martin",
      username: "hieay6989o",
      email: "eros.nec@adipiscingfringilla.com",
      password: "NWU41VSO7MO",
      active: "0",
      address: "Ap #213-4052 Dictum Rd.",
      country: "Rwanda",
      join_date: "1404194772",
    },
  ];

  return (
    <div className="dashboard-main">
      <h1>Subscribers</h1>
    </div>
  );
};

export default Dashboard;
