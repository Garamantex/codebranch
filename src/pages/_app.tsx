import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@ui5/webcomponents-icons/dist/filter.js";
import "@ui5/webcomponents-icons/dist/sort-descending.js";
import "@ui5/webcomponents-icons/dist/sort-ascending.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import "@ui5/webcomponents-icons/dist/decline.js";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import { LeaveRequestsProvider } from "@/context/LeaveRequestsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LeaveRequestsProvider>
      <Component {...pageProps} />
    </LeaveRequestsProvider>
  );
}
