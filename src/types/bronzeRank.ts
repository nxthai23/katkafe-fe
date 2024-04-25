export type BronzeRank = {
    id: number;
    title: string;
    imageUrl: string;
    balance: string;
    totalPeople: number;
    people: Person[];
};

export type Person = {
    id: string;
    name: string;
    imageUrl: string;
    balance: string;
};
