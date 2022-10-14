import { render, screen } from "@testing-library/react";
import AccountActivationPage from "./AccountActivationPage";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter, Route, Routes } from "react-router-dom";

let counter = 0;
const server = setupServer(
  rest.post("/api/1.0/users/token/:token", async (req, res, ctx) => {
    counter += 1;
    if (req.params.token === "5768") {
      return res(ctx.status(400));
    }
    return res(ctx.status(200));
  })
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe("Account Activation Page", () => {
  const setup = (token: string) => {
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("display activation success message when token is valid", async () => {
    setup("1234");
    const message = await screen.findByText("Account is activated");
    expect(message).toBeInTheDocument();
  });

  it("sends activation to the backend", async () => {
    setup("1234");
    await screen.findByText("Account is activated");
    expect(counter).toBe(1);
  });

  it("displays activation failure message when token is invalid", async () => {
    setup("5768");
    const message = await screen.findByText("Activation failure");
    expect(message).toBeInTheDocument();
  });

  it("sends activation request after the token has been changed", async () => {
    let token = 1234;
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText("Account is activated");
    token = 5768;
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText("Activation failure");
    expect(counter).toBe(2);
  });

  it("displays spinner during activation API call", async () => {
    setup("5768");
    const spinner = screen.getByRole("status");
    await screen.findByText("Activation failure");
    expect(spinner).not.toBeInTheDocument();
  });

  it("displays spinner after second api call to the changed token", async () => {
    let token = 1234;
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText("Account is activated");
    token = 5768;
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
    const spinner = screen.getByRole("status");
    await screen.findByText("Activation failure");
    expect(spinner).not.toBeInTheDocument();
  });
});
