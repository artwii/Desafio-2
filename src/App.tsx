import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoadingContextProvider } from "./contexts/LoadingContext";
import { CurrentUserContextProvider } from "./contexts/CurrentUserContext";
import { Main } from "./components/Main";
import { UserPage } from "./components/UserPage";
import { CurrentRepoContextProvider } from "./contexts/CurrentRepoContext";
import { OpenModalContextProvider } from "./contexts/OpenModalContext";

function App() {
  return (
    <LoadingContextProvider>
      <CurrentUserContextProvider>
        <OpenModalContextProvider>
          <CurrentRepoContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/user" element={<UserPage />} />
              </Routes>
            </BrowserRouter>
          </CurrentRepoContextProvider>
        </OpenModalContextProvider>
      </CurrentUserContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
