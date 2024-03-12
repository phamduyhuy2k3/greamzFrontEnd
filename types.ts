export type UserPayloadInterface = {
    username: string;
    password: string;
}
export type UserRegisterForm = {
    fullname: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
export type  UserProfile = {
    id: number;
    username: string;
    email: string;
    photo: string;
    fullname: string;
    role: string;
    createdOn: Date;
}
export type Cart = {
    id: number;
    accountId: number;
    quantity: number,
    game: {
        appid: number;
        name: string;
        price: number;
        header_image: string;
        discount: number;
    };
    platform: {
        id: number;
        name: string;
    },
    stock: number;
    isOutOfStock: boolean;

}
export type Game = {
    appid: number;
    name: string;
    price: number;
    detailed_description: string;
    about_the_game: string;
    short_description: string;
    header_image: string;
    website: string;
    capsule_image: string;
    discount: number;
    totalReviewed: number;
    averageRating: number;
    images: string[];
    movies: string[];
    platforms: Platform[];
    categories:{
        id: number;
        name: string;
        createdOn: Date;
    }[];
    createdOn: Date;
}
export type Platform = {
    id: number;
    name: string;
    createdOn: Date;
    stock: number;
}


