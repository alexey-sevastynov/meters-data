export interface MonthlyMoneyCalculationsType {
    _id: string;
    address: string;
    data: [
        {
            _id: string;
            title: string;
            description: string;
            percentDifference: number;
        }
    ];
    sumMoney: number;
}
