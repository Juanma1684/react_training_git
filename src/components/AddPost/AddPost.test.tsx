import { render, screen } from "@testing-library/react"
import { AddPost } from './AddPost';
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import * as reactRedux from "react-redux";
import userEvent from "@testing-library/user-event";
import Chance from "chance"


/*

  


*/


vi.mock('react-redux', () => {
  const dispatchMock = vi.fn((props: unknown) => {})
  const useDispatchMock = vi.fn(() => dispatchMock)
  
  return {
    ...vi.importActual("react-redux"),
    useDispatch: useDispatchMock,
    }
  }
);

const chance = new Chance();

const setup = () => {
  const spyUseDispatch = vi.spyOn(reactRedux, "useDispatch") as Mock<() => Mock<(props) => void>>;
  const dispatchMock = vi.fn((props) => {});
  const useDispatchMock = vi.fn(() => dispatchMock);
  // const testId = chance.guid();
  // const subTestId

  const addPostDataProps = { 
    testId: chance.guid(),
    subTestId: chance.guid()
  };

  spyUseDispatch.mockImplementation(useDispatchMock);

  return {
    dispatchMock,
    useDispatchMock,
    spyUseDispatch,
    addPostDataProps,
  }
}

describe('<AddPost/>', () => {

  describe("Rendering", () => {

    it("When render verify component exists in the document", async () => {
      const { addPostDataProps } = setup();

      await render(<AddPost { ...addPostDataProps } />)

      expect(screen.getByTestId(addPostDataProps.testId)).toBeInTheDocument();
    })

    it("When render verify sub components exists in the document", async () => {
      const { addPostDataProps } = setup();

      await render(<AddPost { ...addPostDataProps } />)

      expect(screen.getAllByTestId(addPostDataProps.subTestId)).toHaveLength(3);
    })


      // it("Verify input for message have initial value of empty string", async () => {
      //   const { addPostDataProps } = setup();

      //   await render(<AddPost testId={addPostDataProps.testId} />)
    
      //   const addPostElement = screen.getByTestId(addPostDataProps.testId);
      //   const inputMessageElement = addPostElement.children[0].children[0];
    
      //   expect(inputMessageElement).toHaveAttribute("value", "");
      // })

      // it("When updating the name input value when user types something, verify matching value", async () => {
      //   const { addPostDataProps } = setup();

      //   await render(<AddPost testId={addPostDataProps.testId} />)

      //   const addPostElement = screen.getByTestId(addPostDataProps.testId);
      //   const inputNameElement = addPostElement.children[0].children[0];

      //   const inputText = "nuevo nombre";
    
      //   await userEvent.type(inputNameElement, inputText);
    
      //   expect(inputNameElement).toHaveAttribute("value", inputText);
      // })
  });
  
  describe("Actions", () => {

  });



  // it("Should update input message state", async () => {
  //   await render(<AddPost />);

  //   const inputMessage = screen.getByLabelText("Mensaje");
  //   const inputText = "nuevo mensaje";

  //   await userEvent.type(inputMessage, inputText);

  //   expect(inputMessage.getAttribute("value")).toBe(inputText);
  // })


  // it("Should disable submit button when fields are empty", async () => {
  //   await render(<AddPost />);

  //   const btnSubmit = screen.getByRole('button');

  //   expect(btnSubmit).toBeDisabled();
  // })

  // it("Should enable submit button when fields are not empty", async () => {
  //   await render(<AddPost />);

  //   const inputName = screen.getByLabelText("Nombre");
  //   const inputNameText = "n";
  //   const inputMessage = screen.getByLabelText("Mensaje");
  //   const inputMessageText = "Ñ";

  //   await userEvent.type(inputName, inputNameText);
  //   await userEvent.type(inputMessage, inputMessageText);

  //   const btnSubmit = screen.getByRole('button');

  //   expect(btnSubmit).toBeEnabled();
  // });

  // it('Should when form input is invalid, them submit form not dispatch action', async () => {

  //   const { dispatchMock } = setup();

  //   await render(<AddPost />);

  //   const button = screen.getByRole("button");

  //   await userEvent.click(button);

  //   expect(dispatchMock).toHaveBeenCalledTimes(0);
  // });

  // it('Dispach ADD_POST action, them check dipatchMock call with correcly props', async () => {

  //   const { spyUseDispatch, dispatchMock } = setup();

  //   await render(<AddPost />);

  //   const button = screen.getByRole("button");
  //   const inputName = screen.getByLabelText("Nombre");
  //   const inputMessage = screen.getByLabelText("Mensaje");
    
  //   const inputNameText = "n";
  //   const inputMessageText = "Ñ";

  //   await userEvent.type(inputName, inputNameText);
  //   await userEvent.type(inputMessage, inputMessageText);
  //   await userEvent.click(button);

  //   // when this we check the times (render + re-render) our component is correcly.
  //   expect(spyUseDispatch).toHaveBeenCalledTimes(4);
    
  //   expect((dispatchMock.mock.calls[0][0].type) as string).toBe("postList/ADD_POST");
  //   expect(dispatchMock.mock.calls[0][0].payload.name).toBe("n");
  //   expect(dispatchMock.mock.calls[0][0].payload.message).toBe("Ñ");
  // });
});