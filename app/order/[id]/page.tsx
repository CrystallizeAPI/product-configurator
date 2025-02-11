import { Image } from "@crystallize/reactjs-components";
import { crystallizeClient } from "@/core/crystallize-client.server";
import { createOrderFetcher, type Order } from "@crystallize/js-api-client";
import { priceFormatter } from "@/utils/format-price";

const fetchData = async (orderId: string) => {
    const response = await createOrderFetcher(crystallizeClient).byId(
        orderId,
        {},
        {},
        {
            reference: true,
            customer: {
                identifier: true,
                firstName: true,
                lastName: true,
                addresses: {
                    city: true,
                    country: true,
                    postalCode: true,
                    state: true,
                    street: true,
                    type: true,
                },
            },
        }
    );
    return response as Order & { reference: string };
};

type OrderProps = {
    params: Promise<{ id: string }>;
};

export default async function Order(props: OrderProps) {
    const params = await props.params;
    const { id } = params;
    const orderCart = await fetchData(id);

    return (
        <main className="pt-12 flex-1 overflow-auto">
            <div className="mt-10 max-w-screen-md mx-auto mb-12">
                <h1 className="font-bold text-3xl text-center text-balance">
                    Thank you {orderCart.customer?.firstName}!
                </h1>
                <p className="mt-4 text-center text-balance">
                    We’re on it! Your order is already in motion, and a
                    confirmation email is on its way to{" "}
                    <i>{orderCart?.customer?.identifier}</i>. Keep an eye
                    out—it’ll be there shortly!
                </p>
                <div className="mt-8 bg-light rounded-2xl border border-muted">
                    <span className="px-6  border-b border-muted flex justify-between py-4">
                        <span>
                            <h2 className="text-lg font-bold">Order</h2>
                            <i className="text-dark/70 text-sm">
                                #{orderCart.id}
                            </i>
                        </span>
                        <p className="font-bold text-lg">
                            {orderCart?.reference}
                        </p>
                    </span>

                    {orderCart.cart.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="px-6 py-2 mb-2 gap-2 w-full flex items-center border-b border-muted"
                            >
                                <div className="flex justify-between w-full gap-8 ">
                                    <div className="overflow-hidden relative rounded-md w-12 h-12 bg-soft border border-muted">
                                        <Image
                                            src={item.imageUrl}
                                            altText={item.name}
                                            className="crystallize-image-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col w-full justify-center">
                                        <span className="text-base">
                                            {item.name}
                                        </span>
                                        <span className="text-sm italic text-dark/70">
                                            {item.sku}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-base">
                                    {typeof item.price?.gross === "number" &&
                                        priceFormatter({
                                            value: item.price.gross,
                                            currency: orderCart.total?.currency,
                                        })}
                                </div>
                            </div>
                        );
                    })}
                    <div className="flex flex-col gap-2  py-4 items-end mt-2 px-6">
                        <div className="flex font-bold text-lg justify-between w-60">
                            <p>Paid</p>
                            <p>
                                {priceFormatter({
                                    value: orderCart?.total?.gross,
                                    currency: orderCart.total?.currency,
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
