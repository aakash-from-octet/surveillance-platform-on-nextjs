import "./styles/globals.css";
import Header from "./components/Header";

// export const metadata = {
//   title: "InferQ",
//   description: "InferQ",
// };

export default function RootLayout({
  children,
  includeHeader = false,
}: {
  children: React.ReactNode;
  includeHeader?: boolean;
}) {
  return (
    <html lang="en">
      <body>
      {includeHeader && (
         <Header />
      )}
        {children}
      </body>
    </html>
  );
}
