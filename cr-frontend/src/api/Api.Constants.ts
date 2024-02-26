 export const ApiConstants = {

    CR: {
        ADD: (userId: number) => {
            return "/cr/" + userId;
        },
        FIND_NOT_COMPLETED: (userId:number) => {
            return "/cr/findAllNotCompleted/" + userId;
        },
        FIND_COMPLETED: (userId:number) => {
            return "/cr/findAllCompleted/" + userId;
        },
        MARK_COMPLETED: (crId: number) => {
            return "/cr/" + crId;
        },
        DELETE: (crId: number) => {
            return "/cr/" + crId;
        },
    },
 
    USER: {
        SIGN_UP: "/user/signUp", // Modify the endpoint to register a user
       
        FIND_ALL: "/user",
        DELETE: (userId: number) => {
            return "/user/" + userId;
        },
    },
 LOGIN: "/auth/login",
};