import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Home.scss";
import { useFetchData } from "../../hooks/useFetchData";

const Home = () => {
  const { users, subscriptions } = useFetchData();

  // reduce subscriptions array to a new array of objects with package name and count
  const packageChartData = subscriptions.reduce(
    // initial value is an empty array
    (acc: { name: string; value: number }[], { package: name }) => {
      // find existing package in the new array
      const existing = acc.find((item) => item.name === name);
      // if it exists, increment its value by 1
      if (existing) {
        existing.value += 1;
      } else {
        // if it doesn't exist, add a new package to the array with count of 1
        acc.push({ name, value: 1 });
      }
      // return the new array
      return acc;
    },
    // initial value
    []
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="home">
      <div className="home__stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <div className="stat-value">{users.length}</div>
        </div>
        <div className="stat-card">
          <h3>Active Subscriptions</h3>
          <div className="stat-value">{subscriptions.length}</div>
        </div>
        <div className="stat-card">
          <h3>Average Subscription Length</h3>
          <div className="stat-value">6 months</div>
        </div>
      </div>

      <div className="home__charts">
        <div className="chart-card">
          <h3>Subscriptions by Package</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={packageChartData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {packageChartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="chart-card">
          <h3>User Growth</h3>
          <BarChart
            width={400}
            height={300}
            data={[
              { month: "Jan", users: 65 },
              { month: "Feb", users: 85 },
              { month: "Mar", users: 95 },
              { month: "Apr", users: 120 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Home;
