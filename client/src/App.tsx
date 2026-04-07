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
