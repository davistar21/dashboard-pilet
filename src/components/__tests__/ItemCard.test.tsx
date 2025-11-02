import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ItemCard } from "../ItemCard";

describe("ItemCard", () => {
  const item = { id: 1, title: "Hello", body: "Body text" };

  it("renders title and snippet", () => {
    render(<ItemCard item={item} />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText(/Body text/)).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const cb = jest.fn();
    render(<ItemCard item={item} onClick={cb} />);
    fireEvent.click(screen.getByRole("button"));
    expect(cb).toHaveBeenCalledWith(item);
  });
});
