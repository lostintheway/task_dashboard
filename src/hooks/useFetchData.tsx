import { useState, useEffect } from "react";
import { User, Subscription } from "../types/dashboard";
import usersData from "../json/users.json";
import subscriptionsData from "../json/subscriptions.json";

export const useFetchData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUsers(usersData);
        setSubscriptions(subscriptionsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    users,
    subscriptions,
  };
};
