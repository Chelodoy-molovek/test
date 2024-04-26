import Link from "next/link";
import MainContainer from "../components/MainContainer";

export default function Users({ users }) {
  return (
    <MainContainer>
      <h1>Список пользователей</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </MainContainer>
  );
}

export async function getStaticProps(context) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return {
    props: { users },
  };
}
