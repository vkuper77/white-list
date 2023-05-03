import { useEffect } from "react";

export const useScrollAnchors = (anchors) => {
  useEffect(() => {
    const elements = anchors.map((itm) => document.querySelector(`#${itm}`));
    elements.forEach((element) => {
      element.addEventListener("wheel", (event) => {
        event?.preventDefault();
        const targetId =
          event.deltaY > 0
            ? element.nextElementSibling.id
            : element.previousElementSibling.id;
        if (!targetId) {
          return;
        }
        const targetElement = document.querySelector(`#${targetId}`);
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }, []);
};
