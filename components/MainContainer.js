import Link from "next/link";

export default function MainContainer({ children }) {
  return (
    <>
      <div>
        <Link href={"/"} legacyBehavior>
          <a className="mainLink">Главная</a>
        </Link>
        <Link href={"/users"} legacyBehavior>
          <a className="userLink">Пользователи</a>
        </Link>
        <style jsx>{`
          .mainLink {
            color: red;
            text-decoration: none;
          }
          .userLink {
            color: blue;
            text-decoration: underline;
          }
        `}</style>
      </div>
      <div>{children}</div>
    </>
  );
}
