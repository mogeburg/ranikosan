export const IMAGE_MODAL_OPEN_EVENT = "imagemodal:open";

export interface ModalImage {
  url: string;
}

export interface ImageModalOpenDetail {
  images: ModalImage[];
  startIndex: number;
}