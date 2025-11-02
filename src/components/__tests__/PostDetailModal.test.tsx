import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PostDetailModal } from "../PostDetailModal";
import { useHistory } from "react-router-dom";

// Mock useHistory
const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush }),
}));

describe("PostDetailModal", () => {
  const post = {
    id: "1",
    title: "Test Post",
    body: "This is a test post body.",
  };

  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the post title and body when post is provided", () => {
    render(<PostDetailModal post={post} onClose={onClose} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.body)).toBeInTheDocument();
  });

  it("calls onClose when background overlay is clicked", () => {
    render(<PostDetailModal post={post} onClose={onClose} />);

    const overlay = screen.getByText(post.title).parentElement?.parentElement!;
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onClose when modal content is clicked", () => {
    render(<PostDetailModal post={post} onClose={onClose} />);

    const modalContent = screen.getByText(post.title).parentElement!;
    fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("navigates to full post when 'View Full' button is clicked", () => {
    render(<PostDetailModal post={post} onClose={onClose} />);

    const viewFullButton = screen.getByText("View Full");
    fireEvent.click(viewFullButton);

    expect(mockPush).toHaveBeenCalledWith(`/dashboard/${post.id}`);
  });

  it("does not render anything when post is null", () => {
    render(<PostDetailModal post={null} onClose={onClose} />);

    expect(screen.queryByText("Close")).not.toBeInTheDocument();
    expect(screen.queryByText("View Full")).not.toBeInTheDocument();
  });
});
