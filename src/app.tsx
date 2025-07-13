import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Page from "./page";
import DayDetail from "./components/day-detail";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/day/:dayKey" element={<DayDetail />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}
