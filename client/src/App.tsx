import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import CategoriesPage from "@/pages/categories";
import CameraPage from "@/pages/camera";
import SelectPricePage from "@/pages/select-price";
import AssignProductPage from "@/pages/assign-product";
import ManualPricePage from "@/pages/manual-price";
import ReviewPage from "@/pages/review";

function Router() {
  return (
    <Switch>
      <Route path="/" component={CategoriesPage} />
      <Route path="/camera" component={CameraPage} />
      <Route path="/select-price" component={SelectPricePage} />
      <Route path="/assign-product" component={AssignProductPage} />
      <Route path="/manual-price" component={ManualPricePage} />
      <Route path="/review" component={ReviewPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
