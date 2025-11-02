import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostDetailModal from "../PostDetailModal";
import { BrowserRouter } from "react-router-dom";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("PostDetailModal", () => {
  it("renders and closes correctly", () => {
    const post = { id: 1, title: "Post", body: "Body" };
    const onClose = jest.fn();
    render(<PostDetailModal post={post} onClose={onClose} />, {
      wrapper: Wrapper,
    });
    expect(screen.getByText("Post")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });
});
