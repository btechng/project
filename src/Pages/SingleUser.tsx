import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";

export default function SingleUser() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserById(id!);
      setUser(res.data);
    };
    fetch();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
