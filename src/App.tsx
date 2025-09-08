import { useRoutes } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";
import routes from "./router/routes";

export default function App() {
  const router = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {router}
    </>
  );
}
