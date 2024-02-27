export type Music = {
  id: string;
  name: string;
  filePath: string;
  fileHash: string;
  durationSeconds: number;
  album: {
    id: string;
    name: string;
  };
  isFavorite: boolean;
  createdAt: string;
  isDeleted: boolean;
  hasLyric: boolean;
  singers: {
    id: string;
    name: string;
  }[];
  musicLists: {
    id: string;
    name: string;
  }[];
};
