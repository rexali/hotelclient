import { toast } from "sonner";
import { makePaymentAPI } from "../../payment/makePaymentAPI";
import { addFavouriteRoomAPI } from "../api/addFavouriteRoomAPI";
  export const handleAddFavourite = async (roomId: any,userId:any, navigate:any) => {
    if (userId) {
      let result = await addFavouriteRoomAPI({ roomId, userId });
      if (result) {
        toast(result)
      }
      // Redirect to login or show login modal
    } else {
      navigate("/auth")
    }

  };

  export const handlePayment = async (roomId: any, roomPrice: any, userId:any, email:any) => {
    // Redirect to payment page or open payment modal
    await makePaymentAPI({ roomId, userId, amount: roomPrice, email });
  };