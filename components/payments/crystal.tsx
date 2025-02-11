type CrystalProps = {
    isPending?: boolean;
};

export const Crystal = ({ isPending }: CrystalProps) => {
    return (
        <div className="bg-soft m-4 rounded-lg px-6 py-4">
            <p className="text-xs italic mb-2">
                Crystal coin is for testing purposes only, no real transaction
                will occur.
            </p>

            <input type="hidden" name="paymentMethod" value="crystal" />
            <button
                type="submit"
                disabled={isPending}
                className="bg-dark text-light font-medium rounded px-6 py-2 text-nowrap cursor-pointer"
            >
                {isPending ? "Processing payment" : "Confirm payment"}
            </button>
        </div>
    );
};
