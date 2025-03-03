import "./globals.css";
import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "Performance Evaluations",
  description: "Web site created using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.23/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <UserProvider>{children}</UserProvider>
        {/* <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
          </aside>
        </footer> */}
      </body>
    </html>
  );
}
