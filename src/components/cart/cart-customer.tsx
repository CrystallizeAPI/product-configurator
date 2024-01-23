export const CartCustomer = () => {
    return (
        <div className="leading-loose">
            <p className="font-medium text-gray-800 pb-8 text-2xl ">
                Your information
            </p>
            <div className="">
                <label className="block text-sm text-gray-00" htmlFor="name">
                    Name
                </label>
                <input
                    className="w-full p-2 text-gray-700 bg-gray-100 rounded placeholder:text-sm"
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your Name"
                    aria-label="Name"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="email">
                    Email
                </label>
                <input
                    className="w-full p-2 text-gray-700 bg-gray-100 rounded placeholder:text-sm"
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your Email"
                    aria-label="Email"
                />
            </div>
            <div className="mt-2">
                <label
                    className="block text-sm text-gray-600"
                    htmlFor="address"
                >
                    Address
                </label>
                <input
                    className="w-full px-2 py-2 text-gray-700 bg-gray-100 rounded placeholder:text-sm"
                    id="address"
                    name="address"
                    type="text"
                    required
                    placeholder="Street"
                    aria-label="Email"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="city">
                    City
                </label>
                <input
                    className="w-full p-2 text-gray-700 bg-gray-100 rounded placeholder:text-sm"
                    id="city"
                    name="city"
                    type="text"
                    required
                    placeholder="City"
                    aria-label="Email"
                />
            </div>
            <div className="flex gap-2 mt-2">
                <div className="flex-1">
                    <label
                        className="block text-sm text-gray-600"
                        htmlFor="country"
                    >
                        Country
                    </label>
                    <input
                        className="w-full p-2 text-gray-700 bg-gray-100 rounded placeholder:text-sm"
                        id="country"
                        name="country"
                        type="text"
                        required
                        placeholder="Country"
                        aria-label="Email"
                    />
                </div>
                <div className="flex-1">
                    <label
                        className="block text-sm text-gray-600"
                        htmlFor="zip"
                    >
                        Zip
                    </label>
                    <input
                        className="w-full p-2 text-gray-700 bg-gray-100 rounded placeholder:text-sm"
                        id="zip"
                        name="zip"
                        type="text"
                        required
                        placeholder="Zip"
                        aria-label="Email"
                    />
                </div>
            </div>
        </div>
    );
};
