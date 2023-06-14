import { HomePage } from "../screen/HomePage";
import { CategoryPage } from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";
import { TransactionPage } from "../screen/TransactionPage";
import { ProfilePage } from "../screen/ProfilePage";
import { ProfileProvider } from "../context/ProfileContext";
import { ModePage, PageModeProvider } from "../context/PageModeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

export function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "category/",
      element: <CategoryPage />,
    },
    {
      path: "/product",
      element: <ProductPage />,
    },
    {
      path: "/transaction",
      element: <TransactionPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
  ]);
  return (
    <ChakraProvider>
      <PageModeProvider>
        <ModePage>
          <ProfileProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </ProfileProvider>
        </ModePage>
      </PageModeProvider>
    </ChakraProvider>
  );
}
