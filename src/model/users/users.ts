export type UploadResponse = {
  id: number;
  formats: {
    small: {
      url: string;
    };
  };
};

export enum Gender {
  FEMALE = "F",
  MALE = "M",
}

export type GetUserInfoResponse = {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  gender: Gender;
  name: string;
  height: number;
  weight: number;
  profileImage: {
    id: number;
    formats: {
      small: {
        url: string;
      };
    };
  };
};
