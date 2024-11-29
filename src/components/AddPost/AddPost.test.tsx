import { render, screen } from "@testing-library/react"
import { AddPost } from './AddPost';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as reactRedux from "react-redux";
import userEvent from "@testing-library/user-event";



vi.mock('react-redux', () => ({
  ...vi.importActual("react-redux"),
  useDispatch: vi.fn(() => vi.fn((params) => {})),
}));

let spyUseDispatch: any;

beforeEach(() => {
  spyUseDispatch = vi.spyOn(reactRedux, "useDispatch");
});

afterEach(() => {
  spyUseDispatch.mockReset();
});

describe('AddPost component tests', () => {
  
  it('Should when form input is invalid, them submit form not dispatch action', async () => {
    render(<AddPost />);

    const button = screen.getByRole("button");

    const myMock = vi.fn((params) => {})

    spyUseDispatch.mockImplementation(
      vi.fn(() => myMock)
    );

    await userEvent.click(button);

    expect(myMock).toHaveBeenCalledTimes(0);
  });

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

  


  it('Should dispatch ADD_POST action with correct payload', async () => {

    render(<AddPost />);

    const button = screen.getByRole("button");
    const myMock = vi.fn((params) => {})

    spyUseDispatch.mockImplementation(
      vi.fn(() => myMock)
    );

    const inputName = screen.getByLabelText("Nombre");
    const inputNameText = "n";
    const inputMessage = screen.getByLabelText("Mensaje");
    const inputMessageText = "Ñ";


    await userEvent.type(inputName, inputNameText);
    await userEvent.type(inputMessage, inputMessageText);
    await userEvent.click(button);

    // when this we check the times (render + re-render) our component is correcly.
    expect(spyUseDispatch).toHaveBeenCalledTimes(4);

    expect(myMock.mock.calls[0][0].type).toBe("postList/ADD_POST");
    expect(myMock.mock.calls[0][0].payload.name).toBe("n");
    expect(myMock.mock.calls[0][0].payload.message).toBe("Ñ");
  });


});




// it('loads data on init', () => {
//   useDispatch.mockReturnValue(mockedDispatch);
//   mount(<Router><Clients history={historyMock} /></Router>);
//   expect(mockDispatch).toHaveBeenCalledWith(/*arguments your expect*/);
// });

    // const inputName = screen.getByLabelText("Nombre");
    // const inputMessage = screen.getByLabelText("Mensaje");

    // await userEvent.type(inputName, "pedro");
    // await userEvent.type(inputMessage, "Hola soy el puto amo");