import Head from "next/head";
import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="bg-gray-200 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="sm:w-2/3 xl:s-4/5 sm:min-h-screen p-5">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
