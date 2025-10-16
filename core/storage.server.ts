import { cookies } from "next/headers";

const createStorage = (key: string) => {
    return {
        getCartId: async () => {
            const cookieStore = await cookies();
            const value = cookieStore.get(key);
            if (!value) {
                return undefined;
            }
            return value.value;
        },
        setCartId: async (value: string) => {
            const cookieStore = await cookies();
            cookieStore.set(key, value);
        },
        delete: async () => {
            const cookieStore = await cookies();
            cookieStore.delete(key);
        },
    };
}

export const storage = {
    temp: createStorage("tempCartId"),
    real: createStorage("cartId"),
    destroy: async () => {
        const cookieStore = await cookies();
        cookieStore.delete("cartId");
        cookieStore.delete("tempCartId");
    }
};
