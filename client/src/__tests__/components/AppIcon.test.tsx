import { render } from "@testing-library/react";
import AppIcon from "@/components/AppIcon";

test("should rendre appIcon", () => {
  // Render the AppIcon component
  const { getByText } = render(<AppIcon />);

  // Assert that the text content "Chatify" is present in the component
  const appIconElement = getByText(/Chatify/i);
  expect(appIconElement).toBeInTheDocument();
});
