import Link from "next/link";
import { useRouter } from "next/router";

export const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:s-1/5 sm:min-h-screen p-5">
      <div>
        <Link href={"/"}>
          <a className="text-white text-2xl font-black">CRM Clientes</a>
        </Link>
      </div>

      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === "/clientes" ? "bg-blue-800 p-3" : "p-3"
          }
        >
          <Link href={"/clientes"}>
            <a className="text-white mb-2 block">Clientes</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-blue-800 p-3" : "p-3"}
        >
          <Link href={"/pedidos"}>
            <a className="text-white mb-2 block">Pedidos</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/productos" ? "bg-blue-800 p-3" : "p-3"
          }
        >
          <Link href={"/productos"}>
            <a className="text-white mb-2 block">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};
