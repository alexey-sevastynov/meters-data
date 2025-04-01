export const actionNames = {
    billingAccount: {
        getAll: "billing-account/getAllBillingAccounts",
    },
    monthlyMoneyCalculations: {
        getAll: "monthly-money-calculations/getAllMonthlyMoneyCalculations",
        getOne: "monthly-money-calculations/getOneMonthMoneyCalculations",
        createOne: "monthly-money-calculations/postMonthMoneyCalculations",
        updateOne: "monthly-money-calculations/updateMonthMoneyCalculations",
        deleteOne: "monthly-money-calculations/deleteMonthMoneyCalculations",
    },
    utilityPrice: {
        getAll: "utility-price/getAllUtilityPrice",
        updateOne: "utility-price/updateUtilityPrice",
    },
    metersData: {
        getAll: "meters-data/getAllMetersData",
        createOne: "meters-data/createMetersData",
        updateOne: "meters-data/updateMetersData",
        deleteOne: "meters-data/deleteMetersData",
    },
};
