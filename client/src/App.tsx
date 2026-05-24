import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThemeAgentPage from "./pages/ThemeAgentPage";
import Showcase from "./pages/Showcase";
import ShowcaseIndex from "./pages/templates/ShowcaseIndex";
import LandingTemplate from "./pages/templates/LandingTemplate";
import DashboardTemplate from "./pages/templates/DashboardTemplate";
import PricingTemplate from "./pages/templates/PricingTemplate";
import AuthTemplate from "./pages/templates/AuthTemplate";
import EmptyStatesTemplate from "./pages/templates/EmptyStatesTemplate";
import SettingsTemplate from "./pages/templates/SettingsTemplate";
import OnboardingTemplate from "./pages/templates/OnboardingTemplate";
import NotificationTemplate from "./pages/templates/NotificationTemplate";
import DataTableTemplate from "./pages/templates/DataTableTemplate";
import TerminalTemplate from "./pages/templates/TerminalTemplate";
import BitpandaTemplate from "./pages/templates/BitpandaTemplate";
import BitpandaLive from "./pages/BitpandaLive";
import BitpandaSandbox from "./pages/BitpandaSandbox";
import Polymarket from "./pages/Polymarket";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/theme-agent"} component={ThemeAgentPage} />
      <Route path={"/showcase"} component={ShowcaseIndex} />
      <Route path={"/showcase/landing"} component={LandingTemplate} />
      <Route path={"/showcase/dashboard"} component={DashboardTemplate} />
      <Route path={"/showcase/pricing"} component={PricingTemplate} />
      <Route path={"/showcase/auth"} component={AuthTemplate} />
      <Route path={"/showcase/empty-states"} component={EmptyStatesTemplate} />
      <Route path={"/showcase/settings"} component={SettingsTemplate} />
      <Route path={"/showcase/onboarding"} component={OnboardingTemplate} />
      <Route path={"/showcase/notifications"} component={NotificationTemplate} />
      <Route path={"/showcase/data-table"} component={DataTableTemplate} />
      <Route path={"/showcase/terminal"} component={TerminalTemplate} />
      <Route path={"/showcase/bitpanda"} component={BitpandaTemplate} />
      <Route path={"/bitpanda"} component={BitpandaLive} />
      <Route path={"/sandbox"} component={BitpandaSandbox} />
      <Route path={"/polymarket"} component={Polymarket} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
