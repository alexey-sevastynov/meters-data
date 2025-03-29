export const actionNames = {
    billingAccount: {
        getAll: "address-data/fetchAllAddressData",
    },
    price: {
        getAll: "MonthlyMoneyCalculations/fetchAllMonthlyMoneyCalculations",
        getOne: "MonthlyMoneyCalculations/getOneMonthMoneyCalculations",
        post: "MonthlyMoneyCalculations/fetchPostMonthMoneyCalculations",
        delete: "MonthlyMoneyCalculations/deleteMonthMoneyCalculations",
        edit: "MonthlyMoneyCalculations/editMonthMoneyCalculations",
    },
    utilityPrice: {
        getAll: "utility-price/getAllUtilityPrice",
        update: "utility-price/updateUtilityPrice",
    },
};
