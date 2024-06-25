import { create } from "zustand";
export type DialogContent = {
  content: string;
  title: string;
  imgUrl: string
  buttonText: string;
}
type States = {
  isShowDialog: boolean;
  dialogContent: DialogContent
  type: 'login' | 'restaurant'
};

type Actions = {
  hide: () => void;
  show: () => void;
  setDialogType: (type: 'login' | 'restaurant') => void;
  setDialogContent: (value: DialogContent) => void;
};

const defaultStates = {
  isShowDialog: false,
  dialogContent: {
    content: '',
    title: '',
    imgUrl: '',
    buttonText: '',
  }
};

export const useDialogStore = create<States & Actions>((set) => ({
  ...defaultStates,
  type: 'login',
  hide: () => {
    set({
      isShowDialog: false,
    });
  },
  show: () => {
    set({
      isShowDialog: true,
    });
  },
  setDialogType: (type: 'login' | 'restaurant') => {
    set({
      type
    })
  },
  setDialogContent: (value: DialogContent) => {
    set({
      dialogContent: value
    })
  }
}));
