import { render, screen, waitFor } from "@testing-library/react";
import UserPage from "./UserPage";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../features/store";

const server = setupServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe("User Page", () => {
  beforeEach(() => {
    server.use(
      rest.get("/api/1.0/users/:id", (req, res, ctx) => {
        if (req.params.id === "1") {
          return res(
            ctx.json({
              id: 1,
              username: "user1",
              email: "user1@email.com",
              image: null,
            })
          );
        } else {
          return res(ctx.status(400), ctx.json({ message: "User not found" }));
        }
      })
    );
  });

  const setup = (id: string) => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/user/${id}`]}>
          <Routes>
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it("displays user name on page when user is found", async () => {
    setup("1");
    await waitFor(() => {
      expect(screen.getByText("user1")).toBeInTheDocument();
    });
  });

  it("displays spinner while API call is in progress", async () => {
    setup("1");
    const spinner = screen.getByRole("status");
    await screen.findByText("user1");
    expect(spinner).not.toBeInTheDocument();
  });

  it("handles wrong user", async () => {
    setup("100");
    await waitFor(() => {
      expect(screen.getByText("User not found")).toBeInTheDocument();
    });
  });
});
