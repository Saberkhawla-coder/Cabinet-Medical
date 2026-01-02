import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createTestStore } from "../../../../test/testStore";
import AddPatientModel from "./AddPatientModel";
import "@testing-library/jest-dom";

test("AddPatientModel s'affiche quand open=true", () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <AddPatientModel open={true} onClose={() => {}} />
    </Provider>
  );

  expect(screen.getByText("Add Patient")).toBeInTheDocument();
  expect(screen.getByText("Save")).toBeInTheDocument();
});
