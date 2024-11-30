import { render, screen } from "@testing-library/react"
import { AddPost } from './AddPost';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as reactRedux from "react-redux";
import userEvent from "@testing-library/user-event";



vi.mock('react-redux', () => {
  const dispatchMock = vi.fn((params) => {})
  const useDispatchMock = vi.fn(() => dispatchMock)
  
  return {
    ...vi.importActual("react-redux"),
    useDispatch: useDispatchMock,
    }
  }
);

const setup = () => {
  const spyUseDispatch = vi.spyOn(reactRedux, "useDispatch");
  return spyUseDispatch
}

const addFakeDataToInputs = () => {

}

describe('AddPost component tests', () => {
  
  beforeEach(() => {
    
  })

  it("Should inputs have initial state empty string", async () => {
    render(<AddPost />);

    const inputName = screen.getByLabelText("Nombre");
    const inputMessage = screen.getByLabelText("Mensaje");

    expect(inputName.getAttribute("value")).toBe("");
    expect(inputMessage.getAttribute("value")).toBe("");
  })

  it("Should update input name state", async () => {
    render(<AddPost />);

    const inputName = screen.getByLabelText("Nombre");
    const inputText = "nuevo nombre";

    await userEvent.type(inputName, inputText);

    expect(inputName.getAttribute("value")).toBe(inputText);
  })


  it("Should update input message state", async () => {
    render(<AddPost />);

    const inputMessage = screen.getByLabelText("Mensaje");
    const inputText = "nuevo mensaje";

    await userEvent.type(inputMessage, inputText);

    expect(inputMessage.getAttribute("value")).toBe(inputText);
  })


  it("Should disable submit button when fields are empty", async () => {
    render(<AddPost />);

    const btnSubmit = screen.getByRole('button');

    expect(btnSubmit).toBeDisabled();
  })

  it("Should enable submit button when fields are not empty", async () => {
    render(<AddPost />);

    const inputName = screen.getByLabelText("Nombre");
    const inputNameText = "n";
    const inputMessage = screen.getByLabelText("Mensaje");
    const inputMessageText = "Ñ";

    await userEvent.type(inputName, inputNameText);
    await userEvent.type(inputMessage, inputMessageText);

    const btnSubmit = screen.getByRole('button');

    expect(btnSubmit).toBeEnabled();
  });

  it('Should when form input is invalid, them submit form not dispatch action', async () => {
    render(<AddPost />);

    const button = screen.getByRole("button");

    const dispatchMock = vi.fn((params) => {})
    const useDispatchMock = vi.fn(() => dispatchMock)


    spyUseDispatch.mockImplementation(useDispatchMock);

    await userEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledTimes(0);
  });

  it('Dispach ADD_POST action with valid name and message payloads', async () => {

    render(<AddPost />);

    const button = screen.getByRole("button");
    const dispatchMock = vi.fn((params) => {})
    const useDispatchMock = vi.fn(() => dispatchMock)

    spyUseDispatch.mockImplementation(useDispatchMock);

    const inputName = screen.getByLabelText("Nombre");
    const inputNameText = "n";
    const inputMessage = screen.getByLabelText("Mensaje");
    const inputMessageText = "Ñ";


    await userEvent.type(inputName, inputNameText);
    await userEvent.type(inputMessage, inputMessageText);
    await userEvent.click(button);

    // when this we check the times (render + re-render) our component is correcly.
    expect(spyUseDispatch).toHaveBeenCalledTimes(4);
    expect(dispatchMock.mock.calls[0][0].type).toBe("postList/ADD_POST");
    expect(dispatchMock.mock.calls[0][0].payload.name).toBe("n");
    expect(dispatchMock.mock.calls[0][0].payload.message).toBe("Ñ");
  });
});