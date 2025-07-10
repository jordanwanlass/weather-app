import { createRoot } from "react-dom/client";
import Page from "./page";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const queryClient = new QueryClient();
const root = createRoot(document.body);
root.render(
  <QueryClientProvider client={queryClient}>
    <Page />
  </QueryClientProvider>
);
