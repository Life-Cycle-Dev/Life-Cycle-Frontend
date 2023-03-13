import axios, {AxiosError} from "axios";

export const searchFood = async (name: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
          if(!name) return reject({message: "Please enter a food name"});
          const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_PATH + "/api/lca/getFood?query=" + name)
          resolve(response.data);
        } catch (error) {  
          reject({
            message: (((error as AxiosError).response?.data) as any).error?.message || (((error as AxiosError).response?.data) as any).message || "Something went wrong",
          });
        }
    });
};

export const insertFood = async (name: string, amount: Number): Promise<any> => {
  return new Promise(async (resolve, reject) => {
      try {
        if(!name) return reject({message: "Please enter a food name"});
        if(!amount) return reject({message: "Please enter a food amount"});
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_PATH + "/api/lca/insertFoodOfUser",{
          "foodId" : name,
          "amount" : amount
        }, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        })
        resolve(response.data);
      } catch (error) {  
        reject({
          message: (((error as AxiosError).response?.data) as any).error?.message || (((error as AxiosError).response?.data) as any).message || (((error as AxiosError).response?.data) as any) || "Something went wrong",
        });
      }
  });
};

export const getFoodOfUser = async (date?: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
      try {
        if(!date) {
          date = new Date().toISOString().slice(0, 10);
        };
        const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_PATH + "/api/lca/getListFoodOfUser?date=" + date, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        resolve(response.data);
      } catch (error) {  
        reject({
          message: (((error as AxiosError).response?.data) as any).error?.message || (((error as AxiosError).response?.data) as any).message || "Something went wrong",
        });
      }
  });
};


  