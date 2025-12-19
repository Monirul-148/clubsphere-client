import {useAuth} from "../../../hooks/useAuth";

const JoinClub = () => {
  const auth = useAuth();


  if (!auth) {
    return <p>Auth not ready</p>;
  }

  const { user, loading } = auth;

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login first</p>;

  return (
    <div>
      <h2>Join Club</h2>
      <p>User Email: {user.email}</p>
    </div>
  );
};

export default JoinClub;
