import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { APP_THEME } from "@/constants/theme.ts";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MantineProvider theme={APP_THEME}>
            <App />
        </MantineProvider>
    </StrictMode>,
);
