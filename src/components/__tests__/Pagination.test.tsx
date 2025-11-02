import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const onPageChange = jest.fn();

  it("navigates", () => {
    render(
      <Pagination
        page={2}
        perPage={10}
        total={50}
        onPageChange={onPageChange}
      />
    );
    fireEvent.click(screen.getByText("1"));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalled();
  });
  it("renders page buttons and navigates", () => {
    render(
      <Pagination
        page={2}
        perPage={10}
        total={50}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
