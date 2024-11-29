import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react"
import { Post } from "./Post";

describe("Post component", () => {
    it("should render name and message props provider", () => {
        
        render(<Post name="Pedro" message="Hola a todos que tal estais" />);

        const htmlParagraphs = screen.getAllByRole("paragraph");

        expect(htmlParagraphs[0].textContent).toBe("Pedro");
        expect(htmlParagraphs[1].textContent).toBe("Hola a todos que tal estais");
    })

})
