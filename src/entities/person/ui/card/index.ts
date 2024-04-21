import cardTemplate from "./card.hbs";
import { Person} from "../../model";

class Card {
  element: HTMLElement | null = null;
  cardData: Person;
  constructor(cardData: Person) {
    this.cardData = cardData;
  }

  #startPoint: { x: number | null; y: number | null } | null = null;
  #offsetX: number = 0;
  #offsetY: number = 0;

  #isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };
  /**
   * Добавляет обработчики событий для сенсорных устройств
   */
  #listenToTouchEvents = () => {
    if (!this.element) {
      return;
    }
    this.element.addEventListener("touchstart", (e) => {
      if (!this.element) {
        return;
      }
      const touch = e.changedTouches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      this.#startPoint = { x: clientX, y: clientY };
      document.addEventListener("touchmove", this.#handleTouchMove);
      this.element.style.transition = "transform 0s";
    });

    document.addEventListener("touchend", this.#handleTouchEnd);
    document.addEventListener("cancel", this.#handleTouchEnd);
  };
  /**
   * Добавляет обработчики событий для устройств с мышью
   */
  #listenToMouseEvents = () => {
    if (!this.element) {
      return;
    }

    this.element.addEventListener("mousedown", (e) => {
      if (!this.element) {
        return;
      }
      const { clientX, clientY } = e;
      this.#startPoint = { x: clientX, y: clientY };
      document.addEventListener(
        "mousemove",
        this.#handleMouseMove as EventListener
      );
      this.element.style.transition = "transform 0s";
    });

    document.addEventListener("mouseup", this.#handleMoveUp);

    // prevent card from being dragged
    this.element!.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  };
  /**
   * Обрабатывает событие движения
   * @param {number} x - координата куросора по оси х
   * @param {number} y - координата куросора по оси у
   */
  #handleMove = (x: number, y: number) => {
    this.#offsetX = x - this.#startPoint!.x!;
    this.#offsetY = y - this.#startPoint!.y!;
    const rotate = this.#offsetX * 0.1;
    this.element!.style.transform = `translate(${this.#offsetX}px, ${
      this.#offsetY
    }px) rotate(${rotate}deg)`;
    // исчезновение карточки при достижени определенного смещения
    if (Math.abs(this.#offsetX) > this.element!.clientWidth * 0.7) {
      this.#dismiss(this.#offsetX > 0 ? 1 : -1);
    }
  };

  /**
   * Обрабатывает событие движения мыши
   * @param {Event} e - событие движения мыши
   */
  #handleMouseMove = (e: DragEvent) => {
    e.preventDefault();
    if (!this.#startPoint) return;
    const { clientX, clientY } = e;
    this.#handleMove(clientX, clientY);
  };
  /**
   * Обрабатывает событие отпускания кнопки мыши
   */
  #handleMoveUp = () => {
    this.#startPoint = null;
    document.removeEventListener(
      "mousemove",
      this.#handleMouseMove as EventListener
    );
    this.element!.style.transform = "";
  };

  /**
   * Обрабатывает событие движения пальцем по сенсорнному устройства
   * @param {Event} e - событие движения пальцем
   */
  #handleTouchMove = (e: TouchEvent) => {
    if (!this.#startPoint) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const { clientX, clientY } = touch;
    this.#handleMove(clientX, clientY);
  };
  /**
   * Обрабатывает событие отпускания пальца от сенсорного устройства
   */
  #handleTouchEnd = () => {
    this.#startPoint = null;
    document.removeEventListener("touchmove", this.#handleTouchMove);
    this.element!.style.transform = "";
  };
  /**
   * Исчезновение карточки с учетом напрвления
   * @param {number} direction - направление исчезновения
   */
  #dismiss = (direction: number) => {
    this.#startPoint = null;
    document.removeEventListener("mouseup", this.#handleMoveUp);
    document.removeEventListener(
      "mousemove",
      this.#handleMouseMove as EventListener
    );
    document.removeEventListener("touchend", this.#handleTouchEnd);
    document.removeEventListener("touchmove", this.#handleTouchMove);
    this.element!.style.transition = "transform 1s";
    this.element!.style.transform = `translate(${
      direction * window.innerWidth
    }px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
    this.element?.classList.add("dismissing");
    setTimeout(() => {
      this.element!.remove();
    }, 1000);
    // if (typeof this.onDismiss === "function") {
    //   this.onDismiss();
    // }
    // if (typeof this.onLike === "function" && direction === 1) {
    //   // this.onLike();
    //   apiHandler.LikeCard(this.cardData.id);
    // }
    // if (typeof this.onDislike === "function" && direction === -1) {
    //   apiHandler.DislikeCard(this.cardData.id);
    // }
  };

  render() {
    const cardElement = document.createElement("div");
    cardElement.innerHTML = cardTemplate(this.cardData);
    this.element = cardElement.firstElementChild as HTMLElement;

    if (this.#isTouchDevice()) {
      this.#listenToTouchEvents();
    } else {
      this.#listenToMouseEvents();
    }

    return cardElement;
  }
}
export default Card;
