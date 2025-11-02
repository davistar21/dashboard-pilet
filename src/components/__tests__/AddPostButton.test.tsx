import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddPostButton } from "../AddPostButton";

jest.mock("../AddItemForm", () => ({
  AddItemForm: ({ onSuccess }: any) => (
    <div>
      <button onClick={onSuccess}>Submit Form</button>
    </div>
  ),
}));

describe("AddPostButton", () => {
  it("renders the Add Post button", () => {
    render(<AddPostButton />);
    expect(
      screen.getByRole("button", { name: /add post/i })
    ).toBeInTheDocument();
  });

  it("opens the modal when clicking Add Post button", async () => {
    render(<AddPostButton />);
    fireEvent.click(screen.getByRole("button", { name: /add post/i }));

    const modalTitle = await screen.findByText("Add New Post");
    expect(modalTitle).toBeInTheDocument();
  });

  it("closes the modal when clicking the close button", async () => {
    render(<AddPostButton />);
    fireEvent.click(screen.getByRole("button", { name: /add post/i }));
    const closeButton = await screen.findByRole("button", {
      name: /close modal/i,
    });
    fireEvent.click(closeButton);
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.queryByText("Add New Post")).not.toBeInTheDocument();
    });
  });

  it("closes the modal after AddItemForm onSuccess", async () => {
    render(<AddPostButton />);
    fireEvent.click(screen.getByRole("button", { name: /add post/i }));
    jest.useFakeTimers();
    const submitFormButton = await screen.findByText("Submit Form");
    fireEvent.click(submitFormButton);
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(screen.queryByText("Add New Post")).not.toBeInTheDocument();
    });
  });
});
