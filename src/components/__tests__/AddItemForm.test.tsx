// AddItemForm.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddItemForm } from "../AddItemForm";
import { usePostsStore } from "../../store/PostStore";

// Mock the store
jest.mock("../../store/PostStore", () => ({
  usePostsStore: jest.fn(),
}));

describe("AddItemForm", () => {
  const addLocalPostMock = jest.fn();

  beforeEach(() => {
    (usePostsStore as unknown as jest.Mock).mockReturnValue({
      addLocalPost: addLocalPostMock,
    });
    addLocalPostMock.mockClear();
  });

  it("renders the form correctly", () => {
    render(<AddItemForm />);
    expect(screen.getByText("Add New Post")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter post title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter post body")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add post/i })
    ).toBeInTheDocument();
  });

  it("submits the form and calls addLocalPost and onSuccess", () => {
    const onSuccessMock = jest.fn();
    render(<AddItemForm onSuccess={onSuccessMock} />);

    const titleInput = screen.getByPlaceholderText(
      "Enter post title"
    ) as HTMLInputElement;
    const bodyInput = screen.getByPlaceholderText(
      "Enter post body"
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /add post/i });

    // Fill in the form
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check that addLocalPost was called with correct values
    expect(addLocalPostMock).toHaveBeenCalledWith({
      title: "Test Title",
      body: "Test Body",
    });

    // Check that the inputs are cleared
    expect(titleInput.value).toBe("");
    expect(bodyInput.value).toBe("");

    // Check that onSuccess was called
    expect(onSuccessMock).toHaveBeenCalled();
  });

  it("does not call addLocalPost if title or body is empty", () => {
    render(<AddItemForm />);
    const submitButton = screen.getByRole("button", { name: /add post/i });
    fireEvent.click(submitButton);
    expect(addLocalPostMock).not.toHaveBeenCalled();
  });
});
