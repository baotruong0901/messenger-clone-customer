export interface UserInfo {
    user: {
        _id: string;
        name: string;
        phone: string;
        email: string;
        avatar: string;
        onBoarding: boolean;
        description: string
    },
    session: any
}
export interface User {
    description?: string,
    conversations?: any[],
    _id: string,
    name: string,
    phone: string,
    email: string,
    userType?: string,
    avatar: string,
    onBoarding?: boolean
}

