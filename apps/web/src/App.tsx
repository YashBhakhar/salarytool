import { Toaster } from "react-hot-toast";
import { QueryProvider } from "./providers/query-provider";

import AppRoutes from "./routes";

function App() {
  return (
    <QueryProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </QueryProvider>
  );
}

export default App;
